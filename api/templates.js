import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const { industry } = req.query;

    const basePath = path.join(process.cwd(), "data", "templates");

    // Load global templates
    const globalPath = path.join(basePath, "global.json");
    const globalRaw = fs.readFileSync(globalPath, "utf8");
    const globalTemplates = JSON.parse(globalRaw);

    let finalTemplates = globalTemplates.templates || {};

    // If industry requested and not global, try to merge
    if (industry && industry !== "global") {
      const industryPath = path.join(basePath, `${industry}.json`);

      if (fs.existsSync(industryPath)) {
        const industryRaw = fs.readFileSync(industryPath, "utf8");
        const industryTemplates = JSON.parse(industryRaw);

        finalTemplates = {
          ...finalTemplates,
          ...(industryTemplates.templates || {})
        };
      }
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=604800"
    );

    res.status(200).json({
      industry: industry || "global",
      templates: finalTemplates
    });

  } catch (err) {
    console.error("Templates API error:", err);
    res.status(500).json({ error: "Failed to load templates" });
  }
}
