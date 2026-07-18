import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import OyoClosing from '../components/oyo/OyoClosing';
import OyoExplorationWork from '../components/oyo/OyoExplorationWork';
import OyoHero from '../components/oyo/OyoHero';
import { OyoBackdrop } from '../components/oyo/OyoPrimitives';

export default function OyoExperiencePage() {
  return (
    <div className="relative z-10 min-h-screen bg-dark text-white font-sans">
      <Seo
        title="OYO — Summer Analyst · Swapnil Tripathi"
        description="OTA scraping and ranking analysis across booking platforms — first hands-on data work, and where I taught myself SQL."
        path="/experience/oyo"
      />
      <OyoBackdrop />
      <div className="border-b border-white/[0.05] px-5 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1040px]">
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
        <OyoHero />
        <OyoExplorationWork />
        <OyoClosing />
      </main>
      <Footer />
    </div>
  );
}
