import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

// Each deploy renames hashed chunks and the host only serves the newest deployment —
// a tab opened before a deploy will fail to lazy-load routes ("Failed to fetch
// dynamically imported module"). Vite fires vite:preloadError for exactly this;
// reloading fetches fresh HTML with the new hashes. Session guard prevents loops.
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    const KEY = 'chunk-reload-at';
    const last = Number(sessionStorage.getItem(KEY) ?? 0);
    if (Date.now() - last > 10_000) {
      sessionStorage.setItem(KEY, String(Date.now()));
      event.preventDefault();
      window.location.reload();
    }
  });
}

// The export MUST be named `createRoot` (vite-react-ssg convention).
export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL });
