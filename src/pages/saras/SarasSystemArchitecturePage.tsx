import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import MmieArchitectureCanvas from '../../components/architecture/mmie/MmieArchitectureCanvas';
import RrisArchitectureCanvas from '../../components/architecture/rris/RrisArchitectureCanvas';
import RteArchitectureCanvas from '../../components/architecture/rte/RteArchitectureCanvas';
import { SARAS_EXPERIENCE_PATH, SARAS_SECTION_IDS } from '../../constants/sarasExperience';
import { saveSarasReturnSection } from '../../utils/sarasScrollRestore';

const SYSTEM_META = {
  'realtime-ingestion': {
    title: 'Realtime Recommendation Ingestion System',
    Canvas: RrisArchitectureCanvas,
  },
  'realtime-execution': {
    title: 'Real-Time Virtual Execution System',
    Canvas: RteArchitectureCanvas,
  },
  'market-intelligence': {
    title: 'Multidimensional Market Intelligence Engine',
    Canvas: MmieArchitectureCanvas,
  },
} as const;

export type SarasSystemKey = keyof typeof SYSTEM_META;

export default function SarasSystemArchitecturePage({ system }: { system: SarasSystemKey }) {
  const meta = SYSTEM_META[system];
  const Canvas = meta.Canvas;

  return (
    <div className="relative z-10 min-h-screen bg-[#020617] px-4 pb-8 pt-24 text-slate-300 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link
          to={SARAS_EXPERIENCE_PATH}
          state={{ scrollSection: SARAS_SECTION_IDS.coreSystems }}
          onClick={() => saveSarasReturnSection(SARAS_SECTION_IDS.coreSystems)}
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-accent/90"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Saras Experience
        </Link>
        <Canvas />
      </div>
      <Footer />
    </div>
  );
}
