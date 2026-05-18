import type { Tool } from '../../data/types';

export default function AppleTechLogoGrid({ tools }: { tools: readonly Tool[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 md:gap-4">
      {tools.map((tool) => (
        <a
          key={tool.name}
          href={tool.homepageUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={tool.name}
          className="group flex flex-col items-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-4 transition-colors hover:border-accent/20 hover:bg-white/[0.04]"
        >
          <span className="flex h-12 w-12 items-center justify-center">
            <img
              src={tool.logoUrl}
              alt=""
              className={`object-contain opacity-70 transition-opacity group-hover:opacity-100 ${
                tool.logoImgClassName ?? 'h-8 w-8'
              }`}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </span>
          <span className="mt-2 text-center text-[11px] leading-tight text-white/40 transition-colors group-hover:text-white/60">
            {tool.name}
          </span>
        </a>
      ))}
    </div>
  );
}
