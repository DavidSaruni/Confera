import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAbstractsData } from "../src/server/api-handler";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const data = await getAbstractsData();
    res.status(200).json(data);
  } catch (error) {
    console.error("[api/abstracts]", error);
    res.status(500).json({ error: "Failed to load abstracts" });
  }
}
