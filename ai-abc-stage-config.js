window.AIABCStageConfig = window.AIABCStageConfig || (() => {
  const validStages = ["A", "B", "C"];
  const normalizeStage = (value, fallback = "A") => validStages.includes(value) ? value : fallback;

  const state = {
    currentStage: "A",
    liveStage: "A",
    previewStage: "A"
  };

  return {
    getCurrentStage() {
      return state.currentStage;
    },
    getLiveStage() {
      return normalizeStage(state.liveStage, state.currentStage);
    },
    getPreviewStage() {
      return normalizeStage(state.previewStage, state.currentStage);
    },
    setCurrentStage(stage) {
      state.currentStage = normalizeStage(stage, state.currentStage);
      state.liveStage = state.currentStage;
      state.previewStage = state.currentStage;
      return state.currentStage;
    },
    setLiveStage(stage) {
      state.liveStage = normalizeStage(stage, state.liveStage);
      state.currentStage = state.liveStage;
      return state.liveStage;
    },
    setPreviewStage(stage) {
      state.previewStage = normalizeStage(stage, state.previewStage);
      return state.previewStage;
    },
    normalizeStage
  };
})();
