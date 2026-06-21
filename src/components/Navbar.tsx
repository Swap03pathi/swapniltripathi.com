import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { WHATSAPP_URL } from '../constants/contact';
import SiteLogo from './SiteLogo';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToTimeline = () => {
    if (location.pathname === '/') {
      document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#timeline';
    }
    setMobileOpen(false);
  };

  const navItems: {
    label: string;
    to?: string;
    action?: () => void;
    disabled?: boolean;
  }[] = [
    { label: 'Experience', to: '/experience' },
    { label: 'Timeline', action: scrollToTimeline },
    { label: 'Me', to: '/me' },
  ];

  const ctaClass =
    'rounded-md border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent transition-all hover:border-accent/40 hover:bg-accent/20';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="group flex items-center gap-2.5 rounded-md py-1 pr-1 transition-opacity hover:opacity-90"
        >
          <SiteLogo className="h-8 w-8 sm:h-[30px] sm:w-[30px]" />
          <span className="text-sm font-medium tracking-tight text-white/45 transition-colors group-hover:text-white/70">
            Home
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) =>
            item.disabled ? (
              <span key={item.label} className="text-sm text-white/30">
                {item.label}
                <span className="ml-1.5 text-[10px] font-medium text-accent/50">Soon</span>
              </span>
            ) : item.action ? (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="group relative text-sm text-white/60 transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent/50 transition-all group-hover:w-full" />
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.to!}
                className="group relative text-sm text-white/60 transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent/50 transition-all group-hover:w-full" />
              </Link>
            )
          )}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`ml-2 ${ctaClass}`}>
            Let&apos;s Talk
          </a>
        </div>

        <button
          type="button"
          className="text-white/60 hover:text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {mobileOpen ? (
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <>
                <path d="M3 5H17" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-b border-white/5 bg-dark/95 px-6 pb-4 backdrop-blur-md md:hidden">
          {navItems.map((item) =>
            item.disabled ? (
              <div key={item.label} className="py-2 text-sm text-white/30">
                {item.label} <span className="text-[10px] text-accent/50">Soon</span>
              </div>
            ) : item.action ? (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="block py-2 text-sm text-white/60 hover:text-white"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.to!}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-white/60 hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-block ${ctaClass}`}>
            Let&apos;s Talk
          </a>
        </div>
      ) : null}
    </nav>
  );
}
