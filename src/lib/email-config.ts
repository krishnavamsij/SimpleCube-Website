import { Resend } from "resend";

export const DEFAULT_RECIPIENT = "kvjadapolu@simplecube.co";

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export function getResendFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    process.env.SES_SOURCE_EMAIL?.trim() ||
    process.env.SENDER_EMAIL?.trim() ||
    "SimpleCube <onboarding@resend.dev>"
  );
}

export const RECIPIENT_CONTACT =
  process.env.RESEND_RECIPIENT_CONTACT ||
  process.env.SES_RECIPIENT_CONTACT ||
  DEFAULT_RECIPIENT;

export const RECIPIENT_CAREERS =
  process.env.RESEND_RECIPIENT_CAREERS ||
  process.env.SES_RECIPIENT_CAREERS_US ||
  process.env.SES_RECIPIENT_CAREERS_NONUS ||
  DEFAULT_RECIPIENT;

export const RECIPIENT_CASESTUDY =
  process.env.RESEND_RECIPIENT_CASESTUDY ||
  process.env.SES_RECIPIENT_CASESTUDY ||
  DEFAULT_RECIPIENT;

export const RECIPIENT_LEADS =
  process.env.RESEND_RECIPIENT_LEADS ||
  process.env.SES_RECIPIENT_LEADS ||
  DEFAULT_RECIPIENT;
