import { m } from 'framer-motion';
import { Activity, Database, Target, Zap } from 'lucide-react';
import { mmieHero, mmieHeroKpis } from '../../../data/mmieArchitectureCopy';
import { MmieGlassPanel } from './MmiePrimitives';
import { HeroIsometricStack } from './HeroIsometricStack';
import { QueryExplosionGraph } from './QueryExplosionGraph';

const kpiIcon = {
  amber: Zap,
  orange: Activity,
  emerald: Database,
  violet: Target,
} as const;

const kpiIconClass: Record<(typeof mmieHeroKpis)[number]['tone'], string> = {
  amber: 'text-amber-400/90',
  orange: 'text-orange-400/90',
  emerald: 'text-emerald-400/90',
  violet: 'text-violet-400/90',
};

/** Subtle grid + slow radial drift — not dashboard motion */
function HeroBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
        }}
      />
      <m.div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
        animate={{ opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 45% at 18% 12%, rgba(59,130,246,0.12), transparent 50%),
            radial-gradient(ellipse 55% 40% at 88% 22%, rgba(139,92,246,0.1), transparent 48%)
          `,
        }}
      />
    </>
  );
}

export function HeroAndQueryExplosion() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#020617] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.85)]">
      <HeroBackdrop />
      <div className="relative grid grid-cols-12 gap-x-5 gap-y-8 p-5 sm:p-6 md:p-8 lg:gap-y-10">
        <div className="col-span-12 lg:col-span-7">
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            {mmieHero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            {mmieHero.subtitle}
          </p>

          <MmieGlassPanel className="mt-6 p-4 md:p-5" glow="subtle">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {mmieHeroKpis.map((k) => {
                const Icon = kpiIcon[k.tone];
                return (
                  <div key={k.label} className="min-w-0">
                    <Icon className={`h-5 w-5 ${kpiIconClass[k.tone]}`} strokeWidth={1.35} />
                    <p className="mt-2 text-sm font-semibold text-slate-100">{k.label}</p>
                    <p className="mt-0.5 text-sm leading-snug text-slate-500">{k.value}</p>
                  </div>
                );
              })}
            </div>
          </MmieGlassPanel>

          <p className="mt-5 text-xs font-medium tracking-[0.22em] text-slate-500">{mmieHero.tagline}</p>
        </div>

        <div className="col-span-12 flex justify-center lg:col-span-5 lg:justify-end lg:pt-1">
          <HeroIsometricStack />
        </div>

        <div className="col-span-12">
          <QueryExplosionGraph />
        </div>
      </div>
    </div>
  );
}
