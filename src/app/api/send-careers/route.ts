import { NextResponse } from "next/server";
import { getBrevoApiKey, BREVO_SMTP_URL } from "@/lib/email-config";

// Verified sender email in Brevo (Outlook)
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

export async function POST(request: Request) {
  try {
    const brevoApiKey = getBrevoApiKey();
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY is not configured");
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

    // Validate resume file if provided
    let attachmentData = null;
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

      // Convert file to base64 for Brevo attachment
      const buffer = await resumeFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      
      // Determine MIME type
      let mimeType = resumeFile.type || "application/octet-stream";
      if (!mimeType && resumeFile.name.endsWith(".pdf")) {
        mimeType = "application/pdf";
      } else if (!mimeType && (resumeFile.name.endsWith(".doc") || resumeFile.name.endsWith(".docx"))) {
        mimeType = "application/msword";
      }
      
      attachmentData = {
        name: sanitizeFileName(resumeFile.name),
        content: base64,
      };

      console.log("Resume attachment prepared:", {
        fileName: attachmentData.name,
        mimeType: mimeType,
        contentLength: attachmentData.content.length,
      });
    }

    const usRole = isUsLocation(location, role);
    const targetEmail = usRole ? "careers@hyniva.com" : "hr@hyniva.com";
    const subject = usRole
      ? `[Job Application - US] ${name} - ${role}`
      : `[Job Application] ${name} - ${role}`;

    // Build Brevo email payload
    const emailPayload: any = {
      sender: {
        name: SENDER_NAME,
        email: SENDER_EMAIL,
      },
      to: [
        {
          email: targetEmail,
          name: usRole ? "Hyniva US Careers" : "Hyniva HR",
        },
      ],
      replyTo: {
        email: email,
        name: name,
      },
      subject: subject,
      htmlContent: `
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
      `,
    };

    // Add attachment if resume was provided
    if (attachmentData) {
      emailPayload.attachment = [attachmentData];
      console.log("✅ Attachment added to email payload:", {
        fileName: attachmentData.name,
        contentLength: attachmentData.content.length,
        contentPreview: attachmentData.content.substring(0, 50) + "...",
      });
    }

    console.log("📧 Sending email to:", targetEmail);
    console.log("📎 Has attachment:", !!attachmentData);

    // Send email via Brevo API
    const response = await fetch(BREVO_SMTP_URL, {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const responseStatus = response.status;
    const responseData = await response.json();

    if (!response.ok) {
      console.error("Brevo API error:", responseStatus, responseData);
      return NextResponse.json(
        { error: `Email failed: ${responseData.message || "Unknown error"}` },
        { status: responseStatus },
      );
    }

    console.log("Email sent successfully via Brevo:", responseData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending careers email:", error);
    return NextResponse.json(
      { error: "We could not submit your application right now. Please try again." },
      { status: 500 },
    );
  }
}
