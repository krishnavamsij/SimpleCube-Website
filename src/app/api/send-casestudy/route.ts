import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Verified email for Resend testing (until domain is verified)
const VERIFIED_EMAIL = "hyniva.analytics@gmail.com";

export async function POST(request: Request) {
  try {
    if (!resend) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const organization =
      typeof body.organization === "string" ? body.organization.trim() : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";

    if (!name || !email || !organization) {
      return NextResponse.json(
        { error: "Name, email, and organization are required." },
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

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: VERIFIED_EMAIL,
      replyTo: email,
      subject: `[Case Study Lead] ${name} - ${organization}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1e90ff;">New Case Study Lead</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Organization:</strong> ${organization}</p>
          <p><strong>Role:</strong> ${role || "N/A"}</p>
          <p><strong>Message:</strong> A visitor expressed interest after reading a case study.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            <strong>Note:</strong> This email was sent to ${VERIFIED_EMAIL} because hyniva.com domain is not yet verified in Resend.
            Please verify the domain at <a href="https://resend.com/domains">resend.com/domains</a> to send directly to connect@hyniva.com
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
    console.error("Error sending case study email:", error);
    return NextResponse.json(
      { error: "We could not send your request right now. Please try again." },
      { status: 500 },
    );
  }
}
