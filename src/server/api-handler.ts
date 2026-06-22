import { CONFERENCE, ABSTRACTS, GALLERY } from "../data/conference";
import { fetchAbstractsFromSheet } from "../lib/abstracts.server";
import { fetchFeedbackStats, toFeedbackEmbedUrl } from "../lib/feedback.server";
import { fetchGalleryImages } from "../lib/gallery.server";

export async function getGalleryData() {
  try {
    const remote = await fetchGalleryImages(CONFERENCE.driveGalleryUrl);
    if (remote.length > 0) {
      return { images: remote, source: "share" as const };
    }
  } catch (error) {
    console.error("[gallery] Failed to load shared album:", error);
  }
  return { images: GALLERY, source: "fallback" as const };
}

export async function getAbstractsData() {
  try {
    const remote = await fetchAbstractsFromSheet(CONFERENCE.driveAbstractsUrl);
    if (remote.length > 0) {
      return { abstracts: remote, source: "sheet" as const };
    }
  } catch (error) {
    console.error("[abstracts] Failed to load spreadsheet:", error);
  }
  return { abstracts: ABSTRACTS, source: "fallback" as const };
}

export async function getFeedbackData() {
  const stats = await fetchFeedbackStats(
    CONFERENCE.feedbackFormUrl,
    CONFERENCE.feedbackResponsesSheetUrl,
  );
  return {
    embedUrl: toFeedbackEmbedUrl(CONFERENCE.feedbackFormUrl),
    formUrl: CONFERENCE.feedbackFormUrl,
    stats,
  };
}

export async function handleApiRequest(pathname: string): Promise<unknown> {
  switch (pathname) {
    case "/api/gallery":
      return getGalleryData();
    case "/api/abstracts":
      return getAbstractsData();
    case "/api/feedback":
      return getFeedbackData();
    default:
      throw new Error(`Not found: ${pathname}`);
  }
}
