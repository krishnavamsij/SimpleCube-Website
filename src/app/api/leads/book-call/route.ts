import { NextResponse } from "next/server";
import {
  getResendClient,
  getResendFromEmail,
  RECIPIENT_LEADS,
} from "@/lib/email-config";

export async function POST(request: Request) {
  const resend = getResendClient();
  if (!resend) {
    console.error("[book-call] RESEND_API_KEY not configured");
    return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const intent = typeof body.intent === "string" ? body.intent.trim() : "";
  const organisation =
    typeof body.organisation === "string" ? body.organisation.trim() : "";
  const preferredTime =
    typeof body.preferredTime === "string" ? body.preferredTime.trim() : "";

  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
            <div style="background:linear-gradient(135deg,#0f172a 0%,#135498 100%);padding:32px 32px 24px;border-radius:12px 12px 0 0;">
                <h1 style="color:#ffffff;margin:0 0 6px;font-size:22px;font-weight:700;">Consultation Call Requested</h1>
                <p style="color:#93c5fd;margin:0;font-size:14px;">A prospect has requested a discussion with the SimpleCube team.</p>
            </div>
            <div style="background:#ffffff;padding:28px 32px;border:1px solid #e2e8f0;border-top:none;">
                <table style="border-collapse:collapse;width:100%;">
                    <tr style="border-bottom:1px solid #f1f5f9;">
                        <td style="padding:12px 0;font-weight:600;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;width:180px;">Contact Name</td>
                        <td style="padding:12px 0;color:#0f172a;font-weight:500;">${name}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #f1f5f9;">
                        <td style="padding:12px 0;font-weight:600;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Email</td>
                        <td style="padding:12px 0;"><a href="mailto:${email}" style="color:#135498;font-weight:500;">${email}</a></td>
                    </tr>
                    ${organisation ? `
                    <tr style="border-bottom:1px solid #f1f5f9;">
                        <td style="padding:12px 0;font-weight:600;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Organisation</td>
                        <td style="padding:12px 0;color:#0f172a;font-weight:500;">${organisation}</td>
                    </tr>` : ""}
                    ${intent ? `
                    <tr style="border-bottom:1px solid #f1f5f9;">
                        <td style="padding:12px 0;font-weight:600;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Area of Interest</td>
                        <td style="padding:12px 0;color:#0f172a;font-weight:500;">${intent}</td>
                    </tr>` : ""}
                    ${preferredTime ? `
                    <tr style="border-bottom:1px solid #f1f5f9;">
                        <td style="padding:12px 0;font-weight:600;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Preferred Meeting Time</td>
                        <td style="padding:12px 0;color:#059669;font-weight:600;font-size:15px;">${preferredTime}</td>
                    </tr>` : ""}
                </table>
                <div style="margin-top:24px;padding:18px 20px;background:#eff6ff;border-radius:8px;border-left:4px solid #135498;">
                    <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#135498;text-transform:uppercase;letter-spacing:0.05em;">Recommended Next Step</p>
                    <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.6;">Confirm the meeting with the prospect and assign the appropriate consultant or SME.</p>
                </div>
            </div>
            <div style="background:#f8fafc;padding:16px 32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
                <p style="color:#94a3b8;font-size:11px;margin:0;">Captured via SimpleCube website assistant</p>
            </div>
        </div>
    `;

  const text = [
    "Consultation Call Requested",
    "================================================",
    `Contact Name:          ${name}`,
    `Email:                 ${email}`,
    ...(organisation ? [`Organisation:          ${organisation}`] : []),
    ...(intent ? [`Area of Interest:      ${intent}`] : []),
    ...(preferredTime ? [`Preferred Meeting Time: ${preferredTime}`] : []),
    "",
    "Captured via SimpleCube website assistant",
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: getResendFromEmail(),
      to: [RECIPIENT_LEADS],
      replyTo: email,
      subject: `Consultation Call Requested – ${intent || "SimpleCube Services"}`,
      html,
      text,
    });

    if (error) {
      console.error("[book-call] Failed:", error);
      return NextResponse.json({ error: "Could not send call request notification." }, { status: 500 });
    }

    console.log(`[book-call] Call request notification → ${RECIPIENT_LEADS} | ${name} — ${preferredTime || "no time specified"}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[book-call] Failed:", err);
    return NextResponse.json({ error: "Could not send call request notification." }, { status: 500 });
  }
}
