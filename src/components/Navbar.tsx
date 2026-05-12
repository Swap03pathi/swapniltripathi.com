import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToTimeline = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('timeline');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#timeline';
    }
    setMobileOpen(false);
  };

  const navItems = [
    { label: 'Experience', to: '/experience' },
    { label: 'Timeline', action: scrollToTimeline },
    { label: 'Thoughts', disabled: true },
    { label: 'Me', disabled: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-dark/80 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-white font-semibold text-base tracking-tight hover:text-accent transition-colors"
        >
          Swapnil
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.disabled ? (
              <span
                key={item.label}
                className="text-sm text-white/30 cursor-default relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent/50 transition-all group-hover:w-full" />
                <span className="ml-1.5 text-[10px] text-accent/50 font-medium">
                  Soon
                </span>
              </span>
            ) : item.action ? (
              <button
                key={item.label}
                onClick={item.action}
                className="text-sm text-white/60 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent/50 transition-all group-hover:w-full" />
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.to!}
                className="text-sm text-white/60 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent/50 transition-all group-hover:w-full" />
              </Link>
            )
          )}
          <a
            href="mailto:swapniltripathi2905@gmail.com"
            className="ml-2 px-4 py-1.5 text-sm font-medium bg-accent/10 text-accent border border-accent/20 rounded-md hover:bg-accent/20 hover:border-accent/40 transition-all"
          >
            Let's talk
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-md border-b border-white/5 px-6 pb-4">
          {navItems.map((item) =>
            item.disabled ? (
              <div
                key={item.label}
                className="py-2 text-sm text-white/30"
              >
                {item.label}{' '}
                <span className="text-[10px] text-accent/50">Soon</span>
              </div>
            ) : item.action ? (
              <button
                key={item.label}
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
          <a
            href="mailto:swapniltripathi2905@gmail.com"
            className="inline-block mt-2 px-4 py-1.5 text-sm font-medium bg-accent/10 text-accent border border-accent/20 rounded-md"
          >
            Let's talk
          </a>
        </div>
      )}
    </nav>
  );
}
