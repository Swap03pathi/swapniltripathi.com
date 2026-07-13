import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import AppleClosing from '../components/apple/AppleClosing';
import AppleCoreSystems from '../components/apple/AppleCoreSystems';
import AppleHero from '../components/apple/AppleHero';
import { AppleBackdrop } from '../components/apple/ApplePrimitives';
import AppleScaleTooling from '../components/apple/AppleScaleTooling';

export default function AppleExperiencePage() {
  return (
    <div className="relative z-10 min-h-screen bg-dark text-white">
      <Seo
        title="Apple — Data Engineer → Data Scientist · Swapnil Tripathi"
        description="Sole data engineer for an AppleCare analytics org: ~20 pipelines, KPI anomaly detection across 48 metrics, NLP classification at 400K+ items/day."
        path="/experience/apple"
      />
      <AppleBackdrop />
      <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
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
        <AppleHero />
        <AppleCoreSystems />
        <AppleScaleTooling />
        <AppleClosing />
      </main>
      <Footer />
    </div>
  );
}
