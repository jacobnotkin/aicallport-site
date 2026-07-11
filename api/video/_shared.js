export const runtime = "nodejs";
export const config = { api: { bodyParser: true } };

const jobStore = globalThis.__aiVideoJobStore || new Map();
globalThis.__aiVideoJobStore = jobStore;

export function json(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export function getVideoProvider() {
  return (process.env.AI_VIDEO_PROVIDER || "demo").trim().toLowerCase();
}

export function validatePrompt(prompt) {
  const cleanPrompt = String(prompt || "").trim();
  if (!cleanPrompt) {
    throw new Error("A prompt is required.");
  }
  if (cleanPrompt.length < 12) {
    throw new Error("Use a more descriptive prompt so the model has enough direction.");
  }
  if (cleanPrompt.length > 1500) {
    throw new Error("Prompt is too long. Keep it under 1500 characters.");
  }
  return cleanPrompt;
}

export function normalizeRequest(body) {
  const duration = Math.min(Math.max(Number(body.durationSeconds) || 6, 3), 12);
  const aspectRatio = ["16:9", "9:16", "1:1"].includes(body.aspectRatio) ? body.aspectRatio : "16:9";
  const stylePreset = ["cinematic", "product", "anime", "photoreal", "storyboard"].includes(body.stylePreset)
    ? body.stylePreset
    : "cinematic";
  const prompt = validatePrompt(body.prompt);
  const imageUrl = String(body.imageUrl || "").trim();

  return {
    prompt,
    durationSeconds: duration,
    aspectRatio,
    stylePreset,
    imageUrl
  };
}

export function createJob(payload) {
  const id = `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const job = {
    id,
    status: "queued",
    mode: getVideoProvider(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progress: 5,
    ...payload
  };

  jobStore.set(id, job);
  return job;
}

export function getJob(jobId) {
  return jobStore.get(jobId) || null;
}

export function updateJob(jobId, patch) {
  const job = jobStore.get(jobId);
  if (!job) return null;

  const nextJob = {
    ...job,
    ...patch,
    updatedAt: new Date().toISOString()
  };

  jobStore.set(jobId, nextJob);
  return nextJob;
}

export function buildDemoAssets(job) {
  const seed = encodeURIComponent(job.prompt.slice(0, 96));
  return {
    storyboardImage: `https://placehold.co/1280x720/0b1420/f3efe6.png?text=${seed}`,
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  };
}

export async function submitProviderJob(input) {
  const provider = getVideoProvider();

  if (provider === "demo") {
    return {
      provider,
      externalJobId: null,
      status: "succeeded",
      progress: 100,
      assets: buildDemoAssets(input)
    };
  }

  throw new Error(
    `Provider "${provider}" is not wired yet. Set AI_VIDEO_PROVIDER=demo to use the built-in MVP flow while we connect a real model API.`
  );
}
