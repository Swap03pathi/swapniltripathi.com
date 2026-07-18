import { Suspense, lazy, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ClientOnly } from 'vite-react-ssg';
import Navbar from './components/Navbar';
import { hasPendingSarasScrollRestore } from './utils/sarasScrollRestore';

// Lazy import keeps the sky-engine module graph (window/document/WASM access) out of the
// Node build entirely; ClientOnly keeps it out of the server-rendered tree.
const BackgroundLayer = lazy(() => import('./components/BackgroundLayer'));

/**
 * Replaces the old ScrollToTop. If the URL has a #hash, scroll to that element once the
 * lazy route has painted — this also makes the navbar's "Timeline" link work as a
 * client-side navigation from any page.
 */
function ScrollHandler() {
  const { pathname, hash, state } = useLocation();
  useEffect(() => {
    if (hasPendingSarasScrollRestore(pathname, state)) return;
    if (hash) {
      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else if (tries++ < 20) requestAnimationFrame(tryScroll); // wait for the lazy chunk
      };
      requestAnimationFrame(tryScroll);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, state]);
  return null;
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <ClientOnly>
        {() => (
          <Suspense fallback={null}>
            <BackgroundLayer />
          </Suspense>
        )}
      </ClientOnly>
      <Navbar />
      <ScrollHandler />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}
