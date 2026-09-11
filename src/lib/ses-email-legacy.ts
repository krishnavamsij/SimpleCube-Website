/**
 * Legacy AWS SES email configuration and helpers.
 * Preserved for reference — not used by active API routes (Resend is the mail provider).
 */
import { SESClient, SendEmailCommand, SendRawEmailCommand } from "@aws-sdk/client-ses";

export const REGION = process.env.REGION || process.env.AWS_REGION || "us-east-1";

function getEnvValue(...keys: string[]): string {
  for (const key of keys) {
    const value = process.env[key];
    if (value && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

export function getSesSourceEmail(): string {
  const sourceEmail = getEnvValue("SES_SOURCE_EMAIL", "SENDER_EMAIL");
  if (!sourceEmail) {
    console.error("SES source email not configured (expected SES_SOURCE_EMAIL or SENDER_EMAIL)");
    return "";
  }
  return sourceEmail;
}

export function getSesCredentials():
  | { accessKeyId: string; secretAccessKey: string }
  | undefined {
  const accessKeyId = getEnvValue("ACCESS_KEY_ID", "AWS_ACCESS_KEY_ID");
  const secretAccessKey = getEnvValue("SECRET_ACCESS_KEY", "AWS_SECRET_ACCESS_KEY");

  if (accessKeyId && secretAccessKey) {
    return { accessKeyId, secretAccessKey };
  }

  if (accessKeyId || secretAccessKey) {
    console.error("Incomplete SES credentials: both ACCESS_KEY_ID and SECRET_ACCESS_KEY are required");
  }

  return undefined;
}

export const SES_RECIPIENT_CONTACT =
  process.env.SES_RECIPIENT_CONTACT || "kvjadapolu@simplecube.co";

export const SES_RECIPIENT_CASESTUDY =
  process.env.SES_RECIPIENT_CASESTUDY || "kvjadapolu@simplecube.co";

export const SES_RECIPIENT_CAREERS_US =
  process.env.SES_RECIPIENT_CAREERS_US || "kvjadapolu@simplecube.co";

export const SES_RECIPIENT_CAREERS_NONUS =
  process.env.SES_RECIPIENT_CAREERS_NONUS || "kvjadapolu@simplecube.co";

export const SES_RECIPIENT_LEADS =
  process.env.SES_RECIPIENT_LEADS || "kvjadapolu@simplecube.co";

export function createSesClient(): SESClient {
  const sesCredentials = getSesCredentials();
  return new SESClient({
    region: REGION,
    maxAttempts: 3,
    ...(sesCredentials ? { credentials: sesCredentials } : {}),
  });
}

export async function sendSesEmail({
  source,
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  source: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const ses = createSesClient();
  return ses.send(
    new SendEmailCommand({
      Source: source,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: {
          Text: { Data: text, Charset: "UTF-8" },
          Html: { Data: html, Charset: "UTF-8" },
        },
      },
      ...(replyTo ? { ReplyToAddresses: [replyTo] } : {}),
    }),
  );
}

export async function sendSesRawEmail(rawMessage: Buffer) {
  const ses = createSesClient();
  return ses.send(
    new SendRawEmailCommand({
      RawMessage: { Data: rawMessage },
    }),
  );
}

export const SES_EMAIL_CONFIG = {
  sender: getSesSourceEmail(),
  region: REGION,
  recipients: {
    contact: SES_RECIPIENT_CONTACT,
    caseStudy: SES_RECIPIENT_CASESTUDY,
    careersOnsite: SES_RECIPIENT_CAREERS_US,
    careersIndia: SES_RECIPIENT_CAREERS_NONUS,
    leads: SES_RECIPIENT_LEADS,
  },
};
