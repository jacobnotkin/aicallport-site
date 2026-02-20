const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  // Basic CORS (helps if browser blocks requests)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  let countries;

  // Try to load from /data/countries.json if it exists
  try {
    const filePath = path.join(process.cwd(), "data", "countries.json");
    const raw = fs.readFileSync(filePath, "utf8");
    countries = JSON.parse(raw);
  } catch (e) {
    // Fallback list (so endpoint always returns something)
    countries = [
      { code: "US", name: "United States" },
      { code: "CA", name: "Canada" },
      { code: "GB", name: "United Kingdom" },
    ];
  }

  return res.status(200).json(countries);
};
