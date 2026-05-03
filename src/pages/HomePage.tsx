import Hero from '../components/Hero';
import AboutBlurb from '../components/AboutBlurb';
import Timeline from '../components/Timeline';
import ExperienceCard from '../components/ExperienceCard';
import Footer from '../components/Footer';
import { experiences, thoughts } from '../data/experiences';

export default function HomePage() {
  const highlighted = experiences.slice(0, 3);

  return (
    <div className="relative z-10">
      <Hero />
      <AboutBlurb />
      <Timeline />

      {/* Experience Preview */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xs font-medium text-accent/60 uppercase tracking-widest mb-8">
            Experience
          </h2>
          <div className="space-y-4">
            {highlighted.map((exp) => (
              <ExperienceCard key={exp.slug} experience={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* Thoughts Preview */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xs font-medium text-accent/60 uppercase tracking-widest">
              Thoughts
            </h2>
            <span className="text-[10px] text-accent/40 font-medium px-2 py-0.5 border border-accent/15 rounded">
              Coming Soon
            </span>
          </div>
          <div className="space-y-4">
            {thoughts.map((thought, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-white/5 bg-white/[0.02]"
              >
                <p className="text-sm text-white/30 italic">"{thought}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
