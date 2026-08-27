/**
 * Production video URLs are hosted on S3 so Amplify LFS/public packaging
 * cannot break hover/click playback.
 */
const S3_SITE_VIDEOS_BASE =
  process.env.NEXT_PUBLIC_SITE_VIDEOS_BASE ||
  "https://hyniva-web.s3.us-east-1.amazonaws.com/site-videos";

const bundledByPublicPath: Record<string, string> = {
  "/videos/rickey_burks_testimonial.mp4": `${S3_SITE_VIDEOS_BASE}/rickey_burks_testimonial.mp4`,
  "/videos/rickey-testimonial.mp4": `${S3_SITE_VIDEOS_BASE}/rickey-testimonial.mp4`,
  "/videos/podcast_trailer_recap.mp4": `${S3_SITE_VIDEOS_BASE}/podcast_trailer_recap.mp4`,
};

/** Resolve a content video path to a playable absolute URL. */
export function resolveSiteVideoUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  return bundledByPublicPath[url] ?? url;
}
