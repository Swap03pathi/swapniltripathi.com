import { useParams, Link } from 'react-router-dom';
import { experiences } from '../data/experiences';
import ProjectHighlightCard from '../components/ProjectHighlightCard';
import Footer from '../components/Footer';

export default function ExperienceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const experience = experiences.find((e) => e.slug === slug);

  if (!experience) {
    return (
      <div className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Not found</h1>
          <p className="text-sm text-white/40 mb-8">
            This experience doesn't exist.
          </p>
          <Link
            to="/experience"
            className="text-sm text-accent hover:underline"
          >
            Back to experience
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          to="/experience"
          className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors mb-8"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Experience
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-white">{experience.title}</h1>
            <span className="text-xs text-white/25">{experience.period}</span>
          </div>
          <p className="text-sm text-accent/60 mt-1">{experience.role}</p>
          <p className="text-sm text-white/40 mt-4 leading-relaxed">
            {experience.fullDescription}
          </p>
        </div>

        {/* Projects */}
        {experience.projects.length > 0 && (
          <div>
            <h2 className="text-xs font-medium text-accent/60 uppercase tracking-widest mb-6">
              Projects / Systems Built
            </h2>
            <div className="space-y-3">
              {experience.projects.map((project) => (
                <ProjectHighlightCard
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
