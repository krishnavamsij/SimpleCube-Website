/**
 * Resolve content video paths to URLs that Amplify actually serves.
 * Production build copies `public/videos` → `.next/static/videos` (see
 * scripts/copy-site-videos.mjs). Dev keeps using `/videos/…` from public/.
 */
export function resolveSiteVideoUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (!url.startsWith("/videos/")) return url;

  if (process.env.NODE_ENV === "development") {
    return url;
  }

  const fileName = url.slice("/videos/".length);
  return `/_next/static/videos/${fileName}`;
}
