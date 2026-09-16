import CareersPageClient from "./careers-page-client";
import { getTurnstileSiteKey } from "@/lib/turnstile-config";

export default function CareersPage() {
  return <CareersPageClient turnstileSiteKey={getTurnstileSiteKey()} />;
}
