import Hero from '../components/Hero';
import AboutBlurb from '../components/AboutBlurb';
import Timeline from '../components/Timeline';
import SystemsOperationalWork from '../components/SystemsOperationalWork';
import Footer from '../components/Footer';
// import { thoughts } from '../data';

export default function HomePage() {
  return (
    <div className="relative z-10">
      <Hero />
      <AboutBlurb />
      <Timeline />
      <SystemsOperationalWork />

      {/* Thoughts Preview — commented out for now; restore when ready */}
      {/*
      <section className="py-24 px-6">
        <motion.div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
            <h2 className="text-xs font-medium uppercase tracking-widest text-accent/60">
              Thoughts
            </h2>
            <span className="rounded border border-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent/40">
              Coming Soon
            </span>
          </div>
          <div className="space-y-4">
            {thoughts.map((thought, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
              >
                <p className="text-sm italic text-white/30">&quot;{thought}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      <Footer />
    </div>
  );
}
