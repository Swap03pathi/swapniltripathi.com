import { Tv, Users, Wallet } from 'lucide-react';
import { SARAS_SECTION_IDS } from '../../constants/sarasExperience';
import { sarasHero } from '../../data/sarasExperienceCopy';
import { resolveAssetUrl } from '../../utils/assetUrl';
import SarasDeviceMockups from './SarasDeviceMockups';
import { SarasCard } from './SarasPrimitives';

const highlightIcons = {
  tv: Tv,
  funding: Wallet,
  users: Users,
} as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function SarasHero() {
  return (
    <section
      id={SARAS_SECTION_IDS.hero}
      className="scroll-mt-28 min-h-[calc(100vh-3.5rem)] border-b border-white/[0.06]"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-12 items-center gap-10 px-5 py-16 sm:px-6 lg:gap-14 lg:px-8 lg:py-20">
        <div className="animate-rise col-span-12 lg:col-span-6">
          <div className="flex items-center gap-3">
            <img
              src={resolveAssetUrl('/logos/saras.png')}
              alt="Saras"
              className="h-9 w-9 rounded-md object-contain"
            />
            <span className="text-sm font-semibold tracking-wide text-white/90">saras</span>
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-accent/75">
            {sarasHero.label}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            {sarasHero.title}{' '}
            <span className="text-accent">{sarasHero.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 md:text-base">
            {sarasHero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {sarasHero.highlights.map((h) => {
              const Icon = highlightIcons[h.icon];
              return (
                <SarasCard key={h.label} className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-accent/70" strokeWidth={1.35} />
                    <span className="text-xs font-medium text-white/65 md:text-sm">{h.label}</span>
                  </div>
                </SarasCard>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-8 sm:grid-cols-3 lg:grid-cols-5">
            {sarasHero.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-xl font-bold text-white md:text-2xl">{m.value}</p>
                <p className="mt-0.5 text-xs text-white/50">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollTo(SARAS_SECTION_IDS.coreSystems)}
              className="rounded-lg bg-accent/15 px-5 py-2.5 text-sm font-semibold text-accent border border-accent/25 transition-colors hover:bg-accent/25"
            >
              Explore Core Systems →
            </button>
            <button
              type="button"
              onClick={() => scrollTo(SARAS_SECTION_IDS.product)}
              className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
            >
              Explore Product ↓
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <SarasDeviceMockups />
        </div>
      </div>
    </section>
  );
}
