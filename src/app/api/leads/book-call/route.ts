import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { REGION, getSesCredentials, getSesSourceEmail } from "@/lib/email-config";

const LEADS_RECIPIENT = process.env.SES_RECIPIENT_LEADS || "kvjadapolu@simplecube.co";

const sesCredentials = getSesCredentials();
const ses = new SESClient({
    region: REGION,
    ...(sesCredentials ? { credentials: sesCredentials } : {}),
});

export async function POST(request: Request) {
    const sourceEmail = getSesSourceEmail();
    if (!sourceEmail) {
        console.error("[book-call] SES_SOURCE_EMAIL not configured");
        return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const name          = typeof body.name          === "string" ? body.name.trim()          : "";
    const email         = typeof body.email         === "string" ? body.email.trim()         : "";
    const intent        = typeof body.intent        === "string" ? body.intent.trim()        : "";
    const organisation  = typeof body.organisation  === "string" ? body.organisation.trim()  : "";
    const preferredTime = typeof body.preferredTime === "string" ? body.preferredTime.trim() : "";

    if (!name || !email) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
            <!-- Header -->
            <div style="background:linear-gradient(135deg,#0f172a 0%,#135498 100%);padding:32px 32px 24px;border-radius:12px 12px 0 0;">
                <h1 style="color:#ffffff;margin:0 0 6px;font-size:22px;font-weight:700;">📅 Consultation Call Requested</h1>
                <p style="color:#93c5fd;margin:0;font-size:14px;">A prospect has requested a discussion with the Hyniva team.</p>
            </div>
            <!-- Body -->
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
                <!-- Next Step -->
                <div style="margin-top:24px;padding:18px 20px;background:#eff6ff;border-radius:8px;border-left:4px solid #135498;">
                    <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#135498;text-transform:uppercase;letter-spacing:0.05em;">Recommended Next Step</p>
                    <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.6;">Confirm the meeting with the prospect and assign the appropriate consultant or SME.</p>
                </div>
            </div>
            <!-- Footer -->
            <div style="background:#f8fafc;padding:16px 32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
                <p style="color:#94a3b8;font-size:11px;margin:0;">This request was captured via AIRA, Hyniva's AI assistant on hyniva.com</p>
            </div>
        </div>
    `;

    const text = [
        "📅 Consultation Call Requested",
        "A prospect has requested a discussion with the Hyniva team.",
        "================================================",
        `Contact Name:          ${name}`,
        `Email:                 ${email}`,
        ...(organisation  ? [`Organisation:          ${organisation}`]  : []),
        ...(intent        ? [`Area of Interest:      ${intent}`]        : []),
        ...(preferredTime ? [`Preferred Meeting Time: ${preferredTime}`] : []),
        "",
        "Recommended Next Step:",
        "Confirm the meeting with the prospect and assign the appropriate consultant or SME.",
        "",
        "Captured via AIRA — Hyniva AI Assistant (hyniva.com)",
    ].join("\n");

    try {
        await ses.send(new SendEmailCommand({
            Source: `AIRA at Hyniva <${sourceEmail}>`,
            Destination: { ToAddresses: [LEADS_RECIPIENT] },
            Message: {
                Subject: { Data: `Consultation Call Requested – ${intent || "Hyniva Services"}`, Charset: "UTF-8" },
                Body: {
                    Text: { Data: text, Charset: "UTF-8" },
                    Html: { Data: html, Charset: "UTF-8" },
                },
            },
            ReplyToAddresses: [email],
        }));
        console.log(`[book-call] ✅ Call request notification → ${LEADS_RECIPIENT} | ${name} — ${preferredTime || "no time specified"}`);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[book-call] ❌ Failed:", err);
        return NextResponse.json({ error: "Could not send call request notification." }, { status: 500 });
    }
}
