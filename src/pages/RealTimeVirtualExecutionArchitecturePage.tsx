import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import RteArchitectureCanvas from '../components/architecture/rte/RteArchitectureCanvas';
import { rteProjectPath } from '../constants/realTimeVirtualExecution';

export default function RealTimeVirtualExecutionArchitecturePage() {
  const location = useLocation();
  return (
    <div className="relative z-10 pt-24 pb-8 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          to={rteProjectPath()}
          state={{ from: location.pathname }}
          className="mb-10 inline-flex items-center gap-1.5 text-xs text-white/35 transition-colors hover:text-accent/80"
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
          Real-Time Virtual Execution System
        </Link>

        <header className="relative mb-14 overflow-hidden rounded-2xl border border-white/[0.07] bg-dark-light/40 px-6 py-12 sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-accent/[0.06] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-accent/[0.04] blur-3xl" />
          <h1 className="relative text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Real-Time Virtual Execution Architecture
          </h1>
          <p className="relative mt-5 max-w-3xl text-sm leading-relaxed text-white/45 sm:text-base">
            A persistent low-latency execution system designed for high-throughput
            websocket streams, real-time trade state transitions, and automated
            recovery.
          </p>
        </header>

        <RteArchitectureCanvas />
      </div>

      <Footer />
    </div>
  );
}
