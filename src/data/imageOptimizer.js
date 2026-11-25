const MAX_WIDTH = 1080;
const MAX_HEIGHT = 1920;
const MAX_FILE_SIZE_MB = 5;
const JPEG_QUALITY = 0.85;

/**
 * Resize and compress an image file to a Blob.
 * Returns a Promise that resolves to a File object.
 */
export function optimizeImage(file, maxWidth = MAX_WIDTH, maxHeight = MAX_HEIGHT, quality = JPEG_QUALITY) {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('File harus berupa gambar.'));
      return;
    }

    // Validate file size
    const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      reject(new Error(`Ukuran file maksimal ${MAX_FILE_SIZE_MB} MB.`));
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Calculate new dimensions maintaining aspect ratio
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Determine output format
      const isJpeg = file.type === 'image/jpeg' || file.type === 'image/jpg';
      const mimeType = isJpeg ? 'image/jpeg' : 'image/png';

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Gagal memproses gambar.'));
            return;
          }

          const optimizedFile = new File([blob], file.name, {
            type: mimeType,
            lastModified: Date.now(),
          });
          resolve(optimizedFile);
        },
        mimeType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Gagal memuat gambar.'));
    };

    img.src = url;
  });
}

/**
 * Create a downscaled preview version of an image for display.
 * Returns a Promise that resolves to a data URL.
 */
export function createPreview(file, maxWidth = 400) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;
      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height *= ratio;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Gagal membuat preview.'));
          return;
        }
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg', 0.7);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Gagal memuat gambar untuk preview.'));
    };

    img.src = url;
  });
}

/**
 * Revoke all object URLs in a list to free memory.
 */
export function revokeObjectUrls(urls) {
  urls.forEach((url) => {
    if (url && url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  });
}