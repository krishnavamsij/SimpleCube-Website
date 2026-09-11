import { NextResponse } from "next/server";
import {
  getResendClient,
  getResendFromEmail,
  RECIPIENT_LEADS,
} from "@/lib/email-config";

export async function POST(request: Request) {
  const resend = getResendClient();
  if (!resend) {
    console.error("[leads/create] RESEND_API_KEY not configured");
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
  const problem = typeof body.problem === "string" ? body.problem.trim() : "";
  const organisation =
    typeof body.organisation === "string" ? body.organisation.trim() : "";

  if (!name || !email || !intent) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
            <div style="background:linear-gradient(135deg,#0f172a 0%,#135498 100%);padding:32px 32px 24px;border-radius:12px 12px 0 0;">
                <h1 style="color:#ffffff;margin:0 0 6px;font-size:22px;font-weight:700;">New Business Inquiry</h1>
                <p style="color:#93c5fd;margin:0;font-size:14px;">A potential customer has expressed interest in SimpleCube services.</p>
            </div>
            <div style="background:#ffffff;padding:28px 32px;border:1px solid #e2e8f0;border-top:none;">
                <table style="border-collapse:collapse;width:100%;">
                    <tr style="border-bottom:1px solid #f1f5f9;">
                        <td style="padding:12px 0;font-weight:600;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;width:160px;">Contact Name</td>
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
                    <tr style="border-bottom:1px solid #f1f5f9;">
                        <td style="padding:12px 0;font-weight:600;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Area of Interest</td>
                        <td style="padding:12px 0;color:#0f172a;font-weight:500;">${intent}</td>
                    </tr>
                    ${problem ? `
                    <tr>
                        <td style="padding:12px 0;font-weight:600;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;">Business Challenge</td>
                        <td style="padding:12px 0;color:#0f172a;line-height:1.6;">${problem}</td>
                    </tr>` : ""}
                </table>
                <div style="margin-top:24px;padding:18px 20px;background:#eff6ff;border-radius:8px;border-left:4px solid #135498;">
                    <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#135498;text-transform:uppercase;letter-spacing:0.05em;">Recommended Next Step</p>
                    <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.6;">Review the requirement and reach out to the prospect.</p>
                </div>
            </div>
            <div style="background:#f8fafc;padding:16px 32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
                <p style="color:#94a3b8;font-size:11px;margin:0;">Captured via SimpleCube website assistant</p>
            </div>
        </div>
    `;

  const text = [
    "New Business Inquiry",
    "================================================",
    `Contact Name:      ${name}`,
    `Email:             ${email}`,
    ...(organisation ? [`Organisation:       ${organisation}`] : []),
    `Area of Interest:  ${intent}`,
    ...(problem ? [`Business Challenge: ${problem}`] : []),
    "",
    "Captured via SimpleCube website assistant",
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: getResendFromEmail(),
      to: [RECIPIENT_LEADS],
      replyTo: email,
      subject: `New Business Inquiry – ${intent || "SimpleCube Services"}`,
      html,
      text,
    });

    if (error) {
      console.error("[leads/create] Failed:", error);
      return NextResponse.json({ error: "Could not send lead notification." }, { status: 500 });
    }

    console.log(`[leads/create] Internal notification → ${RECIPIENT_LEADS} | ${name} <${email}> — ${intent}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[leads/create] Failed:", err);
    return NextResponse.json({ error: "Could not send lead notification." }, { status: 500 });
  }
}
