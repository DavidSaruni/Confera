import { createServerFn } from "@tanstack/react-start";

import { ABSTRACTS, CONFERENCE } from "@/data/conference";
import { fetchAbstractsFromSheet } from "@/lib/abstracts.server";

export const getAbstracts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const remote = await fetchAbstractsFromSheet(CONFERENCE.driveAbstractsUrl);
    if (remote.length > 0) {
      return { abstracts: remote, source: "sheet" as const };
    }
  } catch (error) {
    console.error("[abstracts] Failed to load spreadsheet:", error);
  }

  return { abstracts: ABSTRACTS, source: "fallback" as const };
});
