import { useState, useEffect, useRef } from 'react';
import { scenes, getSceneComponent } from '../scenes/sceneList';

const ASPECT_RATIO = '9 / 16';
const PREVIEW_WIDTH = 400;
const SCENE_DURATION = 5;

export default function StudioPage({ initialData }) {
  const [data, setData] = useState(initialData || {});
  const [activeScene, setActiveScene] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration] = useState(scenes.length * SCENE_DURATION);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const rafRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) return;
    const sceneIndex = Math.floor(currentTime / SCENE_DURATION);
    const sceneId = sceneIndex + 1;
    if (sceneId <= scenes.length && sceneId !== activeScene) {
      setActiveScene(sceneId);
    }
    if (currentTime >= totalDuration) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
    rafRef.current = requestAnimationFrame(() => {
      setCurrentTime((t) => t + 0.016);
    });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, currentTime, activeScene, totalDuration]);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const restart = () => {
    setCurrentTime(0);
    setActiveScene(1);
    setIsPlaying(false);
  };
  const selectScene = (id) => {
    setActiveScene(id);
    setCurrentTime((id - 1) * SCENE_DURATION);
    setIsPlaying(false);
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    for (let i = 0; i <= scenes.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setExportProgress((i / scenes.length) * 100);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'undangan-video-maker.json';
    a.click();
    URL.revokeObjectURL(url);
    setIsExporting(false);
    setExportProgress(0);
  };

  const SceneComponent = getSceneComponent(activeScene);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Studio Video</h1>
          <p className="text-sm text-gray-500">Preview 6 scene &amp; ekspor video</p>
        </div>
        <div className="flex gap-2">
          <button onClick={togglePlay} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50" disabled={isExporting}>
            {isPlaying ? 'Jeda' : 'Putar'}
          </button>
          <button onClick={restart} className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md text-sm font-medium hover:bg-gray-300 disabled:opacity-50" disabled={isExporting}>
            Ulang
          </button>
          <button onClick={handleExport} className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 disabled:opacity-50" disabled={isExporting}>
            {isExporting ? 'Mengekspor...' : 'Ekspor Video'}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex">
        <div className="flex-1 relative bg-white overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 p-4">
            <div className={`relative w-[${PREVIEW_WIDTH}px] aspect-[${ASPECT_RATIO}] bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-300`}>
              {SceneComponent ? (
                <SceneComponent data={data} className="w-full h-full" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  Scene {activeScene} belum tersedia
                </div>
              )}
              <div className="absolute bottom-4 left-4 text-white text-sm font-mono bg-black/60 px-2 py-1 rounded">
                {currentTime.toFixed(1)}s / {totalDuration}s
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur border-t flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Scene</span>
              <div className="flex gap-2" role="tablist">
                {scenes.map((scene) => (
                  <button key={scene.id} onClick={() => selectScene(scene.id)} role="tab" aria-selected={activeScene === scene.id} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${activeScene === scene.id ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {scene.id}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full bg-indigo-600 transition-all duration-100 ${isPlaying ? 'animate-pulse' : ''}`} style={{ width: `${(currentTime / totalDuration) * 100}%` }} />
            </div>
            {isExporting && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs"><span className="text-gray-600">Proses ekspor</span><span className="font-medium">{exportProgress.toFixed(0)}%</span></div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${exportProgress}%` }} /></div>
              </div>
            )}
          </div>
        </div>

        <div className="w-72 bg-white border-r p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Timeline Scene</h2>
          <div className="space-y-3">
            {scenes.map((scene) => (
              <button key={scene.id} onClick={() => selectScene(scene.id)} className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all ${activeScene === scene.id ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activeScene === scene.id ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>{scene.id}</div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{scene.title}</div>
                  <div className="text-xs text-gray-500">Scene {scene.id} / 6</div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">Setiap scene berdurasi {SCENE_DURATION} detik. Total: {totalDuration} detik.</p>
          </div>
        </div>
      </div>
    </div>
  );
}