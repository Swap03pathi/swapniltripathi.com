import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import MmieArchitectureCanvas from '../components/architecture/mmie/MmieArchitectureCanvas';
import { mmieProjectPath } from '../constants/multidimensionalMarketIntelligence';

export default function MultidimensionalMarketIntelligenceArchitecturePage() {
  const location = useLocation();
  return (
    <div className="relative z-10 min-h-screen bg-[#020617] px-4 pb-8 pt-24 text-slate-300 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link
          to={mmieProjectPath()}
          state={{ from: location.pathname }}
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-cyan-400/90"
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Multidimensional Market Intelligence Engine
        </Link>

        <MmieArchitectureCanvas />
      </div>

      <Footer />
    </div>
  );
}
