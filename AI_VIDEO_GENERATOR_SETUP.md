# AI Video Generator MVP

This workspace now includes a working first-pass AI video generator surface:

- `ai-video-generator.html` for the product UI
- `ai-video-generator.js` for prompt submission, status handling, and output rendering
- `api/video/generate.js` to validate requests and start a render job
- `api/video/status.js` to query job state
- `api/video/_shared.js` for provider selection, request normalization, and demo-mode assets

## Current behavior

By default, the app runs in `demo` mode through:

```env
AI_VIDEO_PROVIDER=demo
```

That means the generator UX is fully testable without a third-party model API. The API immediately returns:

- a sample MP4 for playback
- a generated storyboard placeholder image
- a realistic job object with status and progress data

## Next step to make it truly AI-powered

Replace the `submitProviderJob()` implementation in `api/video/_shared.js` with your chosen provider call.

Recommended provider adapter shape:

1. Accept `prompt`, `durationSeconds`, `aspectRatio`, `stylePreset`, and `imageUrl`
2. Submit the generation request to your model provider
3. Return:

```js
{
  provider: "your-provider",
  externalJobId: "provider-job-id",
  status: "queued"
}
```

4. Update `api/video/status.js` to fetch the live provider job status and final asset URLs

## Strong product additions after that

1. Add user auth and saved generations
2. Store prompt history and downloadable outputs
3. Add credit usage or billing
4. Support image upload instead of URL-only reference input
5. Add camera motion presets and negative prompts
