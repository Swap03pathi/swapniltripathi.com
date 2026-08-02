import { sarasSectionNav } from '../../data/sarasExperienceCopy';

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function SarasSectionNav() {
  return (
    <nav
      className="sticky top-14 z-40 border-b border-white/[0.06] bg-dark/85 backdrop-blur-md"
      aria-label="Saras page sections"
    >
      <div className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-5 py-2.5 sm:gap-2 sm:px-6 lg:px-8">
        {sarasSectionNav.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className="shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium text-white/55 transition-colors hover:bg-white/[0.04] hover:text-white/85 sm:text-sm"
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
