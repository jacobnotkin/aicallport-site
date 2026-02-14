// script.js
// Frontend glue: pulls config from /api/config and starts Vapi using assistantId.

let vapi = null;
let configCache = null;

async function getConfig() {
  if (configCache) return configCache;

  const res = await fetch("/api/config", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load /api/config");
  }

  const data = await res.json();

  if (!data.vapiPublicKey) {
    throw new Error("Missing vapiPublicKey in /api/config response");
  }
  if (!data.assistantId) {
    throw new Error("Missing assistantId in /api/config response");
  }

  configCache = data;
  return data;
}

async function initVapiIfNeeded() {
  if (vapi) return vapi;

  const cfg = await getConfig();

  // Vapi Web SDK is loaded in index.html from:
  // https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest
  // It usually exposes window.Vapi
  if (!window.Vapi) {
    throw new Error("Vapi SDK not found. Check that @vapi-ai/web script is loaded in index.html.");
  }

  vapi = new window.Vapi(cfg.vapiPublicKey);

  // Optional: basic debug logs
  vapi.on("call-start", () => console.log("[Vapi] call-start"));
  vapi.on("call-end", () => console.log("[Vapi] call-end"));
  vapi.on("error", (e) => console.error("[Vapi] error", e));

  return vapi;
}

async function startActivation() {
  const btn = document.getElementById("startActivationBtn");
  try {
    if (btn) btn.disabled = true;

    const cfg = await getConfig();
    const v = await initVapiIfNeeded();

    // Start the assistant call
    await v.start(cfg.assistantId);

  } catch (err) {
    console.error(err);
    alert("Activation failed. Open browser Console (F12) to see the error.");
  } finally {
    if (btn) btn.disabled = false;
  }
}

async function stopActivation() {
  try {
    if (!vapi) return;
    await vapi.stop();
  } catch (err) {
    console.error(err);
  }
}

function wireButtons() {
  // IMPORTANT:
  // Your Start Activation button must have id="startActivationBtn"
  // If you also want a stop button, give it id="stopActivationBtn"

  const startBtn = document.getElementById("startActivationBtn");
  const stopBtn = document.getElementById("stopActivationBtn");

  if (startBtn) startBtn.addEventListener("click", startActivation);
  if (stopBtn) stopBtn.addEventListener("click", stopActivation);
}

// Wait until the HTML is ready
document.addEventListener("DOMContentLoaded", () => {
  wireButtons();
});
