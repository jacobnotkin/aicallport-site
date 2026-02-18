import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const { industry } = req.query;

    const basePath = path.join(process.cwd(), "data", "templates");
    const globalPath = path.join(basePath, "global.json");

    // Debug info
    const debug = {
      cwd: process.cwd(),
      basePath,
      globalPath,
      baseExists: fs.existsSync(basePath),
      globalExists: fs.existsSync(globalPath),
    };

    if (!debug.baseExists) {
      return res.status(500).json({ error: "Templates folder not found", debug });
    }
    if (!debug.globalExists) {
      return res.status(500).json({ error: "global.json not found", debug });
    }

    const globalRaw = fs.readFileSync(globalPath, "utf8");

    let globalJson;
    try {
      globalJson = JSON.parse(globalRaw);
    } catch (jsonErr) {
      return res.status(500).json({
        error: "global.json is invalid JSON",
        jsonError: jsonErr.message,
        hint: "Most common cause: quotes/newlines in script field not escaped",
        debug,
      });
    }

    let finalTemplates = globalJson.templates || {};

    if (industry && industry !== "global") {
      const industryPath = path.join(basePath, `${industry}.json`);
      if (fs.existsSync(industryPath)) {
        const industryRaw = fs.readFileSync(industryPath, "utf8");
        const industryJson = JSON.parse(industryRaw);
        finalTemplates = { ...finalTemplates, ...(industryJson.templates || {}) };
      }
    }

    res.status(200).json({ industry: industry || "global", templates: finalTemplates, debug });
  } catch (err) {
    res.status(500).json({
      error: "Templates API crashed",
      message: err.message,
      stack: err.stack,
    });
  }
}
