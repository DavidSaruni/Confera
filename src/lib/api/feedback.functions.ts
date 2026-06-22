import { createServerFn } from "@tanstack/react-start";

import { CONFERENCE } from "@/data/conference";
import { fetchFeedbackStats, toFeedbackEmbedUrl } from "@/lib/feedback.server";

export const getFeedbackData = createServerFn({ method: "GET" }).handler(async () => {
  const stats = await fetchFeedbackStats(
    CONFERENCE.feedbackFormUrl,
    CONFERENCE.feedbackResponsesSheetUrl,
  );
  return {
    embedUrl: toFeedbackEmbedUrl(CONFERENCE.feedbackFormUrl),
    formUrl: CONFERENCE.feedbackFormUrl,
    stats,
  };
});
