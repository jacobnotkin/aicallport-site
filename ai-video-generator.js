(function () {
  const form = document.querySelector("[data-video-form]");
  if (!form) return;

  const statusCard = document.querySelector("[data-status-card]");
  const submitButton = form.querySelector('button[type="submit"]');
  const progressBar = document.querySelector("[data-progress-fill]");
  const statusLabel = document.querySelector("[data-status-label]");
  const statusMeta = document.querySelector("[data-status-meta]");
  const resultPanel = document.querySelector("[data-result-panel]");
  const resultVideo = document.querySelector("[data-result-video]");
  const resultImage = document.querySelector("[data-result-image]");
  const errorBox = document.querySelector("[data-error]");

  function setProgress(value) {
    if (progressBar) progressBar.style.width = `${Math.max(0, Math.min(100, value))}%`;
  }

  function setStatus(label, meta, progress) {
    statusCard?.removeAttribute("hidden");
    if (statusLabel) statusLabel.textContent = label;
    if (statusMeta) statusMeta.textContent = meta;
    setProgress(progress);
  }

  function setError(message) {
    if (!errorBox) return;
    errorBox.hidden = !message;
    errorBox.textContent = message || "";
  }

  function renderAssets(assets) {
    if (!assets || !resultPanel) return;

    resultPanel.hidden = false;

    if (resultVideo && assets.videoUrl) {
      resultVideo.src = assets.videoUrl;
      resultVideo.hidden = false;
    }

    if (resultImage && assets.storyboardImage) {
      resultImage.src = assets.storyboardImage;
      resultImage.hidden = false;
    }
  }

  async function fetchJson(url, options) {
    const response = await fetch(url, options);
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Request failed.");
    }
    return payload;
  }

  async function pollJob(jobId) {
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const payload = await fetchJson(`/api/video/status?jobId=${encodeURIComponent(jobId)}`);
      setStatus(
        payload.status === "succeeded" ? "Video ready" : "Rendering video",
        `${payload.provider} mode • ${payload.progress}% complete`,
        payload.progress
      );

      if (payload.status === "succeeded") {
        renderAssets(payload.assets);
        return;
      }

      if (payload.status === "failed") {
        throw new Error(payload.error || "Generation failed.");
      }

      await new Promise((resolve) => window.setTimeout(resolve, 1200));
    }

    throw new Error("The render is still in progress. Try again in a moment.");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setError("");
    resultPanel.hidden = true;
    submitButton.disabled = true;
    submitButton.textContent = "Generating...";
    setStatus("Starting render", "Packaging prompt and scene controls", 8);

    const formData = new FormData(form);
    const payload = {
      prompt: formData.get("prompt"),
      stylePreset: formData.get("stylePreset"),
      durationSeconds: formData.get("durationSeconds"),
      aspectRatio: formData.get("aspectRatio"),
      imageUrl: formData.get("imageUrl")
    };

    try {
      const result = await fetchJson("/api/video/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      setStatus("Render accepted", `${result.provider} mode • ${result.progress}% complete`, result.progress);

      if (result.status === "succeeded") {
        setStatus("Video ready", `${result.provider} mode • ${result.progress}% complete`, result.progress);
        renderAssets(result.assets);
      } else {
        await pollJob(result.jobId);
      }
    } catch (error) {
      setError(error.message || "Something went wrong.");
      setStatus("Render failed", "Check the error and try again", 0);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Generate Video";
    }
  });
})();
