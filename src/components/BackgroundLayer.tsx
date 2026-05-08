import { useCallback, useEffect, useState } from 'react';
import { hasStellariumSkyDataConfigured } from '../config/stellariumSkyData';
import StarField from './StarField';
import RealSkyBackground from './RealSkyBackground';

const MOBILE_MAX_PX = 768;
const HAS_SKYDATA_CONFIG = hasStellariumSkyDataConfigured();

/**
 * Desktop (`>768px`): tries Stellarium WASM; on success hides the lightweight canvas stars.
 * Narrow viewports: canvas `StarField` only (performance guard from your spec).
 */
export default function BackgroundLayer() {
  const [wideScreen, setWideScreen] = useState(
    () =>
      typeof window !== 'undefined' && window.innerWidth > MOBILE_MAX_PX
  );
  /** When true, Stellarium finished `onReady` successfully — stop drawing StarField. */
  const [stellariumActive, setStellariumActive] = useState(false);
  /** Full-screen translucent layer forwards clicks into Stellarium to read labels (Navbar stays above z-40). */
  const [skyIdentifyMode, setSkyIdentifyMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MOBILE_MAX_PX + 1}px)`);
    const sync = () => setWideScreen(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    if (!wideScreen) setStellariumActive(false);
  }, [wideScreen]);

  useEffect(() => {
    if (!wideScreen || !stellariumActive) setSkyIdentifyMode(false);
  }, [wideScreen, stellariumActive]);

  useEffect(() => {
    if (!skyIdentifyMode) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSkyIdentifyMode(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [skyIdentifyMode]);

  const onEngineReady = useCallback((ok: boolean) => {
    if (import.meta.env.DEV) {
      console.info(`[BackgroundLayer] ${ok ? 'Stellarium active' : 'Using StarField fallback'}`);
    }
    setStellariumActive(ok);
  }, []);

  const shouldTryStellarium = wideScreen && HAS_SKYDATA_CONFIG;

  return (
    <>
      {!stellariumActive || !shouldTryStellarium ? <StarField /> : null}
      {shouldTryStellarium ? (
        <RealSkyBackground
          onEngineReady={onEngineReady}
          identifyMode={skyIdentifyMode}
        />
      ) : null}
      {shouldTryStellarium && stellariumActive ? (
        <button
          type="button"
          className={`fixed bottom-6 right-6 z-[45] rounded-full border px-4 py-2 text-xs font-medium tracking-wide backdrop-blur-sm transition-colors ${
            skyIdentifyMode
              ? 'border-accent/50 bg-accent/20 text-accent'
              : 'border-white/15 bg-black/55 text-accent/90 hover:bg-black/65 hover:border-accent/30'
          }`}
          onClick={() => setSkyIdentifyMode((v) => !v)}
          aria-pressed={skyIdentifyMode}
          title={
            skyIdentifyMode
              ? 'Exit sky identify mode'
              : 'Identify sky objects — tap stars for names'
          }
        >
          {skyIdentifyMode ? '✕ Done' : '☆ Identify'}
        </button>
      ) : null}
    </>
  );
}
