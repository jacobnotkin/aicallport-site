import fs from "fs";
import path from "path";

function safeReadJSON(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export default function handler(req, res) {
  try {
    const { industry = "global", role = "" } = req.query;

    // Paths
    const templatesDir = path.join(process.cwd(), "data", "templates");
    const globalPath = path.join(templatesDir, "global.json");
    const industryPath = path.join(templatesDir, `${industry}.json`);

    // Load JSON (industry file optional)
    const globalTemplates = safeReadJSON(globalPath);
    const industryTemplates = safeReadJSON(industryPath);

    // Merge logic: industry overrides global if same role exists
    const merged = {
      industry,
      templates: {
        ...(globalTemplates?.templates || {}),
        ...(industryTemplates?.templates || {})
      }
    };

    // If role requested, return only that role’s templates
    if (role) {
      const roleTemplates = merged.templates[role] || [];
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=86400, stale-while-revalidate=604800"
      );
      return res.status(200).json({ industry, role, templates: roleTemplates });
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=604800"
    );
    return res.status(200).json(merged);
  } catch (err) {
    console.error("Templates API error:", err);
    return res.status(500).json({ error: "Failed to load templates" });
  }
}
