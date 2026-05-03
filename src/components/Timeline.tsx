import { Link } from 'react-router-dom';
import { experiences } from '../data/experiences';

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xs font-medium text-accent/60 uppercase tracking-widest mb-10">
          Timeline
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-0">
            {experiences.map((exp) => (
              <Link
                key={exp.slug}
                to={`/experience/${exp.slug}`}
                className="group relative flex items-start gap-6 py-6 pl-6 hover:pl-8 transition-all"
              >
                {/* Dot on the line */}
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20 group-hover:bg-accent group-hover:shadow-[0_0_8px_rgba(0,212,255,0.4)] transition-all" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors">
                      {exp.title}
                    </h3>
                    <span className="text-xs text-white/25">{exp.period}</span>
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">{exp.role}</p>
                  <p className="text-sm text-white/40 mt-2 group-hover:text-white/60 transition-colors">
                    {exp.shortDescription}
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
