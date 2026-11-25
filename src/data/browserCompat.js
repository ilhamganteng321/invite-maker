/**
 * Check MediaRecorder MIME type support and return the best available option.
 * Returns { supported: boolean, mimeType: string | null, error: string | null }
 */
export function checkMediaRecorderSupport() {
  if (!window.MediaRecorder) {
    return {
      supported: false,
      mimeType: null,
      error: 'Browser tidak mendukung MediaRecorder. Gunakan Chrome atau Edge terbaru.',
    };
  }

  const mimeTypes = [
    'video/webm;codecs=vp8',
    'video/webm;codecs=vp9',
    'video/webm',
    'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
    'video/mp4',
  ];

  for (const mimeType of mimeTypes) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return { supported: true, mimeType, error: null };
    }
  }

  return {
    supported: false,
    mimeType: null,
    error: 'Browser tidak mendukung format video yang diperlukan untuk ekspor.',
  };
}

/**
 * Check if canvas.captureStream is supported.
 */
export function checkCanvasCaptureSupport() {
  const canvas = document.createElement('canvas');
  return typeof canvas.captureStream === 'function';
}

/**
 * Get browser name and version for compatibility logging.
 */
export function getBrowserInfo() {
  const ua = navigator.userAgent;
  let name = 'Unknown';
  let version = 'Unknown';

  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    name = 'Chrome';
    const match = ua.match(/Chrome\/(\d+)/);
    version = match ? match[1] : 'Unknown';
  } else if (ua.includes('Edg')) {
    name = 'Edge';
    const match = ua.match(/Edg\/(\d+)/);
    version = match ? match[1] : 'Unknown';
  } else if (ua.includes('Firefox')) {
    name = 'Firefox';
    const match = ua.match(/Firefox\/(\d+)/);
    version = match ? match[1] : 'Unknown';
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    name = 'Safari';
    const match = ua.match(/Version\/(\d+)/);
    version = match ? match[1] : 'Unknown';
  }

  return { name, version, isChromeOrEdge: name === 'Chrome' || name === 'Edge' };
}