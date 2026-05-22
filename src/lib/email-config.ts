// lib/email-config.ts

/**
 * Email Configuration for Hyniva
 * - Sender: ravi@hyniva.com (verified in SES)
 * - Recipients: Various hyniva.com addresses based on form type
 */

export const REGION = process.env.REGION || "us-east-1";

export function getSesSourceEmail(): string {
  const sourceEmail = process.env.SES_SOURCE_EMAIL;
  if (!sourceEmail) {
    console.error("❌ SES_SOURCE_EMAIL not configured in environment");
    return "";
  }
  return sourceEmail;
}

// Contact Form → connect@hyniva.com
export const SES_RECIPIENT_CONTACT = process.env.SES_RECIPIENT_CONTACT || "connect@hyniva.com";

// Case Study Inquiry → connect@hyniva.com
export const SES_RECIPIENT_CASESTUDY = process.env.SES_RECIPIENT_CASESTUDY || "connect@hyniva.com";

// Careers: US Applications → careers@hyniva.com
export const SES_RECIPIENT_CAREERS_US = process.env.SES_RECIPIENT_CAREERS_US || "careers@hyniva.com";

// Careers: Non-US Applications → hr@hyniva.com
export const SES_RECIPIENT_CAREERS_NONUS = process.env.SES_RECIPIENT_CAREERS_NONUS || "hr@hyniva.com";

/**
 * Configuration Summary:
 * 
 * SENDER:
 * ✅ ravi@hyniva.com (from SES_SOURCE_EMAIL)
 * 
 * RECIPIENTS:
 * - Contact inquiries → connect@hyniva.com
 * - Case study requests → connect@hyniva.com
 * - US job applications → careers@hyniva.com
 * - Non-US job applications → hr@hyniva.com
 */

export const EMAIL_CONFIG = {
  sender: getSesSourceEmail(),
  senderName: "Hyniva",
  region: REGION,
  recipients: {
    contact: SES_RECIPIENT_CONTACT,
    caseStudy: SES_RECIPIENT_CASESTUDY,
    careersUS: SES_RECIPIENT_CAREERS_US,
    careersNonUS: SES_RECIPIENT_CAREERS_NONUS,
  },
};