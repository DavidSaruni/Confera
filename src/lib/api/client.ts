async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`API ${path} failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export function fetchGalleryImages() {
  return apiGet<{ images: string[]; source: "share" | "fallback" }>("/api/gallery");
}

export function fetchAbstracts() {
  return apiGet<{
    abstracts: import("@/lib/abstracts.server").Abstract[];
    source: "sheet" | "fallback";
  }>("/api/abstracts");
}

export function fetchFeedback() {
  return apiGet<{
    embedUrl: string;
    formUrl: string;
    stats: import("@/lib/feedback.server").FeedbackStats;
  }>("/api/feedback");
}
