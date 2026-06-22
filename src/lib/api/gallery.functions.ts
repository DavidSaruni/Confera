import { createServerFn } from "@tanstack/react-start";

import { CONFERENCE, GALLERY } from "@/data/conference";
import { fetchGalleryImages } from "@/lib/gallery.server";

export const getGalleryImages = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const remote = await fetchGalleryImages(CONFERENCE.driveGalleryUrl);
    if (remote.length > 0) {
      return { images: remote, source: "share" as const };
    }
  } catch (error) {
    console.error("[gallery] Failed to load shared album:", error);
  }

  return { images: GALLERY, source: "fallback" as const };
});
