import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const industry = (req.query.industry || "global").toString().toLowerCase();

    const basePath = path.join(process.cwd(), "data", "templates");
    const industryPath = path.join(basePath, `${industry}.json`);
    const globalPath = path.join(basePath, "global.json");

    const filePath = fs.existsSync(industryPath) ? industryPath : globalPath;

    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=604800"
    );

    return res.status(200).json(data);
  } catch (err) {
    console.error("Templates API error:", err);
    return res.status(500).json({ error: "Failed to load templates" });
  }
}
