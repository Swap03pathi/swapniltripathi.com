import { Link } from 'react-router-dom';

/**
 * Friendly fallback for route-level errors (most commonly a stale tab requesting a
 * chunk from a previous deployment). The vite:preloadError handler in main.tsx
 * auto-reloads for that case; this screen covers anything that slips through.
 */
export default function RouteErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-6 text-white">
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-white/40">Something went off-script</p>
        <h1 className="mt-3 text-2xl font-semibold">This page hit an error</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/50">
          Usually this just means the site was updated while this tab was open — a refresh
          fixes it.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-md border border-accent/20 bg-accent/10 px-5 py-2 text-sm font-medium text-accent transition-all hover:border-accent/40 hover:bg-accent/20"
          >
            Refresh
          </button>
          <Link to="/" className="text-sm text-white/50 underline hover:text-white">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
