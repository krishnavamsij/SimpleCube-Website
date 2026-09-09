// lib/email-config.ts

/**
 * Email Configuration for Hyniva
 * - Sender: ravi@hyniva.com (verified in SES)
 * - Recipients: Various hyniva.com addresses based on form type
 */

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
    console.error("❌ SES source email not configured (expected SES_SOURCE_EMAIL or SENDER_EMAIL)");
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
    console.error("❌ Incomplete SES credentials: both ACCESS_KEY_ID and SECRET_ACCESS_KEY are required");
  }

  return undefined;
}

// Contact Form → kvjadapolu@simplecube.co
export const SES_RECIPIENT_CONTACT = process.env.SES_RECIPIENT_CONTACT || "kvjadapolu@simplecube.co";

// Case Study Inquiry → kvjadapolu@simplecube.co
export const SES_RECIPIENT_CASESTUDY = process.env.SES_RECIPIENT_CASESTUDY || "kvjadapolu@simplecube.co";

// Careers: Onsite Applications (US, Canada, etc.) → careers@hyniva.com
export const SES_RECIPIENT_CAREERS_US = process.env.SES_RECIPIENT_CAREERS_US || "careers@hyniva.com";

// Careers: India Applications → hr@hyniva.com
export const SES_RECIPIENT_CAREERS_NONUS = process.env.SES_RECIPIENT_CAREERS_NONUS || "hr@hyniva.com";

/**
 * Configuration Summary:
 * 
 * SENDER:
 * ✅ ravi@hyniva.com (from SES_SOURCE_EMAIL)
 * 
 * RECIPIENTS:
 * - Contact inquiries → kvjadapolu@simplecube.co
 * - Case study requests → kvjadapolu@simplecube.co
 * - Onsite job applications (US, Canada, etc.) → careers@hyniva.com
 * - India job applications → hr@hyniva.com
 */

export const EMAIL_CONFIG = {
  sender: getSesSourceEmail(),
  senderName: "Hyniva",
  region: REGION,
  recipients: {
    contact: SES_RECIPIENT_CONTACT,
    caseStudy: SES_RECIPIENT_CASESTUDY,
    careersOnsite: SES_RECIPIENT_CAREERS_US,
    careersIndia: SES_RECIPIENT_CAREERS_NONUS,
  },
};