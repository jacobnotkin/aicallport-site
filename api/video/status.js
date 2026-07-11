import { config, getJob, json, runtime } from "./_shared.js";

export { config, runtime };

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return json(res, 405, { error: "Method not allowed." });
  }

  const jobId = String(req.query.jobId || "").trim();
  if (!jobId) {
    return json(res, 400, { error: "jobId is required." });
  }

  const job = getJob(jobId);
  if (!job) {
    return json(res, 404, { error: "Job not found." });
  }

  return json(res, 200, {
    jobId: job.id,
    status: job.status,
    progress: job.progress,
    mode: job.mode,
    provider: job.provider || job.mode,
    assets: job.assets || null,
    error: job.error || null,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt
  });
}
