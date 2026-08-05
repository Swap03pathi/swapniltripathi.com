import { resolveAssetUrl } from '../../utils/assetUrl';

const HERO_SCREENSHOTS = {
  left: '/saras/hero/hero-left',
  center: '/saras/hero/hero-center',
  right: '/saras/hero/hero-right',
} as const;

function PhoneFrame({
  src,
  alt,
  className = '',
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      style={delay ? { animationDelay: `${delay}s` } : undefined}
      className={`animate-rise relative w-[140px] shrink-0 rounded-[1.25rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-1.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.75)] sm:w-[156px] ${className}`}
    >
      <div className="aspect-[9/19] overflow-hidden rounded-[1rem] border border-white/[0.06] bg-[#0a0a0a]">
        <img
          src={resolveAssetUrl(`${src}-256.webp`)}
          srcSet={`${resolveAssetUrl(`${src}-256.webp`)} 256w, ${resolveAssetUrl(`${src}-384.webp`)} 384w`}
          sizes="(min-width: 640px) 144px, 128px"
          alt={alt}
          width={256}
          height={570}
          className="h-full w-full object-contain object-top"
          loading="eager"
        />
      </div>
    </div>
  );
}

export default function SarasDeviceMockups() {
  return (
    <div className="relative mx-auto flex min-h-[320px] max-w-lg items-end justify-center lg:mx-0 lg:max-w-none lg:justify-end">
      <PhoneFrame
        src={HERO_SCREENSHOTS.left}
        alt="Saras app — trade feed"
        className="absolute left-0 top-8 z-10 -rotate-6"
        delay={0.1}
      />
      <PhoneFrame
        src={HERO_SCREENSHOTS.center}
        alt="Saras app — home"
        className="relative z-20"
        delay={0.2}
      />
      <PhoneFrame
        src={HERO_SCREENSHOTS.right}
        alt="Saras app — trade details"
        className="absolute right-0 top-4 z-10 rotate-6"
        delay={0.3}
      />
    </div>
  );
}
