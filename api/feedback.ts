import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getFeedbackData } from "../src/server/api-handler";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const data = await getFeedbackData();
    res.status(200).json(data);
  } catch (error) {
    console.error("[api/feedback]", error);
    res.status(500).json({ error: "Failed to load feedback data" });
  }
}
