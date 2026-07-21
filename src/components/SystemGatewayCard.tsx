import { Link } from 'react-router-dom';

export default function SystemGatewayCard({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  return (
    <Link
      to={href}
      className="group block h-full rounded-lg border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 ease-out hover:border-accent/20 hover:bg-white/[0.04] hover:shadow-[0_12px_36px_-18px_rgba(0,212,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/40"
    >
      <div className="flex h-full min-h-[120px] flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[10px] font-medium uppercase tracking-wider text-accent/75">{label}</span>
          <svg
            className="h-4 w-4 shrink-0 text-white/10 transition-colors group-hover:text-accent/55"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <h3 className="mt-3 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-white/60 transition-colors group-hover:text-white/75">
          {description}
        </p>
      </div>
    </Link>
  );
}
