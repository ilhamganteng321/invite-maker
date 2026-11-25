import { useState, useEffect, useRef, useCallback } from 'react';
import CanvasRenderer from '../components/ui/CanvasRenderer';
import ExportStatus from '../components/ui/ExportStatus';
import { getTotalDuration, SCENE_DURATION, getSceneAtTime } from '../data/timeline';

const PREVIEW_WIDTH = 400;
const PREVIEW_HEIGHT = 711;

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

  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const pauseTimeRef = useRef(0);

  const totalDuration = getTotalDuration();

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

  useEffect(() => {
    if (!isPlaying) return;
    const now = performance.now();
    if (!startTimeRef.current) {
      startTimeRef.current = now - pauseTimeRef.current;
    }
    const elapsed = (now - startTimeRef.current) / 1000;
    const t = elapsed % totalDuration;
    setCurrentTime(t);
    const { sceneId } = getSceneAtTime(t);
    setActiveScene(sceneId);
    if (elapsed >= totalDuration) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
    const loop = () => {
      if (!isPlaying) return;
      const now2 = performance.now();
      const elapsed2 = (now2 - startTimeRef.current) / 1000;
      const t2 = elapsed2 % totalDuration;
      setCurrentTime(t2);
      const { sceneId: sid2 } = getSceneAtTime(t2);
      setActiveScene(sid2);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startTimeRef.current = null;
    };
  }, [isPlaying, currentTime, totalDuration]);

  const handleExport = async () => {
    if (!canvasRef.current) return;
    setExportStatus('preparing');
    setExportProgress(0);
    try {
      if (!MediaRecorder.isTypeSupported('video/webm')) {
        setExportStatus('error');
        return;
      }
      const canvas = canvasRef.current;
      const stream = canvas.captureStream(60);
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8',
        videoBitsPerSecond: 2500000,
      });
      const chunks = [];
      setExportStatus('recording');
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setExportStatus('done');
        setExportProgress(100);
      };
      recorder.onerror = () => {
        setExportStatus('error');
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

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <header className='bg-white border-b px-6 py-4 flex justify-between items-center'>
        <div>
          <h1 className='text-xl font-bold text-gray-900'>Studio Video</h1>
          <p className='text-sm text-gray-500'>Preview 6 scene &amp; ekspor video</p>
        </div>
        <div className='flex gap-2'>
          <button onClick={togglePlay} className='px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50' disabled={exportStatus !== 'idle'}>
            {isPlaying ? 'Jeda' : 'Putar'}
          </button>
          <button onClick={restart} className='px-4 py-2 bg-gray-200 text-gray-900 rounded-md text-sm font-medium hover:bg-gray-300 disabled:opacity-50' disabled={exportStatus !== 'idle'}>
            Ulang
          </button>
          <button onClick={handleExport} className='px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700' disabled={exportStatus !== 'idle'}>
            {exportStatus === 'done' ? 'Selesai' : exportStatus === 'recording' || exportStatus === 'encoding' ? 'Mengekspor...' : 'Ekspor Video'}
          </button>
        </div>
      </header>

