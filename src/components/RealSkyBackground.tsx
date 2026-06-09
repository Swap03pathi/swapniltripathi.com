import { useEffect, useRef, useCallback, useState } from 'react';
import { getStellariumSkyDataPrefixes } from '../config/stellariumSkyData';

/** Script tag id — avoids injecting duplicate loaders on StrictMode remount */
const SCRIPT_ID = 'stellarium-web-engine-script';

/**
 * Paths under `/public/stellarium/` → served as `${BASE_URL}stellarium/...`.
 * WASM + JS come from upstream `make js` build output (`build/` in the repo).
 * Static fonts/images are bundled from `apps/simple-html/static/` (committed in this repo).
 */
function stellariumPaths() {
  const root = `${import.meta.env.BASE_URL.replace(/\/?$/, '')}/stellarium`;
  return {
    root,
    js: `${root}/stellarium-web-engine.js`,
    wasm: `${root}/stellarium-web-engine.wasm`,
    /** Fonts + assets copied directly under `public/stellarium/` (fonts/imgs/js). */
    staticPrefix: `${root}/`,
  };
}

declare global {
  interface Window {
    /** Official Stellarium Web Engine API (upstream `apps/simple-html/stellarium-web-engine.html`). */
    StelWebEngine?: (
      opts: Record<string, unknown>
    ) => { destroy?: () => void } | void;
    /** Some docs/samples use this alias; stock builds use `StelWebEngine`. */
    StellariumWebEngine?: (
      opts: Record<string, unknown>
    ) => { destroy?: () => void } | void;
  }
}

/** Use engine `setValue` when present so WASM-backed props actually stick. */
function setCoreValue(
  stel: Record<string, unknown>,
  path: string,
  value: unknown
) {
  const sv = stel.setValue as
    | ((p: string, v: unknown) => void)
    | undefined;
  try {
    if (sv) sv(path, value);
  } catch {
    /* ignore missing paths */
  }
}

/**
 * Engine paths we force to `false` to keep the ambient sky uncluttered: atmosphere,
 * ground/landscape, grids, constellation art, and every layer's floating labels/names.
 * `stars.hints_visible` covers bright-star proper names (Alioth, Dubhe) drawn separately.
 */
const QUIET_SKY_PATHS = [
  'atmosphere.visible',
  'landscapes.visible',
  'labels.visible',
  'names.visible',
  'lines.azimuthal.visible',
  'lines.equatorial.visible',
  'constellations.lines_visible',
  'constellations.images_visible',
  'stars.labels_visible',
  'stars.names_visible',
  'stars.hints_visible',
  'planets.labels_visible',
  'planets.names_visible',
  'dsos.labels_visible',
  'dsos.names_visible',
  'satellites.labels_visible',
  'satellites.names_visible',
  'minor_planets.labels_visible',
  'minor_planets.names_visible',
  'comets.labels_visible',
  'comets.names_visible',
  'skycultures.labels_visible',
  'skycultures.names_visible',
] as const;

/** Walk a dotted path on an object and assign the final key, ignoring missing intermediates. */
function setNestedValue(root: unknown, path: string, value: unknown) {
  const keys = path.split('.');
  let node = root as Record<string, unknown> | undefined;
  for (let i = 0; i < keys.length - 1; i += 1) {
    if (!node || typeof node !== 'object') return;
    node = node[keys[i]] as Record<string, unknown> | undefined;
  }
  if (node && typeof node === 'object') node[keys[keys.length - 1]] = value;
}

/** Hide atmosphere, ground-ish layers, grids, constellation art, and floating labels/names on bodies. */
function applyQuietSkyUi(stel: Record<string, unknown>) {
  try {
    for (const path of QUIET_SKY_PATHS) {
      /** `setValue` makes WASM-backed props stick; the direct write covers plain JS mirrors. */
      setCoreValue(stel, path, false);
      setNestedValue(stel.core, path, false);
    }
  } catch {
    /* optional */
  }
}

/**
 * Stellarium `designations()` returns several names for an object, e.g.
 * `["NAME Vega", "* alf Lyr", "HIP 91262", "HD 172167"]`. The engine draws the
 * friendly proper name (here "Vega") next to the body, but the first array entry
 * is often a terse catalog code — so showing `[0]` made the bottom label disagree
 * with what's on screen. Prefer the `NAME …` proper name and strip catalog prefixes
 * (Bayer/variable/cluster markers) so the label matches the on-screen text.
 */
