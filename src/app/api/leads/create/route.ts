import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { REGION, getSesCredentials, getSesSourceEmail } from "@/lib/email-config";

const LEADS_RECIPIENT = process.env.SES_RECIPIENT_LEADS || "connect@hyniva.com";

const sesCredentials = getSesCredentials();
const ses = new SESClient({
    region: REGION,
    ...(sesCredentials ? { credentials: sesCredentials } : {}),
});

export async function POST(request: Request) {
    const sourceEmail = getSesSourceEmail();
    if (!sourceEmail) {
        console.error("[leads/create] SES_SOURCE_EMAIL not configured");
        return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const name    = typeof body.name    === "string" ? body.name.trim()    : "";
    const email   = typeof body.email   === "string" ? body.email.trim()   : "";
    const intent  = typeof body.intent  === "string" ? body.intent.trim()  : "";
    const problem = typeof body.problem === "string" ? body.problem.trim() : "";

    if (!name || !email || !intent) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;color:#1e293b;">
            <h2 style="color:#00c9b1;margin-bottom:4px;">🎯 New Lead — AIRA Chatbot</h2>
            <p style="color:#6b7280;margin-top:0;font-size:13px;">Someone just completed the onboarding flow</p>
            <table style="border-collapse:collapse;width:100%;margin-top:16px;">
                <tr style="border-bottom:1px solid #f3f4f6;">
                    <td style="padding:10px 0;font-weight:bold;color:#374151;width:110px;">Name</td>
                    <td style="padding:10px 0;">${name}</td>
                </tr>
                <tr style="border-bottom:1px solid #f3f4f6;">
                    <td style="padding:10px 0;font-weight:bold;color:#374151;">Email</td>
                    <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#00c9b1;">${email}</a></td>
                </tr>
                <tr style="border-bottom:1px solid #f3f4f6;">
                    <td style="padding:10px 0;font-weight:bold;color:#374151;">Interest</td>
                    <td style="padding:10px 0;">${intent}</td>
                </tr>
                ${problem ? `
                <tr>
                    <td style="padding:10px 0;font-weight:bold;color:#374151;">Details</td>
                    <td style="padding:10px 0;">${problem}</td>
                </tr>` : ""}
            </table>
            <div style="margin-top:24px;padding:16px;background:#f0faf9;border-radius:8px;border-left:4px solid #00c9b1;">
                <p style="margin:0;font-size:13px;color:#374151;">
                    <strong>Action:</strong> Reach out to ${name} at
                    <a href="mailto:${email}" style="color:#00c9b1;">${email}</a> within 24 hours.
                </p>
            </div>
            <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;">
            <p style="color:#9ca3af;font-size:11px;">Captured via AIRA — Hyniva Website Chatbot</p>
        </div>
    `;

    const text = [
        "New Lead — AIRA Chatbot",
        "================================",
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Interest: ${intent}`,
        ...(problem ? [`Details:  ${problem}`] : []),
        "",
        `Action: Reach out to ${name} at ${email} within 24 hours.`,
        "",
        "Captured via AIRA — Hyniva Website Chatbot",
    ].join("\n");

    try {
        await ses.send(new SendEmailCommand({
            Source: `AIRA at Hyniva <${sourceEmail}>`,
            Destination: { ToAddresses: [LEADS_RECIPIENT] },
            Message: {
                Subject: { Data: `[New Lead] ${name} — ${intent}`, Charset: "UTF-8" },
                Body: {
                    Text: { Data: text, Charset: "UTF-8" },
                    Html: { Data: html, Charset: "UTF-8" },
                },
            },
            ReplyToAddresses: [email],
        }));
        console.log(`[leads/create] ✅ Internal notification → ${LEADS_RECIPIENT} | ${name} <${email}> — ${intent}`);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[leads/create] ❌ Failed:", err);
        return NextResponse.json({ error: "Could not send lead notification." }, { status: 500 });
    }
}
