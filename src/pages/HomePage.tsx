import Hero from '../components/Hero';
import AboutBlurb from '../components/AboutBlurb';
import Timeline from '../components/Timeline';
import ProjectHighlightCard from '../components/ProjectHighlightCard';
import Footer from '../components/Footer';
import { getHighlightedProjects, thoughts } from '../data';

export default function HomePage() {
  // Home highlights are controlled purely by data/sections.ts.
  const highlighted = getHighlightedProjects();

  return (
    <div className="relative z-10">
      <Hero />
      <AboutBlurb />
      <Timeline />

      {/* Project Highlights — 2-column grid; hover scales card slightly */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-xs font-medium uppercase tracking-widest text-accent/60">
            Project Highlights
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {highlighted.map((project) => (
              <ProjectHighlightCard
                key={project.slug}
                project={project}
                variant="featured"
              />
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
