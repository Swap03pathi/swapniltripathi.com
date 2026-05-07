import { Link } from 'react-router-dom';
import type { Experience } from '../data';

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link
      to={`/experience/${experience.slug}`}
      className="group block p-6 rounded-lg border border-white/5 bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <img
              src={experience.logoUrl}
              alt={experience.title}
              className="w-5 h-5 rounded-sm opacity-60 group-hover:opacity-100 transition-opacity"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
              {experience.title}
            </h3>
            <span className="text-xs text-white/25">{experience.period}</span>
          </div>
          <p className="text-xs text-white/40 mt-0.5">{experience.role}</p>
          <p className="text-sm text-white/40 mt-3 group-hover:text-white/60 transition-colors">
            {experience.shortDescription}
          </p>
        </div>

        <svg
          className="w-4 h-4 text-white/10 group-hover:text-accent/60 mt-1 transition-colors flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
