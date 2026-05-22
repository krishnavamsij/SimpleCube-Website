import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand, SendRawEmailCommand } from "@aws-sdk/client-ses";
import {
  REGION,
  getSesSourceEmail,
  SES_RECIPIENT_CAREERS_US,
  SES_RECIPIENT_CAREERS_NONUS,
} from "@/lib/email-config";

const SENDER_EMAIL = "contact@hyniva.com";
const SENDER_NAME = "Hyniva Careers";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function isUsLocation(location: string, role: string) {
  const value = `${location} ${role}`.toLowerCase();
  return (
    value.includes(" usa") ||
    value.includes(" us ") ||
    value.includes("united states") ||
    value.includes("america")
  );
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

function buildRawEmail({
  source,
  toAddress,
  replyTo,
  subject,
  htmlBody,
  attachment,
}: {
  source: string;
  toAddress: string;
  replyTo: string;
  subject: string;
  htmlBody: string;
  attachment?: { name: string; content: string; mimeType: string };
}) {
  const boundary = `Boundary_${Date.now()}`;
  const headers = [
    `From: ${source}`,
    `To: ${toAddress}`,
    `Subject: ${subject}`,
    `Reply-To: ${replyTo}`,
    "MIME-Version: 1.0",
  ];

  if (attachment) {
    headers.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
    const body = [
      `--${boundary}`,
      "Content-Type: text/html; charset=ISO-8859-1",
      "Content-Transfer-Encoding: 7bit",
      "",
      htmlBody,
      "",
      `--${boundary}`,
      `Content-Type: ${attachment.mimeType}; name="${attachment.name}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${attachment.name}"`,
      "",
      attachment.content,
      "",
      `--${boundary}--`,
    ].join("\r\n");

    return Buffer.from(headers.join("\r\n") + "\r\n\r\n" + body);
  }

  headers.push("Content-Type: text/html; charset=ISO-8859-1");
  return Buffer.from(headers.join("\r\n") + "\r\n\r\n" + htmlBody);
}

const ses = new SESClient({ region: REGION });

export async function POST(request: Request) {
  try {
    const sourceEmail = getSesSourceEmail();
    if (!sourceEmail) {
      console.error("SES_SOURCE_EMAIL is not configured");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const ctc = formData.get("ctc") as string;
    const skills = formData.get("skills") as string;
    const location = formData.get("location") as string;
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !email || !role || !ctc || !skills || !location) {
      return NextResponse.json(
        { error: "Please fill all required application details." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    let attachmentData: { name: string; content: string; mimeType: string } | undefined;
    if (resumeFile) {
      if (!(resumeFile instanceof File)) {
        return NextResponse.json(
          { error: "Please attach a valid resume file." },
          { status: 400 },
        );
      }

      console.log("Resume file received:", {
        name: resumeFile.name,
        size: resumeFile.size,
        type: resumeFile.type,
      });

      const fileExtension = resumeFile.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !ALLOWED_EXTENSIONS.has(fileExtension)) {
        return NextResponse.json(
          { error: "Only PDF, DOC, and DOCX files are allowed." },
          { status: 400 },
        );
      }

      if (resumeFile.type && !ALLOWED_TYPES.has(resumeFile.type)) {
        return NextResponse.json(
          { error: "Only PDF, DOC, and DOCX files are allowed." },
          { status: 400 },
        );
      }

      if (resumeFile.size > MAX_FILE_SIZE) {
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

      console.log("Resume attachment prepared:", {
        fileName: attachmentData.name,
        mimeType: attachmentData.mimeType,
        contentLength: attachmentData.content.length,
      });
    }

    const usRole = isUsLocation(location, role);
    const targetEmail = usRole ? SES_RECIPIENT_CAREERS_US : SES_RECIPIENT_CAREERS_NONUS;
    const subject = usRole
      ? `[Job Application - US] ${name} - ${role}`
      : `[Job Application] ${name} - ${role}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #1e90ff;">${usRole ? "US Job Application" : "Job Application"}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Applied Role:</strong> ${role}</p>
        <p><strong>Current CTC:</strong> ${ctc}</p>
        <p><strong>Skills:</strong> ${skills}</p>
        <p><strong>Location:</strong> ${location}</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          <strong>Sent via:</strong> Hyniva Website Careers Form
        </p>
      </div>
    `;

    let response;
    if (attachmentData) {
      response = await ses.send(
        new SendRawEmailCommand({
          RawMessage: {
            Data: buildRawEmail({
              source: sourceEmail,
              toAddress: targetEmail,
              replyTo: email,
              subject,
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
            Subject: { Data: subject },
            Body: {
              Html: { Data: htmlContent },
            },
          },
          ReplyToAddresses: [email],
        }),
      );
    }

    console.log("Careers email sent successfully via SES:", response);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending careers email:", error);
    return NextResponse.json(
      { error: "We could not submit your application right now. Please try again." },
      { status: 500 },
    );
  }
}
