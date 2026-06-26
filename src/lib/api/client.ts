import { CONFERENCE, ABSTRACTS, GALLERY } from "@/data/conference";
import { fetchAbstractsFromSheet } from "@/lib/abstracts.server";
import { fetchFeedbackStats } from "@/lib/feedback.server";
import { isSynologySharingUrl } from "@/lib/gallery";

export async function fetchGalleryImages() {
  if (isSynologySharingUrl(CONFERENCE.driveGalleryUrl)) {
    return { images: [], source: "external" as const };
  }

  const albumUrl = encodeURIComponent(CONFERENCE.driveGalleryUrl);
  try {
    const response = await fetch(`/api/gallery?url=${albumUrl}`);
    if (!response.ok) throw new Error(`Gallery API ${response.status}`);
    const data = (await response.json()) as { images?: string[] };
    if (data.images && data.images.length > 0) {
      return { images: data.images, source: "share" as const };
    }
  } catch (error) {
    console.warn("[gallery] Could not load shared album:", error);
  }
  return { images: GALLERY, source: "fallback" as const };
}

export async function fetchAbstracts() {
  try {
    const remote = await fetchAbstractsFromSheet(CONFERENCE.driveAbstractsUrl);
    if (remote.length > 0) {
      return { abstracts: remote, source: "sheet" as const };
    }
  } catch (error) {
    console.warn("[abstracts] Could not load spreadsheet:", error);
  }
  return { abstracts: ABSTRACTS, source: "fallback" as const };
}

export async function fetchFeedbackStatsOnly() {
  return fetchFeedbackStats(
    CONFERENCE.feedbackFormUrl,
    CONFERENCE.feedbackResponsesSheetUrl,
    CONFERENCE.feedbackFormTitle,
  );
}

export function spreadsheetEmbedUrl(sheetUrl: string): string | null {
  const match = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://docs.google.com/spreadsheets/d/${match[1]}/htmlembed?widget=true&headers=false`;
}

export function drivePdfEmbedUrl(pdfUrl: string): string | null {
  const match = pdfUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://drive.google.com/file/d/${match[1]}/preview`;
}

export function drivePdfDownloadUrl(pdfUrl: string): string | null {
  const match = pdfUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://drive.google.com/uc?export=download&id=${match[1]}`;
}
