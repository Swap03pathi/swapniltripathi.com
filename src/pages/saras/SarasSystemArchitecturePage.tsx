import Footer from '../../components/Footer';
import Seo from '../../components/Seo';
import MmieArchitectureCanvas from '../../components/architecture/mmie/MmieArchitectureCanvas';
import RrisArchitectureCanvas from '../../components/architecture/rris/RrisArchitectureCanvas';
import RteArchitectureCanvas from '../../components/architecture/rte/RteArchitectureCanvas';
import SarasArchitectureBridge from '../../components/saras/SarasArchitectureBridge';
import { SARAS_SYSTEM_ROUTES } from '../../constants/sarasExperience';
import type { SarasSystemKey } from '../../constants/sarasExperience';

const SYSTEM_META = {
  'realtime-ingestion': {
    title: 'Realtime Recommendation Ingestion System',
    Canvas: RrisArchitectureCanvas,
    seoTitle: 'Realtime Signal Ingestion — Saras Architecture',
    seoDescription:
      'How Saras captures recommendations from Telegram, PDFs, YouTube live, X and news — normalized by a two-stage LLM pipeline.',
    path: SARAS_SYSTEM_ROUTES.ingestion,
  },
  'realtime-execution': {
    title: 'Real-Time Virtual Execution System',
    Canvas: RteArchitectureCanvas,
    seoTitle: 'Realtime Virtual Execution — Saras Architecture',
    seoDescription:
      'A persistent WebSocket-driven engine matching live prices against signals in <500ms — with Redis state, Mongo change streams, auto-recovery.',
    path: SARAS_SYSTEM_ROUTES.execution,
  },
  'market-intelligence': {
    title: 'Multidimensional Market Intelligence Engine',
    Canvas: MmieArchitectureCanvas,
    seoTitle: 'Market Intelligence Engine — Saras Architecture',
    seoDescription:
      'Filter first, hydrate last: Redis sorted-set architecture serving multidimensional live-ranked market intelligence.',
    path: SARAS_SYSTEM_ROUTES.intelligence,
  },
} as const;

export default function SarasSystemArchitecturePage({ system }: { system: SarasSystemKey }) {
  const meta = SYSTEM_META[system];
  const Canvas = meta.Canvas;

  return (
    <div className="relative z-10 min-h-screen bg-dark text-white">
      <Seo title={meta.seoTitle} description={meta.seoDescription} path={meta.path} />
      <SarasArchitectureBridge system={system} />
      <div className="bg-[#020617] text-slate-300">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 md:pt-12">
          <Canvas />
        </div>
      </div>
      <Footer />
    </div>
  );
}
