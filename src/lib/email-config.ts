/**
 * Centralized email configuration.
 * Resolves SES configuration from environment variables.
 * Logs status on each request to help diagnose deployment issues.
 */

export const AWS_REGION = process.env.AWS_REGION || "us-east-1";
export const SES_SOURCE_EMAIL = process.env.SES_SOURCE_EMAIL;
export const SES_RECIPIENT_CONTACT = process.env.SES_RECIPIENT_CONTACT || "connect@hyniva.com";
export const SES_RECIPIENT_CASESTUDY = process.env.SES_RECIPIENT_CASESTUDY || "connect@hyniva.com";
export const SES_RECIPIENT_CAREERS_US = process.env.SES_RECIPIENT_CAREERS_US || "careers@hyniva.com";
export const SES_RECIPIENT_CAREERS_NONUS = process.env.SES_RECIPIENT_CAREERS_NONUS || "hr@hyniva.com";

export function getSesSourceEmail(): string | undefined {
  console.log(`[email-config] SES_SOURCE_EMAIL loaded: ${Boolean(SES_SOURCE_EMAIL)}`);
  return SES_SOURCE_EMAIL;
}
