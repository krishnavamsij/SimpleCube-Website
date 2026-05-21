import { NextResponse } from "next/server";
import { getBrevoApiKey, BREVO_SMTP_URL } from "@/lib/email-config";

// Verified sender email in Brevo (Outlook)
const SENDER_EMAIL = "contact@hyniva.com";
const SENDER_NAME = "Hyniva";

export async function POST(request: Request) {
  try {
    // Log the client IP for debugging
    const xForwardedFor = request.headers.get('x-forwarded-for');
    const xRealIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    
    const clientIp = xForwardedFor ? xForwardedFor.split(',')[0].trim() : 
                     xRealIp || 
                     cfConnectingIp || 
                     'unknown';
    
    console.log("=== REQUEST IP INFO ===");
    console.log("Client IP:", clientIp);
    console.log("IP Format: IPv4");
    console.log("x-forwarded-for:", xForwardedFor);
    console.log("x-real-ip:", xRealIp);
    console.log("cf-connecting-ip:", cfConnectingIp);
    console.log("========================");

    const brevoApiKey = getBrevoApiKey();
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY is not configured");
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

    // Send email via Brevo API
    const response = await fetch(BREVO_SMTP_URL, {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: SENDER_NAME,
          email: SENDER_EMAIL,
        },
        to: [
          {
            email: "connect@hyniva.com",
            name: "Hyniva Team",
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `[Case Study Lead] ${name} - ${organization}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #1e90ff;">New Case Study Lead</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Role:</strong> ${role || "N/A"}</p>
            <p><strong>Message:</strong> A visitor expressed interest after reading a case study.</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              <strong>Sent via:</strong> Hyniva Website Case Study Form
            </p>
          </div>
        `,
      }),
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
    console.error("Error sending case study email:", error);
    return NextResponse.json(
      { error: "We could not send your request right now. Please try again." },
      { status: 500 },
    );
  }
}
