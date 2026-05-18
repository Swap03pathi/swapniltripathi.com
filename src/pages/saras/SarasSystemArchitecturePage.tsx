import Footer from '../../components/Footer';
import MmieArchitectureCanvas from '../../components/architecture/mmie/MmieArchitectureCanvas';
import RrisArchitectureCanvas from '../../components/architecture/rris/RrisArchitectureCanvas';
import RteArchitectureCanvas from '../../components/architecture/rte/RteArchitectureCanvas';
import SarasArchitectureBridge from '../../components/saras/SarasArchitectureBridge';
import type { SarasSystemKey } from '../../constants/sarasExperience';

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

export default function SarasSystemArchitecturePage({ system }: { system: SarasSystemKey }) {
  const Canvas = SYSTEM_META[system].Canvas;

  return (
    <div className="relative z-10 min-h-screen bg-dark text-white">
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
