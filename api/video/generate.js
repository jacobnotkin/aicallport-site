import {
  config,
  createJob,
  json,
  normalizeRequest,
  readJsonBody,
  runtime,
  submitProviderJob,
  updateJob
} from "./_shared.js";

export { config, runtime };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method not allowed." });
  }

  try {
    const body = await readJsonBody(req);
    const input = normalizeRequest(body);
    const job = createJob({ input });

    updateJob(job.id, {
      status: "rendering",
      progress: 25
    });

    const providerResult = await submitProviderJob(input);
    const finalJob = updateJob(job.id, {
      status: providerResult.status,
      progress: providerResult.progress,
      provider: providerResult.provider,
      externalJobId: providerResult.externalJobId,
      assets: providerResult.assets || null,
      error: providerResult.error || null
    });

    return json(res, 200, {
      jobId: finalJob.id,
      status: finalJob.status,
      progress: finalJob.progress,
      mode: finalJob.mode,
      provider: finalJob.provider,
      assets: finalJob.assets
    });
  } catch (error) {
    return json(res, 400, {
      error: error.message || "Unable to start video generation."
    });
  }
}
