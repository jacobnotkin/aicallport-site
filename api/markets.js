import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "markets.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const markets = JSON.parse(raw);

    // CDN cache for performance + stability
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=604800"
    );

    res.status(200).json({ markets });
  } catch (err) {
    console.error("Markets API error:", err);
    res.status(500).json({ error: "Failed to load markets.json" });
  }
}
