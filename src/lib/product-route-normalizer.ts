const PRODUCT_ROUTE_MAP = {
  "/aira": "/products/aira",
  "/finxserve": "/products/finxserve",
  "/claim-pioneer": "/products/claim-pioneer",
  "/hyper": "/products/hyper",
} as const;

const PRODUCT_ROUTE_REGEX = /^\/(aira|finxserve|claim-pioneer|hyper)(?=[/?#]|$)/i;
const PRODUCT_LINK_IN_TEXT_REGEX = /https?:\/\/(?:www\.)?hyniva\.com\/(aira|finxserve|claim-pioneer|hyper)(?=([/?#][^\s<>"]*)?|\b)/gi;

function normalizeProductPathname(pathname: string): string {
  return pathname.replace(PRODUCT_ROUTE_REGEX, (match) => {
    const normalized = match.toLowerCase() as keyof typeof PRODUCT_ROUTE_MAP;
    return PRODUCT_ROUTE_MAP[normalized] ?? match;
  });
}

export function normalizeProductRoute(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return trimmed;

  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return normalizeProductPathname(trimmed);
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host !== "hyniva.com") return trimmed;

    parsed.pathname = normalizeProductPathname(parsed.pathname);
    return parsed.toString();
  } catch {
    return trimmed;
  }
}

export function normalizeProductLinksInText(text: string): string {
  return text.replace(PRODUCT_LINK_IN_TEXT_REGEX, (_match, slug, suffix = "") => {
    const key = `/${String(slug).toLowerCase()}` as keyof typeof PRODUCT_ROUTE_MAP;
    return `https://www.hyniva.com${PRODUCT_ROUTE_MAP[key]}${suffix}`;
  });
}