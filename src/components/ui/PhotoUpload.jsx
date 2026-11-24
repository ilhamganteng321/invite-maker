import { useState, useRef } from 'react';

export default function PhotoUpload({ value, onChange, accept = 'image/*', maxSizeMB = 5 }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError(null);
      setPreview(null);
      onChange(null);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar.');
      onChange(null);
      return;
    }

    // Validate file size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`Ukuran file maksimal ${maxSizeMB} MB.`);
      onChange(null);
      return;
    }

    setError(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPreview(null);
    setError(null);
    onChange(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Foto Mempelai
      </label>

      <div
        className="aspect-square w-full rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {preview ? (
          <>
            <img src={preview} alt="Preview foto" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              aria-label="Hapus foto"
            >
              <span className="text-sm font-bold">×</span>
            </button>
          </>
        ) : (
          <>
            <svg
              className="w-8 h-8 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-gray-500">Klik untuk memilih foto</p>
            <p className="text-xs text-gray-400">Maksimal {maxSizeMB} MB, format JPG/PNG/WebP</p>
          </>
        )}
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}