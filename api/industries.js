import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "industries.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const industries = JSON.parse(raw);

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=604800"
    );

    res.status(200).json(industries);
  } catch (err) {
    console.error("Industries API error:", err);
    res.status(500).json({ error: "Failed to load industries.json" });
  }
}
