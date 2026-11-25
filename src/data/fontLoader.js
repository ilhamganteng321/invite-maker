/**
 * Wait for all fonts to load before rendering.
 * Returns a Promise that resolves when fonts are ready, or after a timeout.
 */
export async function waitForFonts(timeoutMs = 5000) {
  if (!document.fonts) {
    // document.fonts not available (older browsers), proceed immediately
    return;
  }

  try {
    await Promise.race([
      document.fonts.ready,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Font loading timeout')), timeoutMs)
      ),
    ]);
  } catch (e) {
    // Font loading failed or timed out — proceed anyway, rendering will use fallback fonts
    console.warn('Font loading warning:', e.message);
  }
}

/**
 * Check if a specific font family is available.
 */
export function isFontAvailable(fontFamily) {
  if (!document.fonts) return false;
  return document.fonts.check(`1em "${fontFamily}"`);
}