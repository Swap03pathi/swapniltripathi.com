import ExperienceCard from '../components/ExperienceCard';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { experiences } from '../data';

export default function ExperiencePage() {
  return (
    <div className="relative z-10 pt-24 pb-16 px-6">
      <Seo
        title="Experience — Swapnil Tripathi"
        description="Career timeline: Saras (CTO & co-founder), Apple, Testbook, OYO, EY — with the real systems built at each stop."
        path="/experience"
      />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Experience</h1>
        <p className="text-sm text-white/40 mb-10">
          Where I've built, led, and shipped real systems.
        </p>

        <div className="space-y-4">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.slug} experience={exp} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
