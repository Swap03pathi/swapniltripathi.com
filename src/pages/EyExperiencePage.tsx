import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import EyClosing from '../components/ey/EyClosing';
import EyHero from '../components/ey/EyHero';
import { EyBackdrop } from '../components/ey/EyPrimitives';
import EyWorkAreas from '../components/ey/EyWorkAreas';

export default function EyExperiencePage() {
  return (
    <div className="relative z-10 min-h-screen bg-dark text-white font-sans">
      <EyBackdrop />
      <div className="border-b border-white/[0.05] px-5 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1000px]">
          <Link
            to="/experience"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-accent"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Experiences
          </Link>
        </div>
      </div>
      <main>
        <EyHero />
        <EyWorkAreas />
        <EyClosing />
      </main>
      <Footer />
    </div>
  );
}
