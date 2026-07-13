import { Link } from 'react-router-dom';
import { SARAS_EXPERIENCE_PATH, SARAS_SECTION_IDS } from '../../constants/sarasExperience';
import { sarasCoreSystems, sarasSystemIntros } from '../../data/sarasExperienceCopy';
import { saveSarasReturnSection } from '../../utils/sarasScrollRestore';
import { SarasPill } from './SarasPrimitives';
import type { SarasSystemKey } from '../../constants/sarasExperience';
import { SARAS_SYSTEM_ROUTES } from '../../constants/sarasExperience';

const SYSTEM_ROUTE: Record<SarasSystemKey, string> = {
  'realtime-ingestion': SARAS_SYSTEM_ROUTES.ingestion,
  'realtime-execution': SARAS_SYSTEM_ROUTES.execution,
  'market-intelligence': SARAS_SYSTEM_ROUTES.intelligence,
};

export default function SarasArchitectureBridge({ system }: { system: SarasSystemKey }) {
  const route = SYSTEM_ROUTE[system];
  const core = sarasCoreSystems.find((s) => s.href === route);

  if (!core) return null;

  return (
    <header className="border-b border-white/[0.06] bg-dark pb-8 pt-6 md:pb-10 md:pt-8">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/35" aria-label="Breadcrumb">
          <Link
            to={SARAS_EXPERIENCE_PATH}
            className="transition-colors hover:text-accent/80"
          >
            Saras Experience
          </Link>
          <span aria-hidden className="text-white/20">
            →
          </span>
          <Link
            to={SARAS_EXPERIENCE_PATH}
            state={{ scrollSection: SARAS_SECTION_IDS.coreSystems }}
            onClick={() => saveSarasReturnSection(SARAS_SECTION_IDS.coreSystems)}
            className="transition-colors hover:text-accent/80"
          >
            Core Systems
          </Link>
          <span aria-hidden className="text-white/20">
            →
          </span>
          <span className="text-white/55">{core.title}</span>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent/55">
          Architecture deep-dive
        </p>
        <h1 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight text-white md:text-3xl">
          {core.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
          {sarasSystemIntros[system]}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45 md:text-base">
          {core.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {core.stack.map((t) => (
            <SarasPill key={t}>{t}</SarasPill>
          ))}
        </div>
      </div>
    </header>
  );
}
