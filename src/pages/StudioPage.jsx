import { useState, useEffect, useRef, useCallback } from 'react';
import CanvasRenderer from '../components/ui/CanvasRenderer';
import ExportStatus from '../components/ui/ExportStatus';
import { getTotalDuration, SCENE_DURATION, getSceneAtTime } from '../data/timeline';
import { waitForFonts } from '../data/fontLoader';
import { checkMediaRecorderSupport, getBrowserInfo } from '../data/browserCompat';

const PREVIEW_WIDTH = 400;
const PREVIEW_HEIGHT = 711;

const EXPORT_RESOLUTIONS = [
  { label: '720p (1280×1920)', width: 1280, height: 1920, bitrate: 2500000 },
  { label: '1080p (1080×1920)', width: 1080, height: 1920, bitrate: 4000000 },
];

const sceneTitles = [
  'Pembuka',
  'Sambutan Orang Tua',
  'Akad Nikah',
  'Resepsi',
  'Doa',
  'Penutup',
];

export default function StudioPage({ initialData }) {
  const [data, setData] = useState(initialData || {});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeScene, setActiveScene] = useState(1);
  const [exportStatus, setExportStatus] = useState('idle');
  const [exportProgress, setExportProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [browserInfo, setBrowserInfo] = useState(null);
  const [mediaSupport, setMediaSupport] = useState(null);
  const [exportResolution, setExportResolution] = useState(EXPORT_RESOLUTIONS[0]);
  const [fontsReady, setFontsReady] = useState(false);
  const [exportError, setExportError] = useState(null);

  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const pauseTimeRef = useRef(0);
  const objectUrlsRef = useRef([]);

  const totalDuration = getTotalDuration();

  useEffect(() => {
    setBrowserInfo(getBrowserInfo());
    setMediaSupport(checkMediaRecorderSupport());

    waitForFonts(5000).then(() => {
      setFontsReady(true);
    });
  }, []);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const restart = useCallback(() => {
    setCurrentTime(0);
    setActiveScene(1);
    setIsPlaying(false);
    startTimeRef.current = null;
    pauseTimeRef.current = 0;
  }, []);

  const selectScene = useCallback((id) => {
    setActiveScene(id);
    setCurrentTime((id - 1) * SCENE_DURATION);
    setIsPlaying(false);
    pauseTimeRef.current = (id - 1) * SCENE_DURATION * 1000;
    startTimeRef.current = null;
  }, []);

  const handleExport = async () => {
    if (!canvasRef.current) return;
    if (!mediaSupport?.supported) {
      setExportStatus('error');
      setExportError('Browser tidak mendukung MediaRecorder.');
      return;
    }
    if (!fontsReady) {
      setExportStatus('error');
      setExportError('Font belum siap. Silakan tunggu sebentar.');
      return;
    }

    setExportStatus('preparing');
    setExportProgress(0);
    setExportError(null);

    try {
      const canvas = canvasRef.current;
      const { width, height, bitrate } = exportResolution;

      canvas.width = width;
      canvas.height = height;

      const stream = canvas.captureStream(60);
      const recorder = new MediaRecorder(stream, {
        mimeType: mediaSupport.mimeType,
        videoBitsPerSecond: bitrate,
      });

      const chunks = [];

      setExportStatus('recording');

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        objectUrlsRef.current.push(url);
        setDownloadUrl(url);
        setExportStatus('done');
        setExportProgress(100);

        canvas.width = PREVIEW_WIDTH;
        canvas.height = PREVIEW_HEIGHT;
      };

      recorder.onerror = () => {
        setExportStatus('error');
        setExportError('Gagal merekam video.');
        canvas.width = PREVIEW_WIDTH;
        canvas.height = PREVIEW_HEIGHT;
      };

      const ctx = canvas.getContext('2d');
      const totalMs = totalDuration * 1000;
      const frameInterval = 1000 / 60;

      recorder.start();

      let frameTime = 0;
      const recordInterval = setInterval(() => {
        const t = (frameTime / 1000) % totalDuration;
        const { sceneId } = getSceneAtTime(t);
        setActiveScene(sceneId);
        setExportProgress((frameTime / totalMs) * 100);
        frameTime += frameInterval;

        if (frameTime >= totalMs) {
          clearInterval(recordInterval);
          recorder.stop();
          setExportStatus('encoding');
        }
      }, frameInterval);

      await new Promise((resolve) => {
        recorder.onstop = () => resolve();
      });
    } catch (err) {
      console.error('Export error:', err);
      setExportStatus('error');
      setExportError(err.message || 'Terjadi kesalahan saat mengekspor.');
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = PREVIEW_WIDTH;
        canvas.height = PREVIEW_HEIGHT;
      }
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'undangan-video.webm';
      a.click();
    }
  };

  const canExport = fontsReady && mediaSupport?.supported && exportStatus === 'idle';

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <header className='bg-white border-b px-6 py-4 flex justify-between items-center'>
        <div>
          <h1 className='text-xl font-bold text-gray-900'>Studio Video</h1>
          <p className='text-sm text-gray-500'>Preview 6 scene &amp; ekspor video</p>
        </div>
        <div className='flex flex-col sm:flex-row gap-2 items-end sm:items-center'>
          <div className='flex gap-2'>
            <button onClick={togglePlay} className='px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50' disabled={exportStatus !== 'idle'}>
              {isPlaying ? 'Jeda' : 'Putar'}
            </button>
            <button onClick={restart} className='px-4 py-2 bg-gray-200 text-gray-900 rounded-md text-sm font-medium hover:bg-gray-300 disabled:opacity-50' disabled={exportStatus !== 'idle'}>
              Ulang
            </button>
            <button onClick={handleExport} className='px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700' disabled={!canExport || exportStatus !== 'idle'} aria-disabled={!canExport}>
              {exportStatus === 'done' ? 'Selesai' : exportStatus === 'recording' || exportStatus === 'encoding' ? 'Mengekspor...' : 'Ekspor Video'}
            </button>
          </div>
          {!mediaSupport?.supported && (
            <span className='text-xs text-red-600 bg-red-50 px-2 py-1 rounded'>
              {mediaSupport.error || 'Browser tidak didukung'}
            </span>
          )}
          {!fontsReady && mediaSupport?.supported && (
            <span className='text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded animate-pulse'>
              Memuat font...
            </span>
          )}
        </div>
      </header>

      <div className='flex-1 overflow-hidden flex'>
        <div className='flex-1 relative bg-white overflow-hidden'>
          <div className='absolute inset-0 flex items-center justify-center bg-gray-100 p-4 sm:p-6'>
            <div className='relative w-[400px] aspect-[9 / 16] bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-300 sm:w-[540px] sm:h-[960px]'>
              <CanvasRenderer data={data} width={400} height={711} />
              <div className='absolute bottom-4 left-4 text-white text-sm font-mono bg-black/60 px-2 py-1 rounded sm:bottom-6 sm:left-6 sm:text-base'>
                {currentTime.toFixed(1)}s / {totalDuration}s
              </div>
            </div>
          </div>
          <div className='absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-white/90 backdrop-blur border-t flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-4'>
              <span className='text-xs font-medium text-gray-500 uppercase tracking-wider'>Scene</span>
              <div className='flex gap-2' role='tablist'>
                {[1, 2, 3, 4, 5, 6].map((id) => (
                  <button key={id} onClick={() => selectScene(id)} role='tab' aria-selected={activeScene === id} className={getBtnClass(id)}>
                    {id}
                  </button>
                ))}
              </div>
            </div>
            <div className='flex items-center gap-4 sm:flex-1 sm:justify-end'>
              <div className='flex items-center gap-2'>
                <label className='text-xs text-gray-600'>Resolusi:</label>
                <select
                  value={exportResolution.label}
                  onChange={(e) => {
                    const res = EXPORT_RESOLUTIONS.find((r) => r.label === e.target.value);
                    if (res) setExportResolution(res);
                  }}
                  className='text-xs border border-gray-300 rounded px-2 py-1 bg-white'
                  disabled={exportStatus !== 'idle'}
                >
                  {EXPORT_RESOLUTIONS.map((r) => (
                    <option key={r.label} value={r.label}>{r.label}</option>
                  ))}
                </select>
              </div>
              <div className='w-full sm:w-64 h-1 bg-gray-200 rounded-full overflow-hidden sm:mx-4'>
                <div className={getProgressBarClass(isPlaying)} style={getProgressStyle()} />
              </div>
              {exportStatus !== 'idle' && exportStatus !== 'done' && (
                <div className='text-xs text-gray-600'>
                  {exportProgress.toFixed(0)}%
                </div>
              )}
            </div>
            {exportError && (
              <button onClick={() => setExportStatus('idle')} className='text-xs text-red-600 hover:underline'>
                Tutup pesan error
              </button>
            )}
          </div>
          {exportError && (
            <div className='mt-2 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700'>
              {exportError}
            </div>
          )}
        </div>

        <div className='w-72 bg-white border-r p-4 overflow-y-auto hidden sm:block'>
          <h2 className='text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider'>Timeline Scene</h2>
          <div className='space-y-3'>
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <button key={id} onClick={() => selectScene(id)} className={getItemClass(id)}>
                <div className={getNumClass(id)}>{id}</div>
                <div>
                  <div className='text-sm font-medium text-gray-900'>{sceneTitles[id - 1]}</div>
                  <div className='text-xs text-gray-500'>Scene {id} / 6</div>
                </div>
              </button>
            ))}
          </div>
          <div className='mt-6 pt-4 border-t border-gray-200'>
            <p className='text-xs text-gray-500'>Setiap scene berdurasi {SCENE_DURATION} detik. Total: {totalDuration} detik.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getBtnClass(id) {
  return 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ' + (activeScene === id ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200');
}

function getProgressBarClass(isPlaying) {
  return 'h-full bg-indigo-600 transition-all duration-100 ' + (isPlaying ? 'animate-pulse' : '');
}

function getProgressStyle() {
  return { width: ((currentTime / totalDuration) * 100) + '%' };
}

function getItemClass(id) {
  return 'flex items-center gap-3 p-3 rounded-lg text-left transition-all ' + (activeScene === id ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50 border border-gray-200 hover:bg-gray-100');
}

function getNumClass(id) {
  return 'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ' + (activeScene === id ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600');
}

export { EXPORT_RESOLUTIONS };