function cleanDesignation(raw: string): string {
  return raw
    .replace(/^NAME\s+/i, '')
    .replace(/^(V\*|\*\*|Cl\*|\*)\s+/i, '')
    .trim();
}

function bestDesignation(designations: string[]): string | null {
  const cleaned = designations.map(cleanDesignation).filter(Boolean);
  if (!cleaned.length) return null;
  /** A `NAME …` entry is the human-readable proper name the engine labels with. */
  const proper = designations.find((d) => /^NAME\s+/i.test(d));
  if (proper) return cleanDesignation(proper);
  return cleaned[0];
}

function designationFromSelection(sel: unknown): string | null {
  if (!sel || typeof sel !== 'object') return null;
  const o = sel as {
    designations?: () => string[];
    id?: string;
  };
  if (typeof o.designations === 'function') {
    const ds = o.designations();
    if (Array.isArray(ds) && ds.length) return bestDesignation(ds.filter(Boolean));
  }
  if (typeof o.id === 'string' && o.id) return o.id;
  return null;
}

/** Mirrors upstream Vue demo data wiring; each prefix is attempted until one resolves. */
function wireSkyData(stel: Record<string, unknown>, prefixes: string[]) {
  const core = stel.core as {
    stars?: {
      addDataSource: (o: { url: string }) => void;
    };
    skycultures?: {
      addDataSource: (o: { url: string; key: string }) => void;
    };
    dsos?: { addDataSource: (o: { url: string }) => void };
    landscapes?: {
      addDataSource: (o: { url: string; key: string }) => void;
    };
    milkyway?: { addDataSource: (o: { url: string }) => void };
    minor_planets?: {
      addDataSource: (o: { url: string; key: string }) => void;
    };
    planets?: {
      addDataSource: (o: { url: string; key: string }) => void;
    };
    comets?: { addDataSource: (o: { url: string; key: string }) => void };
    satellites?: { addDataSource: (o: { url: string; key: string }) => void };
  };

  if (!prefixes.length) return;

  for (const base of prefixes) {
    try {
      core.stars?.addDataSource({ url: `${base}stars` });
      core.skycultures?.addDataSource({
        url: `${base}skycultures/western`,
        key: 'western',
      });
      core.dsos?.addDataSource({ url: `${base}dso` });
      core.landscapes?.addDataSource({
        url: `${base}landscapes/guereins`,
        key: 'guereins',
      });
      core.milkyway?.addDataSource({
        url: `${base}surveys/milkyway`,
      });
      core.minor_planets?.addDataSource({
        url: `${base}mpcorb.dat`,
        key: 'mpc_asteroids',
      });
      core.planets?.addDataSource({
        url: `${base}surveys/sso/moon`,
        key: 'moon',
      });
      core.planets?.addDataSource({
        url: `${base}surveys/sso/sun`,
        key: 'sun',
      });
      core.planets?.addDataSource({
        url: `${base}surveys/sso/moon`,
        key: 'default',
      });
      core.comets?.addDataSource({
        url: `${base}CometEls.txt`,
        key: 'mpc_comets',
      });
      core.satellites?.addDataSource({
        url: `${base}tle_satellite.jsonl.gz`,
        key: 'jsonl/sat',
      });
      return;
    } catch {
      /* try next prefix */
    }
  }
}

interface RealSkyBackgroundProps {
  /** Fires when WASM + loader determine success (true) or any terminal failure (false). */
  onEngineReady?: (ok: boolean) => void;
  /** When true, full-screen overlay captures taps and forwards picks to Stellarium (content is normally above z-0). */
  identifyMode?: boolean;
}

type StellariumModule = Record<string, unknown> & {
  core?: Record<string, unknown>;
  observer?: Record<string, unknown>;
  canvas?: HTMLCanvasElement;
  setValue?: (path: string, value: unknown) => void;
  change?: (cb: (...args: unknown[]) => void) => void;
  on?: (
    ev: string,
    cb: (e: { point: { x: number; y: number } }) => void
  ) => void;
  date2MJD?: (t: number) => number;
  setFont?: (font: string, url: string) => Promise<void>;
  D2R?: number;
  _core_on_mouse?: (
    pad: number,
    action: number,
    x: number,
    y: number,
    buttons: number
  ) => void;
};

