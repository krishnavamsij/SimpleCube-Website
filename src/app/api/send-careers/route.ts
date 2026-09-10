import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand, SendRawEmailCommand } from "@aws-sdk/client-ses";
import {
  REGION,
  getSesCredentials,
  getSesSourceEmail,
  SES_RECIPIENT_CAREERS_US,
  SES_RECIPIENT_CAREERS_NONUS,
} from "@/lib/email-config";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function isIndiaLocation(jobLocation: string, jobRegion: string) {
  // First check if region is explicitly set to "india"
  if (jobRegion && jobRegion.toLowerCase() === 'india') {
    return true;
  }
  
  // Otherwise check if job location contains "India"
  const location = jobLocation.toLowerCase();
  return location.includes('india');
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

function buildRawEmail({
  source,
  toAddress,
  replyTo,
  subject,
  textBody,
  htmlBody,
  attachment,
}: {
  source: string;
  toAddress: string;
  replyTo: string;
  subject: string;
  textBody: string;
  htmlBody: string;
  attachment?: { name: string; content: string; mimeType: string };
}) {
  const mixedBoundary = `MixedBoundary_${Date.now()}`;
  const altBoundary = `AltBoundary_${Date.now()}`;
  const headers = [
    `From: ${source}`,
    `To: ${toAddress}`,
    `Subject: ${subject}`,
    `Reply-To: ${replyTo}`,
    "MIME-Version: 1.0",
  ];

  if (attachment) {
    headers.push(`Content-Type: multipart/mixed; boundary="${mixedBoundary}"`);
    const body = [
      `--${mixedBoundary}`,
      `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
      "",
      `--${altBoundary}`,
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 7bit",
      "",
      textBody,
      "",
      `--${altBoundary}`,
      "Content-Type: text/html; charset=UTF-8",
      "Content-Transfer-Encoding: 7bit",
      "",
      htmlBody,
      "",
      `--${altBoundary}--`,
      "",
      `--${mixedBoundary}`,
      `Content-Type: ${attachment.mimeType}; name="${attachment.name}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${attachment.name}"`,
      "",
      attachment.content,
      "",
      `--${mixedBoundary}--`,
    ].join("\r\n");

    return Buffer.from(headers.join("\r\n") + "\r\n\r\n" + body);
  }

  headers.push(`Content-Type: multipart/alternative; boundary="${altBoundary}"`);
  const body = [
    `--${altBoundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    textBody,
    "",
    `--${altBoundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    htmlBody,
    "",
    `--${altBoundary}--`,
  ].join("\r\n");

  return Buffer.from(headers.join("\r\n") + "\r\n\r\n" + body);
}

const sesCredentials = getSesCredentials();
const ses = new SESClient({ 
  region: REGION,
  maxAttempts: 3,
  ...(sesCredentials ? { credentials: sesCredentials } : {}),
});

export async function POST(request: Request) {
  try {
    const sourceEmail = getSesSourceEmail();
    if (!sourceEmail) {
      console.error("❌ SES_SOURCE_EMAIL is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact support." },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const jobId = formData.get("jobId") as string;
    const ctc = formData.get("ctc") as string;
    const skills = formData.get("skills") as string;
    const location = formData.get("location") as string; // Applicant's location
    const jobLocation = formData.get("jobLocation") as string; // Job posting location
    const jobRegion = formData.get("jobRegion") as string; // Job region (us/india)
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !email || !role || !ctc || !skills || !location) {
      console.warn("❌ Validation failed: Missing required fields");
      return NextResponse.json(
        { error: "Please fill all required application details." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn("❌ Invalid email format:", email);
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    let attachmentData: { name: string; content: string; mimeType: string } | undefined;
    
    if (resumeFile) {
      if (!(resumeFile instanceof File)) {
        console.warn("❌ Resume is not a valid File object");
        return NextResponse.json(
          { error: "Please attach a valid resume file." },
          { status: 400 },
        );
      }

      const fileExtension = resumeFile.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !ALLOWED_EXTENSIONS.has(fileExtension)) {
        console.warn("❌ Invalid file extension:", fileExtension);
        return NextResponse.json(
          { error: "Only PDF, DOC, and DOCX files are allowed." },
          { status: 400 },
        );
      }

      if (resumeFile.type && !ALLOWED_TYPES.has(resumeFile.type)) {
        console.warn("❌ Invalid MIME type:", resumeFile.type);
        return NextResponse.json(
          { error: "Only PDF, DOC, and DOCX files are allowed." },
          { status: 400 },
        );
      }

      if (resumeFile.size > MAX_FILE_SIZE) {
        console.warn("❌ File size exceeds limit:", resumeFile.size);
        return NextResponse.json(
          { error: "Resume file must be 5MB or smaller." },
          { status: 400 },
        );
      }

      const buffer = await resumeFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      
      let mimeType = resumeFile.type || "application/octet-stream";
      if (!mimeType && resumeFile.name.endsWith(".pdf")) {
        mimeType = "application/pdf";
      } else if (!mimeType && (resumeFile.name.endsWith(".doc") || resumeFile.name.endsWith(".docx"))) {
        mimeType = "application/msword";
      }

      attachmentData = {
        name: sanitizeFileName(resumeFile.name),
        content: base64,
        mimeType,
      };
    }

    const isIndia = isIndiaLocation(jobLocation || "", jobRegion || "");
    const targetEmail = isIndia ? SES_RECIPIENT_CAREERS_NONUS : SES_RECIPIENT_CAREERS_US;
    const subject = isIndia
      ? `[Job Application - India] ${jobId ? `${jobId} - ` : ''}${name} - ${role}`
      : `[Job Application - Onsite] ${jobId ? `${jobId} - ` : ''}${name} - ${role}`;

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; color: #333;">
        <div style="background: linear-gradient(135deg, #3886CE 0%, #0d47a1 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
          <h2 style="margin: 0; font-size: 24px;">New Job Application</h2>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Status: Ready for review</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 2px;"></div>

        <div style="background-color: #fff; padding: 30px; border-bottom: 1px solid #e0e0e0;">
          <h3 style="color: #3886CE; margin-top: 0; margin-bottom: 20px; font-size: 16px;">Applicant Information</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0; width: 150px;"><strong>Full Name</strong></td>
                <td style="padding: 12px 0; color: #3886CE;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0;"><strong>Email</strong></td>
                <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #3886CE; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0;"><strong>Position Applied</strong></td>
                <td style="padding: 12px 0;"><strong style="color: #0d47a1;">${role}</strong></td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0;"><strong>Location</strong></td>
                <td style="padding: 12px 0;">${location}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0;"><strong>Current CTC</strong></td>
                <td style="padding: 12px 0;">${ctc}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; vertical-align: top;"><strong>Skills</strong></td>
                <td style="padding: 12px 0;">${skills}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background-color: #fff; padding: 20px 30px;">
          <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #666;">
            <span>${attachmentData ? "Resume attached" : "No resume attached"}</span>
            <span>•</span>
            <span>Submitted via Hyniva Careers Portal</span>
            <span>•</span>
            <span>${new Date().toLocaleString()}</span>
          </div>
        </div>

        <div style="background-color: #f0f4f8; padding: 20px 30px; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px; color: #999;">
          <p style="margin: 0;">This is an automated email from Hyniva's careers system. Please reply to ${email} to contact the applicant.</p>
        </div>
      </div>
    `;

    const textContent = [
      "New Job Application",
      `Full Name: ${name}`,
      `Email: ${email}`,
      `Position Applied: ${role}`,
      `Location: ${location}`,
      `Current CTC: ${ctc}`,
      `Skills: ${skills}`,
      `${attachmentData ? "Resume: Attached" : "Resume: Not attached"}`,
      "",
      `Submitted via Hyniva Careers Portal on ${new Date().toLocaleString()}`,
      `Reply to the applicant at ${email}`,
    ].join("\n");

    let response;
    try {
      if (attachmentData) {
        response = await ses.send(
          new SendRawEmailCommand({
            RawMessage: {
              Data: buildRawEmail({
                source: sourceEmail,
                toAddress: targetEmail,
                replyTo: email,
                subject,
                textBody: textContent,
                htmlBody: htmlContent,
                attachment: attachmentData,
              }),
            },
          }),
        );
      } else {
        response = await ses.send(
          new SendEmailCommand({
            Source: sourceEmail,
            Destination: {
              ToAddresses: [targetEmail],
            },
            Message: {
              Subject: { Data: subject, Charset: "UTF-8" },
              Body: {
                Text: { Data: textContent, Charset: "UTF-8" },
                Html: { Data: htmlContent, Charset: "UTF-8" },
              },
            },
            ReplyToAddresses: [email],
          }),
        );
      }

      return NextResponse.json({ 
        success: true,
        messageId: response.MessageId 
      });

    } catch (sesError: unknown) {
      const err = sesError as {
        Code?: string;
        message?: string;
        Type?: string;
        $metadata?: { httpStatusCode?: number };
      };
      console.error("❌ SES Error Details:", {
        code: err.Code,
        message: err.message,
        type: err.Type,
        statusCode: err.$metadata?.httpStatusCode,
      });

      if (err.Code === "AccessDenied") {
        console.error("⚠️ IAM PERMISSION ERROR:", {
          user: "gvnikitha@hyniva.com (or current AWS user)",
          requiredAction: "ses:SendEmail or ses:SendRawEmail",
          source: sourceEmail,
          solution: "Add SES permissions to IAM user in AWS console",
        });
        
        return NextResponse.json(
          { 
            error: "Email service authentication failed. Please contact support.",
            code: "SES_AUTH_ERROR"
          },
          { status: 403 },
        );
      }

      if (err.Code === "MessageRejected") {
        return NextResponse.json(
          { 
            error: "Email was rejected. Please verify all details are correct.",
            code: "SES_REJECTED"
          },
          { status: 400 },
        );
      }

      throw sesError;
    }

  } catch (error: unknown) {
    console.error("=== CAREERS EMAIL REQUEST FAILED ===");
    if (error instanceof Error) {
      console.error("Error Type:", error.constructor.name);
      console.error("Error Message:", error.message);
      console.error("Error Stack:", error.stack);
    } else {
      console.error("Error:", error);
    }

    return NextResponse.json(
      { 
        error: "We could not submit your application right now. Please try again later.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}