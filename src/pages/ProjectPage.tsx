import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug, getExperienceForProject } from '../data';
import Footer from '../components/Footer';
import ProjectPageBackNav from '../components/ProjectPageBackNav';
import { resolveAssetUrl } from '../utils/assetUrl';
import { RTE_PROJECT_SLUG } from '../constants/realTimeVirtualExecution';
import { RRIS_PROJECT_SLUG } from '../constants/realtimeRecommendationIngestion';
import { MMIE_PROJECT_SLUG } from '../constants/multidimensionalMarketIntelligence';
import RealTimeVirtualExecutionSections from '../components/project/RealTimeVirtualExecutionSections';
import RealtimeRecommendationIngestionSections from '../components/project/RealtimeRecommendationIngestionSections';
import MultidimensionalMarketIntelligenceSections from '../components/project/MultidimensionalMarketIntelligenceSections';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug ?? '');
  const experience = project ? getExperienceForProject(project) : undefined;

  if (!project) {
    return (
      <div className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Not found</h1>
          <p className="text-sm text-white/40 mb-8">
            This project doesn't exist.
          </p>
          <Link to="/" className="text-sm text-accent hover:underline">
            Back home
          </Link>
        </div>
      </div>
    );
  }

  const isRte = project.slug === RTE_PROJECT_SLUG;
  const isRris = project.slug === RRIS_PROJECT_SLUG;
  const isMmie = project.slug === MMIE_PROJECT_SLUG;
  const wideLayout = isRte || isRris || isMmie;

  return (
    <div className="relative z-10 pt-24 pb-16 px-6">
      <div className={`mx-auto ${wideLayout ? 'max-w-4xl' : 'max-w-2xl'}`}>
        <ProjectPageBackNav project={project} />

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:flex-wrap sm:gap-3">
            <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            <span className="text-xs text-white/25">{project.period}</span>
          </div>
          {isRte ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/40">
              Persistent low-latency trade state tracking for a trading signal
              intelligence platform.
            </p>
          ) : null}
          {isRris ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/40">
              Convergent multi-source ingestion with AI orchestration and
              human-in-the-loop verification before execution-ready trade state.
            </p>
          ) : null}
          {isMmie ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/40">
              Redis-orchestrated multidimensional filtering and ranking under continuously mutating live market
              state — ID-first execution, not dashboard analytics.
            </p>
          ) : null}

          {/* Company logo + link */}
          {experience && (
            <Link
              to={`/experience/${experience.slug}`}
              className="inline-flex items-center gap-2 mt-4 group"
            >
              <img
                src={resolveAssetUrl(experience.logoUrl)}
                alt={experience.title}
                className="w-5 h-5 rounded-sm opacity-60 group-hover:opacity-100 transition-opacity"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-sm text-white/40 group-hover:text-accent transition-colors">
                {experience.title}
              </span>
              <span className="text-xs text-white/20 group-hover:text-accent/60 transition-colors">
                — {experience.role}
              </span>
            </Link>
          )}
        </div>

        <div className="mb-12 space-y-4">
          {isRte || isRris || isMmie ? (
            project.description.split('\n\n').map((para) => (
              <p
                key={para.slice(0, 48)}
                className="text-sm text-white/50 leading-relaxed"
              >
                {para}
              </p>
            ))
          ) : (
            <p className="text-sm text-white/50 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        {isRte ? (
          <div className="mb-16">
            <RealTimeVirtualExecutionSections />
          </div>
        ) : null}

        {isRris ? (
          <div className="mb-16">
            <RealtimeRecommendationIngestionSections />
          </div>
        ) : null}

        {isMmie ? (
          <div className="mb-16">
            <MultidimensionalMarketIntelligenceSections />
          </div>
        ) : null}

        {/* GitHub link */}
        {project.githubUrl && (
          <div className="mb-12">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/[0.03] text-white/60 border border-white/10 rounded-md hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>
        )}

        {/* Tools & Technologies */}
        {project.tools.length > 0 && (
          <div>
            <h2 className="text-xs font-medium text-accent/60 uppercase tracking-widest mb-6">
              Tools & Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="group relative inline-flex flex-col items-center pb-3"
                >
                  <a
                    href={tool.homepageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-white/5 bg-white/[0.02] transition-all hover:border-accent/20 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/40"
                    aria-label={`${tool.name} — open homepage`}
                  >
                    <img
                      src={tool.logoUrl}
                      alt=""
                      className={`object-contain opacity-50 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 ${tool.logoImgClassName ?? 'h-6 w-6'}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </a>
                  <div
                    className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 flex -translate-x-1/2 translate-y-1 scale-95 items-center gap-2 whitespace-nowrap rounded-md border border-white/5 bg-dark px-3 py-2 opacity-0 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.06] transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
                  >
                    <img
                      src={tool.logoUrl}
                      alt=""
                      className="h-4 w-4 object-contain opacity-80"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="text-xs text-white/40 group-hover:text-white/70">
                      {tool.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
