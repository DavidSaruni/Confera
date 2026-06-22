import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getGalleryData } from "../src/server/api-handler";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const data = await getGalleryData();
    res.status(200).json(data);
  } catch (error) {
    console.error("[api/gallery]", error);
    res.status(500).json({ error: "Failed to load gallery" });
  }
}
