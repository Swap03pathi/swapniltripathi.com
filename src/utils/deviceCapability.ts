/**
 * Heuristic for whether a device can comfortably run the Stellarium WASM/WebGL
 * sky engine (a ~1.2MB download plus tiles and continuous WebGL rendering).
 *
 * Used by the background's "smart hybrid" mode: desktop always tries the engine,
 * while mobile only loads it on capable devices and otherwise falls back to the
 * lightweight 2D StarField. Conservative by design — when a signal is missing we
 * lean toward "capable" only if nothing disqualifies the device.
 */
export function isHighEndDevice(): boolean {
  if (typeof navigator === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { effectiveType?: string; saveData?: boolean };
  };

  // Respect an explicit data-saver preference — skip the multi-MB download.
  if (nav.connection?.saveData) return false;

  // Slow networks: not worth the WASM + tile payload.
  const effectiveType = nav.connection?.effectiveType;
  if (effectiveType && /(slow-2g|2g|3g)/.test(effectiveType)) return false;

  // Low device memory (exposed by Chrome/Android; absent on iOS, which we allow).
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4) return false;

  // Few CPU cores → likely a low-end phone.
  if (
    typeof navigator.hardwareConcurrency === 'number' &&
    navigator.hardwareConcurrency < 4
  ) {
    return false;
  }

  // Hard requirement: a working WebGL context.
  return hasWebGL();
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}