export default function RealSkyBackground({
  onEngineReady,
  identifyMode = false,
}: RealSkyBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<{ destroy?: () => void } | null>(null);
  const moduleRef = useRef<StellariumModule | null>(null);
  const idleLabelTimerRef = useRef<number>(0);
  const quietUiDebounceRef = useRef<number>(0);
  const [pickedLabel, setPickedLabel] = useState<string | null>(null);

  useEffect(() => {
    if (identifyMode) return undefined;
    setPickedLabel(null);
    window.clearTimeout(idleLabelTimerRef.current);
    return undefined;
  }, [identifyMode]);

  const report = useCallback(
    (ok: boolean) => {
      onEngineReady?.(ok);
    },
    [onEngineReady]
  );

  useEffect(() => {
    let cancelled = false;
    let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    const paths = stellariumPaths();
    const verifyAssets = async () => {
      const jsResp = await fetch(paths.js, { method: 'GET' });
      if (!jsResp.ok) {
        throw new Error(`Missing Stellarium JS: ${paths.js}`);
      }
      const jsText = await jsResp.text();
      if (/<!doctype html>|<html/i.test(jsText)) {
        throw new Error(
          `Stellarium JS path returned HTML shell, not engine bundle: ${paths.js}`
        );
      }

      const wasmResp = await fetch(paths.wasm, { method: 'GET' });
      if (!wasmResp.ok) {
        throw new Error(`Missing Stellarium WASM: ${paths.wasm}`);
      }
      const wasmBuf = await wasmResp.arrayBuffer();
      if (!wasmBuf.byteLength) {
        throw new Error(`Empty Stellarium WASM file: ${paths.wasm}`);
      }
    };

    const loadScript = (): Promise<void> =>
      new Promise((resolve, reject) => {
        if (typeof window.StelWebEngine === 'function') {
          resolve();
          return;
        }
        if (window.StellariumWebEngine && typeof window.StellariumWebEngine === 'function') {
          resolve();
          return;
        }
        if (scriptEl && scriptEl.dataset.loaded === 'true') {
          resolve();
          return;
        }
        scriptEl = document.createElement('script');
        scriptEl.id = SCRIPT_ID;
        scriptEl.async = true;
        scriptEl.src = paths.js;
        scriptEl.onload = () => {
          if (scriptEl) scriptEl.dataset.loaded = 'true';
          resolve();
        };
        scriptEl.onerror = () =>
          reject(new Error(`Failed to load Stellarium script: ${paths.js}`));
        document.body.appendChild(scriptEl);
      });

    const init = () => {
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;

      const Engine =
        (typeof window.StellariumWebEngine === 'function' &&
          window.StellariumWebEngine) ||
        (typeof window.StelWebEngine === 'function' && window.StelWebEngine);

      if (!Engine) {
        report(false);
        return;
      }

      try {
        const handle = Engine({
          wasmFile: paths.wasm,
          canvas,
          translateFn: (_domain: unknown, str: string) => str,
          onReady: (stel: Record<string, unknown>) => {
            if (cancelled) return;

            const mod = stel as StellariumModule;
            moduleRef.current = mod;

            wireSkyData(stel, getStellariumSkyDataPrefixes());
            applyQuietSkyUi(stel);
            /** Data sources can toggle label/name flags after attach — re-sync a few times. */
            [50, 400, 1500].forEach((ms) => {
              window.setTimeout(() => {
                if (cancelled) return;
                applyQuietSkyUi(stel);
              }, ms);
            });

            /** Engine may turn labels back on during updates; keep ambient sky uncluttered. */
            mod.change?.(() => {
              window.clearTimeout(quietUiDebounceRef.current);
              quietUiDebounceRef.current = window.setTimeout(() => {
                if (cancelled) return;
                applyQuietSkyUi(stel);
              }, 120);
            });

            mod.on?.('click', () => {
              window.requestAnimationFrame(() => {
                try {
                  const core = mod.core as Record<string, unknown> | undefined;
                  const sel =
                    core?.selection ?? core?.focused ?? core?.selection_object;
                  const text = designationFromSelection(sel);
                  if (!text) {
                    window.clearTimeout(idleLabelTimerRef.current);
                    setPickedLabel(null);
                    return;
                  }
                  setPickedLabel(text);
                  window.clearTimeout(idleLabelTimerRef.current);
                  idleLabelTimerRef.current = window.setTimeout(() => {
                    setPickedLabel(null);
                  }, 6000);
                } catch {
                  /* noop */
                }
              });
            });

            /** Observer location + wall-clock time (upstream uses `observer` / MJD helpers). */
            try {
              const obs = stel.observer as
                | {
                    utc?: number;
                    latitude?: number;
                    longitude?: number;
                  }
                | undefined;
              const dateFn = stel.date2MJD as
                | ((t: number) => number)
                | undefined;
              const D2R = (stel.D2R as number) ?? Math.PI / 180;
              if (obs) {
                if (dateFn) obs.utc = dateFn(Date.now());
                /** Bangalore default */
                obs.latitude = 12.9716 * D2R;
                obs.longitude = 77.5946 * D2R;
              }
            } catch {
              /* observer API optional */
            }

            /** Fonts: upstream `setFont(font, url)` fetches bytes and registers the face. */
            try {
              if (typeof mod.setFont === 'function') {
                Promise.all([
                  mod.setFont(
                    'regular',
                    `${paths.staticPrefix}fonts/Roboto-Regular.ttf`
                  ),
                  mod.setFont('bold', `${paths.staticPrefix}fonts/Roboto-Bold.ttf`),
                ]).catch(() => {});
              }
            } catch {
              /* fonts optional */
            }

            if (typeof handle === 'object' && handle && typeof handle.destroy === 'function') {
              instanceRef.current = handle;
            }

            report(true);
          },
        });

        if (
          typeof handle === 'object' &&
          handle &&
          'destroy' in handle &&
          typeof (handle as { destroy?: () => void }).destroy === 'function'
        ) {
          instanceRef.current = handle as { destroy?: () => void };
        }
      } catch (e) {
        console.warn('[RealSkyBackground] init failed:', e);
        report(false);
      }
    };

    verifyAssets()
      .then(loadScript)
      .then(init)
      .catch((err) => {
        console.warn('[RealSkyBackground] fallback to StarField:', err);
        report(false);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(quietUiDebounceRef.current);
      window.clearTimeout(idleLabelTimerRef.current);
      instanceRef.current?.destroy?.();
      instanceRef.current = null;
      moduleRef.current = null;
    };
  }, [report]);

  /** Resize wrapper with canvas (helps WebGL framebuffer match CSS size). */
  useEffect(() => {
    const el = containerRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    const apply = () => {
      const w = Math.max(1, el.clientWidth);
      const h = Math.max(1, el.clientHeight);
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener('resize', apply);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 overflow-hidden pointer-events-none ${identifyMode ? 'z-[40]' : 'z-0'}`}
    >
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          opacity: 0.12,
          filter: 'brightness(0.55) contrast(1.05) saturate(0.9)',
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      </div>
      {identifyMode ? (
        <>
          <div
            className="absolute inset-0 z-20 bg-transparent touch-none cursor-crosshair"
            style={{ pointerEvents: 'auto' }}
            aria-hidden={false}
            role="presentation"
            onPointerDown={(e) => {
              const mod = moduleRef.current;
              const canv = canvasRef.current;
              if (!mod || !canv || typeof mod._core_on_mouse !== 'function') return;
              const rect = canv.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              mod._core_on_mouse(0, 1, x, y, 1);
              mod._core_on_mouse(0, 0, x, y, 1);
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-28 z-30 mx-auto flex max-w-xl justify-center px-4"
            aria-live="polite"
          >
            <div className="min-h-[38px] w-full break-words rounded-xl border border-white/10 bg-black/65 px-4 py-2.5 text-center text-sm tracking-wide text-white/95 shadow-xl backdrop-blur-sm">
              {pickedLabel ? (
                <span className="font-medium">{pickedLabel}</span>
              ) : (
                <span className="text-xs text-accent/65">
                  Tap a star or object — Esc to exit
                </span>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
