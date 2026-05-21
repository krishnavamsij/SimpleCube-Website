import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { AWS_REGION, getSesSourceEmail, SES_RECIPIENT_CASESTUDY } from "@/lib/email-config";

const SENDER_NAME = "Hyniva";
const RECIPIENT_EMAIL = SES_RECIPIENT_CASESTUDY;
const ses = new SESClient({ region: AWS_REGION });

export async function POST(request: Request) {
  try {
    // Log the client IP for debugging
    const xForwardedFor = request.headers.get("x-forwarded-for");
    const xRealIp = request.headers.get("x-real-ip");
    const cfConnectingIp = request.headers.get("cf-connecting-ip");

    const clientIp = xForwardedFor
      ? xForwardedFor.split(",")[0].trim()
      : xRealIp ||
        cfConnectingIp ||
        "unknown";

    console.log("=== REQUEST IP INFO ===");
    console.log("Client IP:", clientIp);
    console.log("IP Format: IPv4");
    console.log("x-forwarded-for:", xForwardedFor);
    console.log("x-real-ip:", xRealIp);
    console.log("cf-connecting-ip:", cfConnectingIp);
    console.log("========================");

    const sourceEmail = getSesSourceEmail();
    if (!sourceEmail) {
      console.error("SES_SOURCE_EMAIL is not configured");
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
    `;

    const command = new SendEmailCommand({
      Source: sourceEmail,
      Destination: {
        ToAddresses: [RECIPIENT_EMAIL],
      },
      Message: {
        Subject: { Data: `[Case Study Lead] ${name} - ${organization}` },
        Body: {
          Html: { Data: htmlContent },
        },
      },
      ReplyToAddresses: [email],
    });

    const response = await ses.send(command);
    console.log("Case study email sent successfully via SES:", response);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending case study email:", error);
    return NextResponse.json(
      { error: "We could not send your request right now. Please try again." },
      { status: 500 },
    );
  }
}
