import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import RrisArchitectureCanvas from '../components/architecture/rris/RrisArchitectureCanvas';
import { rrisProjectPath } from '../constants/realtimeRecommendationIngestion';

export default function RealtimeRecommendationIngestionArchitecturePage() {
  const location = useLocation();
  return (
    <div className="relative z-10 min-h-screen bg-[#030712] px-4 pb-8 pt-24 text-slate-400 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link
          to={rrisProjectPath()}
          state={{ from: location.pathname }}
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-white/35 transition-colors hover:text-violet-300/80"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Realtime Recommendation Ingestion System
        </Link>

        <RrisArchitectureCanvas />
      </div>

      <Footer />
    </div>
  );
}
