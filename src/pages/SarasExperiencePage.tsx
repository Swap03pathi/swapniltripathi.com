import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { useSarasScrollRestore } from '../hooks/useSarasScrollRestore';
import SarasCoreSystems from '../components/saras/SarasCoreSystems';
import SarasHero from '../components/saras/SarasHero';
import SarasOwnership from '../components/saras/SarasOwnership';
import SarasPlatformEcosystem from '../components/saras/SarasPlatformEcosystem';
import SarasPlatformEvolution from '../components/saras/SarasPlatformEvolution';
import SarasPress from '../components/saras/SarasPress';
import SarasProductSurfaces from '../components/saras/SarasProductSurfaces';
import { SarasBackdrop } from '../components/saras/SarasPrimitives';
import SarasReliability from '../components/saras/SarasReliability';
import SarasSectionNav from '../components/saras/SarasSectionNav';

export default function SarasExperiencePage() {
  useSarasScrollRestore();

  return (
    <div className="relative z-10 min-h-screen bg-dark text-white">
      <Seo
        title="Saras — CTO & Co-Founder · Swapnil Tripathi"
        description="Building a signal-intelligence platform: 200K+ daily messages received, virtual trade execution on live price feeds, 150K+ downloads, 98% uptime."
        path="/experience/saras"
      />
      <SarasBackdrop />
      <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Link
            to="/experience"
            className="inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-accent"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Experience
          </Link>
        </div>
      </div>
      <SarasSectionNav />
      <main>
        <SarasHero />
        <SarasCoreSystems />
        <SarasPlatformEcosystem />
        <SarasProductSurfaces />
        <SarasPlatformEvolution />
        <SarasReliability />
        <SarasPress />
        <SarasOwnership />
      </main>
      <Footer />
    </div>
  );
}
