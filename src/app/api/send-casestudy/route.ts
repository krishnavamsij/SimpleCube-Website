import { NextResponse } from "next/server";
import {
  getResendClient,
  getResendFromEmail,
  RECIPIENT_CASESTUDY,
} from "@/lib/email-config";

export async function POST(request: Request) {
  try {
    const resend = getResendClient();
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

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #3886CE;">New Case Study Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Role:</strong> ${role || "N/A"}</p>
        <p><strong>Message:</strong> A visitor expressed interest after reading a case study.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          <strong>Sent via:</strong> SimpleCube Website Case Study Form
        </p>
      </div>
    `;

    const textContent = [
      "New Case Study Lead",
      `Name: ${name}`,
      `Email: ${email}`,
      `Organization: ${organization}`,
      `Role: ${role || "N/A"}`,
      "Message: A visitor expressed interest after reading a case study.",
      "",
      "Sent via: SimpleCube Website Case Study Form",
    ].join("\n");

    const { data, error } = await resend.emails.send({
      from: getResendFromEmail(),
      to: [RECIPIENT_CASESTUDY],
      replyTo: email,
      subject: `[Case Study Lead] ${name} - ${organization}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error("Error sending case study email:", error);
      return NextResponse.json(
        { error: "We could not send your request right now. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error("Error sending case study email:", error);
    return NextResponse.json(
      { error: "We could not send your request right now. Please try again." },
      { status: 500 },
    );
  }
}
