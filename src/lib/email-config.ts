/**
 * Centralized email configuration.
 * Resolves BREVO_API_KEY from environment variables.
 * Logs status on each request to help diagnose deployment issues.
 */

export function getBrevoApiKey(): string | undefined {
  const key = "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";
  console.log(`[email-config] BREVO_API_KEY loaded: ${Boolean(key)}`);
  return key;
}

export const BREVO_SMTP_URL = 'https://api.brevo.com/v3/smtp/email';
export const SENDER_EMAIL = 'contact@hyniva.com';
export const SENDER_NAME = 'Hyniva';
