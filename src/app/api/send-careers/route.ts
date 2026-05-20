import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Verified email for Resend testing (until domain is verified)
const VERIFIED_EMAIL = "hyniva.analytics@gmail.com";

function isUsLocation(location: string, role: string) {
  const value = `${location} ${role}`.toLowerCase();
  return (
    value.includes(" usa") ||
    value.includes(" us ") ||
    value.includes("united states") ||
    value.includes("america")
  );
}

export async function POST(request: Request) {
  try {
    if (!resend) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";
    const ctc = typeof body.ctc === "string" ? body.ctc.trim() : "";
    const skills = typeof body.skills === "string" ? body.skills.trim() : "";
    const location =
      typeof body.location === "string" ? body.location.trim() : "";
    const resumeUrl =
      typeof body.resume_url === "string" ? body.resume_url.trim() : "";

    if (!name || !email || !role || !ctc || !skills || !location || !resumeUrl) {
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

    const usRole = isUsLocation(location, role);
    const targetEmail = usRole ? "careers@hyniva.com" : "hr@hyniva.com";
    const subject = usRole
      ? `[Job Application - US] ${name} - ${role}`
      : `[Job Application] ${name} - ${role}`;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: VERIFIED_EMAIL,
      replyTo: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1e90ff;">${usRole ? "US Job Application" : "Job Application"}</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Applied Role:</strong> ${role}</p>
          <p><strong>Current CTC:</strong> ${ctc}</p>
          <p><strong>Skills:</strong> ${skills}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Resume:</strong> <a href="${resumeUrl}" target="_blank" rel="noopener noreferrer">Download Resume</a></p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            <strong>Original recipient:</strong> ${targetEmail}<br>
            <strong>Note:</strong> This email was sent to ${VERIFIED_EMAIL} because hyniva.com domain is not yet verified in Resend.
            Please verify the domain at <a href="https://resend.com/domains">resend.com/domains</a> to send directly to ${targetEmail}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: `Email failed: ${error.message}` },
        { status: 500 },
      );
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending careers email:", error);
    return NextResponse.json(
      { error: "We could not submit your application right now. Please try again." },
      { status: 500 },
    );
  }
}
