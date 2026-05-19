import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { youtubeEmbedSrc } from '../../utils/youtubeEmbed';

type TutorialVideoPlayerProps = {
  videoId: string;
  title?: string;
};

/** Portrait product walkthrough preview; click opens an immersive modal. */
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
        className="group relative mx-auto block w-full max-w-[210px] overflow-hidden rounded-[28px] border border-white/[0.14] bg-[#050505] p-1.5 text-left shadow-[0_18px_60px_-34px_rgba(0,0,0,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.2] hover:shadow-[0_24px_70px_-36px_rgba(0,0,0,1)]"
        aria-label="Play tutorial video"
      >
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[22px] border border-white/[0.08] bg-black">
          <img
            src={thumbSrc}
            alt=""
            className="h-full w-full object-cover opacity-[0.82] transition-all duration-300 group-hover:scale-[1.015] group-hover:opacity-95"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/32 transition-colors duration-300 group-hover:bg-black/22">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white/90 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-black/55">
              <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/[0.04]" />
        </div>
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
              className="relative z-10 w-full"
              style={{ maxWidth: 'min(400px, 52vh)' }}
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
              <div className="overflow-hidden rounded-[28px] border border-white/[0.14] bg-[#050505] p-1.5 shadow-2xl">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[22px] border border-white/[0.08] bg-black">
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
