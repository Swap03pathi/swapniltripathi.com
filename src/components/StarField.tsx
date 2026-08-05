import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
  /** Per-star peak brightness so the field has depth instead of a flat wash. */
  brightness: number;
}

/**
 * Lightweight 2D-canvas starfield. Used as the background everywhere the
 * Stellarium WASM engine isn't running — the fallback on low-end mobiles and on
 * any device where the engine fails. DPR-aware so dots stay crisp on retina, and
 * pauses drifting when the user prefers reduced motion.
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = motionMedia.matches;

    let animationId = 0;
    let stars: Star[] = [];
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const initStars = () => {
      // Scale count to area so phones aren't overpopulated and large screens
      // aren't sparse. Capped for performance.
      const area = window.innerWidth * window.innerHeight;
      const count = Math.min(220, Math.max(70, Math.round(area / 9000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 1.4 + 0.5) * dpr,
        speed: (Math.random() * 0.12 + 0.03) * dpr,
        phase: Math.random() * Math.PI * 2,
        brightness: Math.random() * 0.45 + 0.35,
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const twinkle = Math.sin(time * 0.001 + star.phase) * 0.5 + 0.5;
        const opacity = star.brightness * (0.55 + twinkle * 0.45);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        if (!reduceMotion) {
          star.y += star.speed;
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      animationId = requestAnimationFrame(loop);
    };

    // Under reduced motion the field is a single static frame — no rAF loop.
    const start = () => {
      cancelAnimationFrame(animationId);
      if (reduceMotion) {
        draw(performance.now());
      } else {
        animationId = requestAnimationFrame(loop);
      }
    };

    const handleResize = () => {
      resize();
      initStars();
      // Resizing the canvas clears it; repaint even when no loop is running.
      start();
    };

    // rAF is already throttled in background tabs, but cancel outright so
    // hidden tabs do zero canvas work.
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        start();
      }
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      start();
    };

    resize();
    initStars();
    start();
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);
    motionMedia.addEventListener('change', handleMotionChange);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      motionMedia.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.5 }}
    />
  );
}
