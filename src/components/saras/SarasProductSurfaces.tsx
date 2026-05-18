import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SARAS_SECTION_IDS } from '../../constants/sarasExperience';
import { sarasProductSurfaces, sarasTutorialVideoUrl } from '../../data/sarasExperienceCopy';
import { resolveAssetUrl } from '../../utils/assetUrl';
import { getYoutubeVideoId } from '../../utils/youtubeEmbed';
import TutorialVideoPlayer from './TutorialVideoPlayer';
import { SarasCard, SarasSection } from './SarasPrimitives';

type LightboxImage = { src: string; label: string };

function SurfaceFrame({
  label,
  caption,
  imageUrl,
  onOpen,
}: {
  label: string;
  caption: string;
  imageUrl?: string;
  onOpen: (image: LightboxImage) => void;
}) {
  const src = imageUrl ? resolveAssetUrl(imageUrl) : null;

  return (
    <div className="group p-1 transition-transform duration-200 hover:-translate-y-1">
      <div className="mx-auto w-[148px] rounded-[1.2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-1.5 sm:w-[160px]">
        <div className="aspect-[9/18] overflow-hidden rounded-[0.95rem] border border-white/[0.06] bg-[#0a0a0a]">
          {src ? (
            <button
              type="button"
              onClick={() => onOpen({ src, label })}
              className="block h-full w-full cursor-zoom-in text-left transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label={`View ${label} screenshot`}
            >
              <img
                src={src}
                alt={label}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            </button>
          ) : (
            <div className="flex h-full flex-col p-2">
              <div className="h-4 rounded bg-accent/15" />
              <div className="mt-2 space-y-1.5">
                <div className="h-6 rounded border border-white/[0.05] bg-white/[0.02]" />
                <div className="h-6 rounded border border-white/[0.05] bg-white/[0.02]" />
                <div className="h-10 rounded border border-emerald-500/15 bg-emerald-500/[0.06]" />
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="mt-3 text-center text-sm font-semibold text-white/80">{label}</p>
      <p className="mt-1 text-center text-xs leading-snug text-white/35">{caption}</p>
    </div>
  );
}

function SurfaceImageLightbox({
  image,
  onClose,
}: {
  image: LightboxImage;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.button
      type="button"
      className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      aria-label="Close screenshot"
      onClick={onClose}
    >
      <img
        src={image.src}
        alt={image.label}
        className="max-h-[92vh] max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl"
      />
    </motion.button>
  );
}

export default function SarasProductSurfaces() {
  const videoId = getYoutubeVideoId(sarasTutorialVideoUrl);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <SarasSection
      id={SARAS_SECTION_IDS.product}
      eyebrow="Product"
      title="Product Surfaces"
      description="The mobile and web experiences that make advisor intelligence tangible for retail traders."
      className="relative z-10 -mt-px border-t border-white/[0.08] bg-dark pt-20 md:pt-24"
    >
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
        {sarasProductSurfaces.map((s) => (
          <SurfaceFrame
            key={s.id}
            label={s.label}
            caption={s.caption}
            imageUrl={s.imageUrl || undefined}
            onOpen={setLightbox}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox ? <SurfaceImageLightbox key="surface-lightbox" image={lightbox} onClose={closeLightbox} /> : null}
      </AnimatePresence>

      <SarasCard className="mt-16 p-5 md:p-8">
        <h3 className="text-lg font-semibold text-white">Tutorial video</h3>
        {videoId ? (
          <TutorialVideoPlayer videoId={videoId} />
        ) : (
          <p className="mt-4 text-sm text-white/40">
            Add your YouTube URL in{' '}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-accent/80">
              sarasTutorialVideoUrl
            </code>{' '}
            in <code className="text-xs text-white/50">src/data/sarasExperienceCopy.ts</code> to embed
            the player here.
          </p>
        )}
      </SarasCard>
    </SarasSection>
  );
}
