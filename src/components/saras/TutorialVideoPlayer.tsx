import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { youtubeEmbedSrc } from '../../utils/youtubeEmbed';

type TutorialVideoPlayerProps = {
  videoId: string;
  title?: string;
};

/** Compact preview; click opens fullscreen-style modal. Click backdrop or Escape to close. */
export default function TutorialVideoPlayer({ videoId, title = 'Saras product tutorial' }: TutorialVideoPlayerProps) {
  const [expanded, setExpanded] = useState(false);
  const thumbSrc = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const embedSrc = youtubeEmbedSrc(videoId);

  const close = useCallback(() => setExpanded(false), []);

  useEffect(() => {
    if (!expanded) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [expanded, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="group relative mt-6 block w-full max-w-md overflow-hidden rounded-xl border border-white/[0.08] bg-black text-left transition-colors hover:border-accent/25"
        aria-label="Play tutorial video"
      >
        <div className="relative aspect-video max-h-[200px] w-full">
          <img
            src={thumbSrc}
            alt=""
            className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-95"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors group-hover:bg-black/25">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-lg backdrop-blur-sm transition-transform group-hover:scale-105">
              <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
            </span>
          </div>
        </div>
        <p className="px-3 py-2 text-xs text-white/40">Click to expand</p>
      </button>

      <AnimatePresence>
        {expanded ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              aria-label="Close video"
              onClick={close}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className="relative z-10 w-full max-w-4xl"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                className="absolute -right-1 -top-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition-colors hover:bg-white/15 sm:-right-2 sm:-top-12"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
                <div className="relative aspect-video w-full">
                  <iframe
                    title={title}
                    src={`${embedSrc}&autoplay=1`}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
