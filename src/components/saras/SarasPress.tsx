import { m } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  Building2,
  Mic2,
  Newspaper,
  Radio,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SARAS_SECTION_IDS } from '../../constants/sarasExperience';
import { sarasPress } from '../../data/sarasExperienceCopy';
import { SarasCard, SarasSection } from './SarasPrimitives';

const pressIcons: Record<(typeof sarasPress)[number]['id'], LucideIcon> = {
  livemint: Newspaper,
  antler: Building2,
  podcast: Mic2,
  sharktank: Award,
  signal: Radio,
};

function isPressLink(href: string) {
  return href.trim().length > 0;
}

function PressCardContent({
  item,
  showExternal,
}: {
  item: (typeof sarasPress)[number];
  showExternal: boolean;
}) {
  const Icon = pressIcons[item.id];
  const isRecognition = item.type === 'Recognition';

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${
            isRecognition
              ? 'border-white/10 bg-white/[0.04] text-white/55'
              : 'border-white/[0.08] bg-white/[0.03] text-white/55'
          }`}
        >
          {item.type}
        </span>
        {showExternal ? (
          <ArrowUpRight
            className="h-3.5 w-3.5 shrink-0 text-white/25 transition-colors group-hover:text-accent/60"
            strokeWidth={1.5}
            aria-hidden
          />
        ) : null}
      </div>

      <div
        className={`mt-5 flex h-11 w-11 items-center justify-center rounded-xl border bg-white/[0.02] transition-colors ${
          isRecognition
            ? 'border-white/[0.08] text-white/45'
            : 'border-white/[0.07] text-white/55 group-hover:border-accent/20 group-hover:text-accent/55'
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.35} aria-hidden />
      </div>

      <h3
        className={`mt-4 text-base font-semibold leading-snug tracking-tight md:text-[1.05rem] ${
          isRecognition ? 'text-white/90' : 'text-white transition-colors group-hover:text-white'
        }`}
      >
        {item.outlet}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/55">{item.supportLine}</p>
    </>
  );
}

function PressCard({ item, index }: { item: (typeof sarasPress)[number]; index: number }) {
  const clickable = isPressLink(item.href);
  const isRecognition = item.type === 'Recognition';

  const cardClass = `flex h-full flex-col p-6 md:p-7 ${
    isRecognition ? 'border-white/[0.08] bg-white/[0.025]' : ''
  }`;

  const motionProps = {
    initial: { opacity: 0, y: 10 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: '-40px' } as const,
    transition: { duration: 0.35, delay: index * 0.05 },
  };

  if (!clickable) {
    return (
      <m.div {...motionProps}>
        <SarasCard className={cardClass}>
          <PressCardContent item={item} showExternal={false} />
        </SarasCard>
      </m.div>
    );
  }

  return (
    <m.a
      {...motionProps}
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className={`group block ${
        clickable ? 'transition-transform duration-300 hover:-translate-y-0.5' : ''
      }`}
    >
      <SarasCard
        hover
        className={`${cardClass} transition-[border-color,box-shadow] duration-300 group-hover:shadow-[0_0_40px_-18px_rgba(0,212,255,0.14)]`}
      >
        <PressCardContent item={item} showExternal />
      </SarasCard>
    </m.a>
  );
}

export default function SarasPress() {
  return (
    <SarasSection
      id={SARAS_SECTION_IDS.press}
      eyebrow="Public Presence"
      title="Press, Recognition & Community Presence"
      description="Saras evolved into a publicly visible platform through media coverage, startup ecosystems, founder conversations, and community-driven distribution."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sarasPress.map((item, i) => (
          <PressCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </SarasSection>
  );
}
