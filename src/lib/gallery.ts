/** Google Drive folders can be embedded; Google Photos share pages cannot (403 in iframes). */

export function isGooglePhotosUrl(url: string): boolean {
  return /photos\.(google\.com|app\.goo\.gl)/i.test(url);
}

export function isGoogleDriveFolderUrl(url: string): boolean {
  return /drive\.google\.com\/drive\/folders\//i.test(url);
}

export function toDriveFolderEmbedUrl(url: string): string | null {
  const match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://drive.google.com/embeddedfolderview?id=${match[1]}#grid`;
}

export function galleryLinkLabel(url: string): string {
  if (isGooglePhotosUrl(url)) return "Open full Google Photos album";
  if (isGoogleDriveFolderUrl(url)) return "Open full Google Drive gallery";
  return "Open full gallery";
}
