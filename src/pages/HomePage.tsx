import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutBlurb from '../components/AboutBlurb';
import Timeline from '../components/Timeline';
import SystemsOperationalWork from '../components/SystemsOperationalWork';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { PROFILE_PAGE } from '../lib/jsonld';
import { thoughts } from '../data';

export default function HomePage() {
  return (
    <div className="relative z-10">
      <Seo
        title="Swapnil Tripathi — Systems Builder | CTO @ Saras, ex-Apple"
        description="CTO & co-founder at Saras, ex-Apple data engineer, IIT Bombay. I build real-time data systems — and write about the architecture behind them."
        path="/"
        jsonLd={PROFILE_PAGE}
      />
      <Hero />
      <AboutBlurb />
      <Timeline />
      <SystemsOperationalWork />

      <section className="py-24 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
            <h2 className="text-xs font-medium uppercase tracking-widest text-accent/60">
              Thoughts
            </h2>
            <Link
              to="/thoughts"
              className="text-[10px] font-medium text-accent/40 hover:text-accent/70 transition-colors"
            >
              Read the write-ups →
            </Link>
          </div>
          <div className="space-y-4">
            {thoughts.map((thought, i) => (
              <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                <p className="text-sm italic text-white/30">&quot;{thought}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
