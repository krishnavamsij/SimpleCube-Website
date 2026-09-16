/**
 * Server-side Turnstile configuration.
 * The site key is passed to client widgets via props — do not use NEXT_PUBLIC_.
 */
export function getTurnstileSiteKey(): string | undefined {
  const siteKey = process.env.TURNSTILE_SITE_KEY?.trim();
  return siteKey || undefined;
}

export function isTurnstileConfigured(): boolean {
  return Boolean(getTurnstileSiteKey());
}
