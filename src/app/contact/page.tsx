import ContactPageClient from "./contact-page-client";
import { getTurnstileSiteKey } from "@/lib/turnstile-config";

export default function ContactPage() {
  return <ContactPageClient turnstileSiteKey={getTurnstileSiteKey()} />;
}
