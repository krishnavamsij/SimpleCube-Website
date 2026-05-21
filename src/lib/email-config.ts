/**
 * Centralized email configuration.
 * Resolves BREVO_API_KEY from environment variables.
 * Logs status on each request to help diagnose deployment issues.
 */

export function getBrevoApiKey(): string | undefined {
  // Check standard env var name first
  const key =
    process.env.BREVO_API_KEY ||
    process.env.brevo_api_key ||
    process.env.NEXT_BREVO_API_KEY;

  if (key) {
    console.log(`[email-config] BREVO_API_KEY resolved: ${key.substring(0, 10)}...`);
  } else {
    console.error(
      '[email-config] BREVO_API_KEY is NOT set. ' +
      'Checked: BREVO_API_KEY, brevo_api_key, NEXT_BREVO_API_KEY. ' +
      'Please add it in AWS Amplify Console → Environment Variables.'
    );
  }

  return key;
}

export const BREVO_SMTP_URL = 'https://api.brevo.com/v3/smtp/email';
export const SENDER_EMAIL = 'contact@hyniva.com';
export const SENDER_NAME = 'Hyniva';
