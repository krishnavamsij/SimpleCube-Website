import { NextResponse } from "next/server";
import {
  getResendClient,
  getResendFromEmail,
  RECIPIENT_CAREERS,
} from "@/lib/email-config";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function isIndiaLocation(jobLocation: string, jobRegion: string) {
  if (jobRegion && jobRegion.toLowerCase() === "india") {
    return true;
  }

  return jobLocation.toLowerCase().includes("india");
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

export async function POST(request: Request) {
  try {
    const resend = getResendClient();
    if (!resend) {
      console.error("RESEND_API_KEY is not configured");
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
    const location = formData.get("location") as string;
    const jobLocation = formData.get("jobLocation") as string;
    const jobRegion = formData.get("jobRegion") as string;
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

    let attachment:
      | { filename: string; content: Buffer; contentType?: string }
      | undefined;

    if (resumeFile) {
      if (!(resumeFile instanceof File)) {
        return NextResponse.json(
          { error: "Please attach a valid resume file." },
          { status: 400 },
        );
      }

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

      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      let contentType = resumeFile.type || "application/octet-stream";
      if (!resumeFile.type && resumeFile.name.endsWith(".pdf")) {
        contentType = "application/pdf";
      } else if (
        !resumeFile.type &&
        (resumeFile.name.endsWith(".doc") || resumeFile.name.endsWith(".docx"))
      ) {
        contentType = "application/msword";
      }

      attachment = {
        filename: sanitizeFileName(resumeFile.name),
        content: buffer,
        contentType,
      };
    }

    const isIndia = isIndiaLocation(jobLocation || "", jobRegion || "");
    const subject = isIndia
      ? `[Job Application - India] ${jobId ? `${jobId} - ` : ""}${name} - ${role}`
      : `[Job Application - Onsite] ${jobId ? `${jobId} - ` : ""}${name} - ${role}`;

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
            <span>${attachment ? "Resume attached" : "No resume attached"}</span>
            <span>•</span>
            <span>Submitted via SimpleCube Careers Portal</span>
            <span>•</span>
            <span>${new Date().toLocaleString()}</span>
          </div>
        </div>

        <div style="background-color: #f0f4f8; padding: 20px 30px; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px; color: #999;">
          <p style="margin: 0;">This is an automated email from SimpleCube's careers system. Please reply to ${email} to contact the applicant.</p>
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
      `${attachment ? "Resume: Attached" : "Resume: Not attached"}`,
      "",
      `Submitted via SimpleCube Careers Portal on ${new Date().toLocaleString()}`,
      `Reply to the applicant at ${email}`,
    ].join("\n");

    const { data, error } = await resend.emails.send({
      from: getResendFromEmail(),
      to: [RECIPIENT_CAREERS],
      replyTo: email,
      subject,
      html: htmlContent,
      text: textContent,
      attachments: attachment ? [attachment] : undefined,
    });

    if (error) {
      console.error("Error sending careers email:", error);
      return NextResponse.json(
        { error: "We could not submit your application right now. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
    });
  } catch (error: unknown) {
    console.error("Careers email request failed:", error);
    return NextResponse.json(
      {
        error: "We could not submit your application right now. Please try again later.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
