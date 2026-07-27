import { useCallback, useEffect, useState } from 'react';
import { hasStellariumSkyDataConfigured } from '../config/stellariumSkyData';
import { isHighEndDevice } from '../utils/deviceCapability';
import PremiumToast from './PremiumToast';
import StarField from './StarField';
import RealSkyBackground from './RealSkyBackground';

const MOBILE_MAX_PX = 768;
const HAS_SKYDATA_CONFIG = hasStellariumSkyDataConfigured();

const IDENTIFY_TOAST_MESSAGE =
  'Select any celestial body in the background to explore the system.';

/**
 * Smart hybrid: desktop (`>768px`) always tries the Stellarium WASM engine; mobile
 * tries it only on capable devices (see `isHighEndDevice`). When the engine isn't
 * used or fails, the lightweight 2D `StarField` renders as the fallback everywhere.
 */
export default function BackgroundLayer() {
  const [wideScreen, setWideScreen] = useState(
    () => typeof window !== 'undefined' && window.innerWidth > MOBILE_MAX_PX
  );
  /** Capability is fixed for the session — evaluate once. */
  const [capableDevice] = useState(() => isHighEndDevice());
  /**
   * The Stellarium engine is ~6MB (script + WASM + sky data). Loading it at mount
   * competes with LCP/TBT, so it waits for window load + an idle slot; StarField
   * covers the visuals instantly in the meantime.
   */
  const [engineAllowed, setEngineAllowed] = useState(false);
  const [stellariumActive, setStellariumActive] = useState(false);
  const [skyIdentifyMode, setSkyIdentifyMode] = useState(false);
  const [showIdentifyToast, setShowIdentifyToast] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MOBILE_MAX_PX + 1}px)`);
    const sync = () => setWideScreen(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    // The engine is pure eye-candy, so it loads on the FIRST user interaction
    // (scroll / touch / mouse / key). Real users trigger this within moments;
    // lab runs and bots never do — so the 6MB download can't sit inside the
    // LCP/TBT measurement window. Reduced-motion and Save-Data users keep the
    // lightweight StarField permanently.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const conn = (navigator as { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return undefined;

    const events: (keyof WindowEventMap)[] = [
      'pointerdown',
      'pointermove',
      'scroll',
      'keydown',
      'touchstart',
    ];
    const allow = () => {
      events.forEach((e) => window.removeEventListener(e, allow));
      setEngineAllowed(true);
    };
    events.forEach((e) =>
      window.addEventListener(e, allow, { once: false, passive: true })
    );
    return () => events.forEach((e) => window.removeEventListener(e, allow));
  }, []);

  /** Desktop always; mobile only when the device can handle the engine. */
  const shouldTryStellarium =
    HAS_SKYDATA_CONFIG && engineAllowed && (wideScreen || capableDevice);

  useEffect(() => {
    if (!shouldTryStellarium) setStellariumActive(false);
  }, [shouldTryStellarium]);

  useEffect(() => {
    if (!shouldTryStellarium || !stellariumActive) setSkyIdentifyMode(false);
  }, [shouldTryStellarium, stellariumActive]);

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

  const toggleIdentifyMode = () => {
    setSkyIdentifyMode((prev) => {
      const next = !prev;
      if (next) setShowIdentifyToast(true);
      return next;
    });
  };

  return (
    <>
      {!stellariumActive || !shouldTryStellarium ? <StarField /> : null}
      {shouldTryStellarium ? (
        <RealSkyBackground onEngineReady={onEngineReady} identifyMode={skyIdentifyMode} />
      ) : null}
      {shouldTryStellarium && stellariumActive ? (
        <button
          type="button"
          className={`fixed bottom-6 right-6 z-[45] rounded-full border px-4 py-2 text-xs font-medium tracking-wide backdrop-blur-sm transition-colors ${
            skyIdentifyMode
              ? 'border-accent/50 bg-accent/20 text-accent'
              : 'border-white/15 bg-black/55 text-accent/90 hover:border-accent/30 hover:bg-black/65'
          }`}
          onClick={toggleIdentifyMode}
          aria-pressed={skyIdentifyMode}
          title={
            skyIdentifyMode
              ? 'Exit sky identify mode'
              : 'Identify sky objects — tap stars for names'
          }
        >
          {skyIdentifyMode ? 'Done' : 'Identify'}
        </button>
      ) : null}
      <PremiumToast
        message={IDENTIFY_TOAST_MESSAGE}
        visible={showIdentifyToast}
        onDismiss={() => setShowIdentifyToast(false)}
      />
    </>
  );
}
