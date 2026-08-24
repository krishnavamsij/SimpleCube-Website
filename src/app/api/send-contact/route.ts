import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { REGION, getSesCredentials, getSesSourceEmail, SES_RECIPIENT_CONTACT } from "@/lib/email-config";

const SENDER_NAME = "Hyniva Contact Form";
const RECIPIENT_EMAIL = SES_RECIPIENT_CONTACT;

const sesCredentials = getSesCredentials();
const ses = new SESClient({
  region: REGION,
  ...(sesCredentials ? { credentials: sesCredentials } : {}),
});

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

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const organization =
      typeof body.organization === "string" ? body.organization.trim() : "";
    const industry =
      typeof body.industry === "string" ? body.industry.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !organization || !industry || !message) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
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
        <h2 style="color: #1e90ff;">New Corporate Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || "Not Provided"}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        <h3 style="color: #030B3B; margin-top: 20px;">Message:</h3>
        <p style="white-space: pre-wrap; color: #030B3B; line-height: 1.6;">
          ${message}
        </p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          <strong>Sent via:</strong> Hyniva Website Contact Form
        </p>
      </div>
    `;

    const textContent = [
      "New Corporate Inquiry",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not Provided"}`,
      `Organization: ${organization}`,
      `Industry: ${industry}`,
      "",
      "Message:",
      message,
      "",
      "Sent via: Hyniva Website Contact Form",
    ].join("\n");

    const command = new SendEmailCommand({
      Source: sourceEmail,
      Destination: {
        ToAddresses: [RECIPIENT_EMAIL],
      },
      Message: {
        Subject: { Data: `[Corporate Inquiry] ${name} - ${organization}`, Charset: "UTF-8" },
        Body: {
          Text: { Data: textContent, Charset: "UTF-8" },
          Html: { Data: htmlContent, Charset: "UTF-8" },
        },
      },
      ReplyToAddresses: [email],
    });

    await ses.send(command);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "We could not send your message right now. Please try again." },
      { status: 500 },
    );
  }
}
