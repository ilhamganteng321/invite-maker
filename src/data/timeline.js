export const SCENE_DURATION = 5; // detik per scene

export const timelineConfig = {
  fps: 60,
  sceneDuration: SCENE_DURATION,
  totalScenes: 6,
  totalDuration: 6 * SCENE_DURATION,
  transition: {
    type: 'fade',
    duration: 0.5, // detik
  },
};

export function getSceneAtTime(time) {
  const sceneIndex = Math.floor(time / SCENE_DURATION);
  const sceneId = Math.min(sceneIndex + 1, timelineConfig.totalScenes);
  const progressInScene = (time % SCENE_DURATION) / SCENE_DURATION;
  return {
    sceneId,
    progressInScene,
    isLast: sceneId === timelineConfig.totalScenes,
  };
}

export function getTotalDuration() {
  return timelineConfig.totalDuration;
}