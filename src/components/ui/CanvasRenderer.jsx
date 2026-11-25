import { useRef, useEffect, useState, useCallback } from 'react';
import { getSceneAtTime, getTotalDuration, SCENE_DURATION } from '../data/timeline';

export default function CanvasRenderer({ data, width = 400, height = 711 }) {
  const canvasRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sceneId, setSceneId] = useState(1);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const pauseTimeRef = useRef(0);

  const totalDuration = getTotalDuration();

  const drawScene1 = useCallback((ctx, cx, topY, d) => {
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 34px serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${d.namaPria || 'Pria'} & ${d.namaWanita || 'Wanita'}`, cx, topY + 20);

    ctx.fillStyle = '#6b7280';
    ctx.font = '20px sans-serif';
    ctx.fillText(d.tanggalNikah || 'Tanggal pernikahan', cx, topY + 55);

    if (d.foto) {
      const img = new Image();
      img.src = URL.createObjectURL(d.foto);
      img.onload = () => {
        const size = 140;
        const x = cx - size / 2;
        const y = topY + 80;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, y + size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, x, y, size, size);
        ctx.restore();
      };
    }
  }, []);

  const drawScene2 = useCallback((ctx, cx, topY, d) => {
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 28px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Sambutan Orang Tua', cx, topY);

    ctx.fillStyle = '#6b7280';
    ctx.font = '18px sans-serif';
    ctx.textAlign = 'left';
    const lines = [
      `Ayah Pria: ${d.ayahPria || '-'}`,
      `Ibu Pria: ${d.ibuPria || '-'}`,
      `Ayah Wanita: ${d.ayahWanita || '-'}`,
      `Ibu Wanita: ${d.ibuWanita || '-'}`,
    ];
    lines.forEach((line, i) => {
      ctx.fillText(line, width * 0.15, topY + 40 + i * 30);
    });

    ctx.fillStyle = '#4b5563';
    ctx.font = 'italic 18px serif';
    ctx.textAlign = 'center';
    ctx.fillText(`"${d.kataSambutan || '-}"`, cx, topY + 180);
  }, [width]);

  const drawScene4 = useCallback((ctx, cx, topY, d) => {
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 28px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Resepsi', cx, topY);

    const details = [
      ['Tanggal', d.tanggalResepsi || '-'],
      ['Waktu', d.waktuResepsi || '-'],
      ['Lokasi', d.lokasiResepsi || '-'],
    ];
    details.forEach(([label, value], i) => {
      ctx.fillStyle = '#6b7280';
      ctx.font = '18px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(label, width * 0.15, topY + 40 + i * 35);
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(value, width * 0.45, topY + 40 + i * 35);
    });
  }, [width]);

  const drawScene5 = useCallback((ctx, cx, topY, width) => {
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px serif';
    ctx.textAlign = 'center';
    ctx.fillText('QS. Ar-Rum Ayat 21', cx, topY);

    ctx.fillStyle = '#6b7280';
    ctx.font = 'italic 16px serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      'Dan di antara tanda-tanda kebesaran-Nya adalah Dia menciptakan pasangan untuk kamu...',
      cx,
      topY + 60,
      width * 0.85,
    );

    ctx.fillStyle = '#4b5563';
    ctx.font = '14px sans-serif';
    ctx.fillText('Tentang pernikahan dan kesejataran jiwa', cx, topY + 130);
  }, []);

  const drawScene6 = useCallback((ctx, cx, topY, d) => {
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 34px serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${d.namaPria || 'Pria'} & ${d.namaWanita || 'Wanita'}`, cx, topY + 20);

    ctx.fillStyle = '#6b7280';
    ctx.font = '20px sans-serif';
    ctx.fillText(d.tanggalNikah || 'Tanggal pernikahan', cx, topY + 55);

    ctx.fillStyle = '#4f46e5';
    ctx.font = 'bold 20px serif';
    ctx.fillText('Made with love', cx, topY + 110);
  }, []);

  const drawFrame = useCallback(
    (ctx, time) => {
      const { sceneId: sid } = getSceneAtTime(time);
      setSceneId(sid);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#fdfaf5';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const topY = height * 0.15;

      if (sid === 1) drawScene1(ctx, cx, topY, data);
      else if (sid === 2) drawScene2(ctx, cx, topY, data);
      else if (sid === 3) drawScene3(ctx, cx, topY, data);
      else if (sid === 4) drawScene4(ctx, cx, topY, data);
      else if (sid === 5) drawScene5(ctx, cx, topY, width);
      else if (sid === 6) drawScene6(ctx, cx, topY, data);
    },
    [data, width, drawScene1, drawScene2, drawScene3, drawScene4, drawScene5, drawScene6],
  );

  useEffect(() => {
    if (!isPlaying) return;

    const now = performance.now();
    if (!startTimeRef.current) {
      startTimeRef.current = now - pauseTimeRef.current;
    }

    const elapsed = (now - startTimeRef.current) / 1000;
    const t = elapsed % totalDuration;
    setCurrentTime(t);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      drawFrame(ctx, t);
    }

    const loop = () => {
      if (!isPlaying) return;
      const now2 = performance.now();
      const elapsed2 = (now2 - startTimeRef.current) / 1000;
      const t2 = elapsed2 % totalDuration;
      setCurrentTime(t2);

      const canvas2 = canvasRef.current;
      if (canvas2) {
        const ctx2 = canvas2.getContext('2d');
        drawFrame(ctx2, t2);
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startTimeRef.current = null;
    };
  }, [isPlaying, drawFrame, totalDuration]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      drawFrame(ctx, 0);
    }
  }, [data, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="bg-black rounded-xl shadow-2xl border border-gray-300"
    />
  );
}