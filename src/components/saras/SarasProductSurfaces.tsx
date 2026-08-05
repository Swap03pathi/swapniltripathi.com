import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
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
    <div className="group flex flex-col items-center">
      <div className="w-full max-w-[200px] rounded-[1.25rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-1.5 sm:max-w-[220px] lg:max-w-[260px]">
        <div className="aspect-[9/19] overflow-hidden rounded-[1rem] border border-white/[0.06] bg-[#0a0a0a]">
          {src ? (
            <button
              type="button"
              onClick={() => onOpen({ src, label })}
              className="flex h-full w-full cursor-zoom-in items-start justify-center transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label={`View ${label} screenshot`}
            >
              <img
                src={src}
                alt={label}
                className="h-full w-full object-contain object-top"
                loading="lazy"
              />
            </button>
          ) : (
            <div className="flex h-full flex-col p-2">
              <div className="h-4 rounded bg-accent/15" />
              <div className="mt-2 space-y-1.5">
                <div className="h-6 rounded border border-white/[0.05] bg-white/[0.02]" />
                <div className="h-6 rounded border border-white/[0.05] bg-white/[0.02]" />
                <div className="h-10 rounded border border-white/[0.05] bg-white/[0.02]" />
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-center text-sm font-semibold text-white/75">{label}</p>
      <p className="mt-1 max-w-[240px] text-center text-xs leading-snug text-white/50">{caption}</p>
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
    <m.button
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
    </m.button>
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
    >
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-16">
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

      <SarasCard className="mt-14 border-white/[0.06] bg-white/[0.015] px-5 py-8 text-center md:mt-16 md:px-8 md:py-10">
        <h3 className="text-base font-semibold text-white/90">Product Walkthrough</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/42">
          A short walkthrough of the Saras product experience, advisor discovery flows, and realtime
          recommendation surfaces.
        </p>
        {videoId ? (
          <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center gap-5 md:flex-row md:items-stretch md:gap-6">
            <div className="flex shrink-0 items-center justify-center">
              <TutorialVideoPlayer videoId={videoId} title="Saras product walkthrough" />
            </div>
            <div className="flex w-full max-w-md flex-col justify-center rounded-2xl border border-white/[0.06] bg-white/[0.012] p-5 text-left backdrop-blur-sm md:p-6">
              <h4 className="text-sm font-medium text-white/80">Localized Product Experience</h4>
              <div className="mt-3 space-y-3 text-xs leading-relaxed text-white/42">
                <p>
                  The Saras product experience was designed to support multilingual expansion from
                  the beginning using structured localization workflows inside the Flutter
                  application.
                </p>
                <p>
                  UI copy, labels, notifications, and interaction surfaces were mapped through
                  JSON-based language key systems, allowing product surfaces to scale across
                  multiple regional languages without changing application logic.
                </p>
                <p>
                  This enabled faster iteration across bilingual experiences while keeping delivery
                  workflows operationally consistent across platforms.
                </p>
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-white/25">
                Designed for scalable regional rollout.
              </p>
            </div>
          </div>
        ) : (
          <p className="mx-auto mt-6 max-w-xl text-sm text-white/55">
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
