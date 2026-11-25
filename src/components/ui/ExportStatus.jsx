export default function ExportStatus({
  status,
  progress,
  onCancel,
  onDownload,
  downloadUrl,
}) {
  const statusConfig = {
    idle: { label: 'Siap mengekspor', color: 'text-gray-600', bg: 'bg-gray-50' },
    preparing: { label: 'Menyiapkan renderer...', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    recording: { label: 'Merekam video...', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    encoding: { label: 'Mengkodekan video...', color: 'text-amber-600', bg: 'bg-amber-50' },
    done: { label: 'Ekspor selesai', color: 'text-emerald-700', bg: 'bg-emerald-100' },
    error: { label: 'Terjadi kesalahan', color: 'text-red-700', bg: 'bg-red-50' },
  };

  const cfg = statusConfig[status] || statusConfig.idle;

  return (
    <div className={`p-4 rounded-lg border ${cfg.bg} animate-${status === 'recording' ? 'pulse' : 'none'}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`font-medium ${cfg.color}`}>{cfg.label}</span>
        {status === 'error' && (
          <button
            onClick={onCancel}
            className="ml-auto text-xs text-red-600 hover:underline"
          >
            Batal
          </button>
        )}
      </div>
      {status !== 'idle' && status !== 'done' && status !== 'error' && (
        <>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                status === 'recording' ? 'bg-emerald-500' : 'bg-indigo-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500">{progress.toFixed(0)}%</div>
        </>
      )}
      {status === 'done' && downloadUrl && (
        <button
          onClick={onDownload}
          className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 flex items-center gap-2"
        >
          <span>⬇</span> Unduh Video
        </button>
      )}
      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600">
          Gagal mengekspor video. Pastikan browser mendukung MediaRecorder dan coba lagi.
        </p>
      )}
    </div>
  );
}