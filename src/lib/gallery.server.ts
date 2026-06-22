const PHOTO_ID_RE = /https:\/\/lh3\.googleusercontent\.com\/pw\/(AP1Gcz[A-Za-z0-9_-]+)/g;
const USERCONTENT_RE = /https:\/\/lh3\.googleusercontent\.com\/[^"'\\\s<>)]+/g;
const DRIVE_FILE_RE = /https:\/\/drive\.google\.com\/(?:file\/d\/|uc\?[^"']*id=)([a-zA-Z0-9_-]+)/g;

type GalleryCache = { images: string[]; expires: number };
const cache = new Map<string, GalleryCache>();
const CACHE_TTL_MS = 60 * 60 * 1000;

function normalizeShareUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const shareMatch = parsed.pathname.match(/\/share\/([^/]+)/);
    if (shareMatch) {
      const key = parsed.searchParams.get("key");
      const base = `https://photos.google.com/share/${shareMatch[1]}`;
      return key ? `${base}?key=${encodeURIComponent(key)}` : base;
    }
    return url;
  } catch {
    return url;
  }
}

function decodeGoogleUrl(raw: string): string {
  return raw.replaceAll("\\u003d", "=").replaceAll("\\u0026", "&").replaceAll("\\/", "/");
}

function sizedPhotoUrl(id: string): string {
  return `https://lh3.googleusercontent.com/pw/${id}=w1600-h1200`;
}

function sizedUserContentUrl(url: string): string {
  const clean = decodeGoogleUrl(url.split(/[ "'\\]/)[0] ?? url);
  if (/=w\d+/i.test(clean)) return clean.replace(/=w\d+[^"']*/, "=w1200-h900");
  return `${clean}=w1200-h900`;
}

function extractGooglePhotosUrls(html: string): string[] {
  const ids = new Set<string>();
  for (const match of html.matchAll(PHOTO_ID_RE)) ids.add(match[1]);

  if (ids.size > 0) {
    return [...ids].map(sizedPhotoUrl);
  }

  const urls = new Set<string>();
  for (const match of html.matchAll(USERCONTENT_RE)) {
    const url = sizedUserContentUrl(match[0]);
    if (!url.includes("googleusercontent.com")) continue;
    urls.add(url);
  }
  return [...urls];
}

function extractGoogleDriveUrls(html: string): string[] {
  const fileIds = new Set<string>();
  for (const match of html.matchAll(DRIVE_FILE_RE)) fileIds.add(match[1]);

  return [...fileIds].map(
    (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
  );
}

function isGooglePhotosUrl(url: string): boolean {
  return /photos\.(google\.com|app\.goo\.gl)/i.test(url);
}

function isGoogleDriveUrl(url: string): boolean {
  return /drive\.google\.com/i.test(url);
}

export function isGalleryShareConfigured(url: string): boolean {
  return !/your-gallery-folder-id|your-schedule-folder-id/i.test(url);
}

async function fetchShareHtml(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AHC2026Gallery/1.0)",
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Gallery fetch failed (${response.status})`);
  }

  return response.text();
}

export async function fetchGalleryImages(shareUrl: string): Promise<string[]> {
  if (!isGalleryShareConfigured(shareUrl)) return [];

  const cached = cache.get(shareUrl);
  if (cached && cached.expires > Date.now()) return cached.images;

  const targetUrl = isGooglePhotosUrl(shareUrl) ? normalizeShareUrl(shareUrl) : shareUrl;
  const html = await fetchShareHtml(targetUrl);

  const images = isGoogleDriveUrl(shareUrl)
    ? extractGoogleDriveUrls(html)
    : extractGooglePhotosUrls(html);

  cache.set(shareUrl, { images, expires: Date.now() + CACHE_TTL_MS });
  return images;
}
