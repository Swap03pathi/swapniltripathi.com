import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import TestbookClosing from '../components/testbook/TestbookClosing';
import TestbookHero from '../components/testbook/TestbookHero';
import { TestbookBackdrop } from '../components/testbook/TestbookPrimitives';
import TestbookTechStack from '../components/testbook/TestbookTechStack';
import TestbookWorkAreas from '../components/testbook/TestbookWorkAreas';
import TestbookWorkflow from '../components/testbook/TestbookWorkflow';

export default function TestbookExperiencePage() {
  return (
    <div className="relative z-10 min-h-screen bg-dark text-white font-sans">
      <Seo
        title="Testbook — Analyst · Swapnil Tripathi"
        description="Analytics & instrumentation at an ed-tech startup: Redash dashboards on MongoDB, Firebase event tracking, and self-taught sales-ops automation."
        path="/experience/testbook"
      />
      <TestbookBackdrop />
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
        <TestbookHero />
        <TestbookWorkflow />
        <TestbookWorkAreas />
        <TestbookTechStack />
        <TestbookClosing />
      </main>
      <Footer />
    </div>
  );
}
