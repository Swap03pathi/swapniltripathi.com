import { motion } from 'framer-motion';
import { resolveAssetUrl } from '../../utils/assetUrl';

const HERO_SCREENSHOTS = {
  left: '/saras/hero/hero-left.jpg',
  center: '/saras/hero/hero-center.jpg',
  right: '/saras/hero/hero-right.jpg',
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`relative w-[140px] shrink-0 rounded-[1.25rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-1.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.75)] sm:w-[156px] ${className}`}
    >
      <div className="aspect-[9/19] overflow-hidden rounded-[1rem] border border-white/[0.06] bg-[#0a0a0a]">
        <img
          src={resolveAssetUrl(src)}
          alt={alt}
          className="h-full w-full object-contain object-top"
          loading="eager"
        />
      </div>
    </motion.div>
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
