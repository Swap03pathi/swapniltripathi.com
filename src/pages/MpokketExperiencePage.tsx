import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import MpokketClosing from '../components/mpokket/MpokketClosing';
import MpokketCoreSystems from '../components/mpokket/MpokketCoreSystems';
import MpokketHero from '../components/mpokket/MpokketHero';
import { MpokketBackdrop } from '../components/mpokket/MpokketPrimitives';
import MpokketScaleTooling from '../components/mpokket/MpokketScaleTooling';
import { MPOKKET_EXPERIENCE_PATH } from '../constants/mpokketExperience';

export default function MpokketExperiencePage() {
  return (
    <div className="relative z-10 min-h-screen bg-dark text-white">
      <Seo
        title="mPokket — Tech Lead, Data Platform · Swapnil Tripathi"
        description="Leading the Data Platform at mPokket: Databricks lakehouse and AWS DMS replication, compliance and audit data, and a 20% Databricks cost cut in month one."
        path={MPOKKET_EXPERIENCE_PATH}
      />
      <MpokketBackdrop />
      <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Link
            to="/experience"
            className="inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-accent"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Experiences
          </Link>
        </div>
      </div>
      <main>
        <MpokketHero />
        <MpokketCoreSystems />
        <MpokketScaleTooling />
        <MpokketClosing />
      </main>
      <Footer />
    </div>
  );
}
