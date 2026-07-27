import { Link } from 'react-router-dom';
import { resolveAssetUrl } from '../utils/assetUrl';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-24 md:py-0">
      <div className="flex w-full max-w-4xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-14 md:text-left">
        <div
          className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border border-white/10 shadow-[0_0_48px_rgba(0,212,255,0.12)] ring-4 ring-accent/15 animate-fade-in sm:h-44 sm:w-44"
          style={{ animationDelay: '0.05s' }}
        >
          <img
            src={resolveAssetUrl('/swapnil-profile-sm.jpg')}
            alt="Swapnil Tripathi"
            width={300}
            height={400}
            className="h-full w-full min-h-full min-w-full object-cover object-[50%_18%]"
            {...{ fetchpriority: 'high' }}
          />
        </div>

        <div className="w-full min-w-0 max-w-2xl flex-1 text-center md:text-left">
          <h1
            className="animate-fade-in text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ animationDelay: '0.1s' }}
          >
            Building operational systems
            <br />
            <span className="text-accent">across data, infrastructure, and realtime platforms.</span>
          </h1>

          <p
            className="animate-fade-in-up mt-6 text-base leading-relaxed text-white/50 sm:text-lg"
            style={{ animationDelay: '0.3s' }}
          >
            Focused on building reliable systems across realtime ingestion, analytics
            infrastructure, automation workflows, and production-scale data operations.
          </p>

          <p
            className="animate-fade-in-up mt-3 text-xs tracking-wide text-white/50"
            style={{ animationDelay: '0.5s' }}
          >
            CTO @ Saras &bull; Apple &bull; IIT Bombay
          </p>

          <div
            className="animate-fade-in-up mt-10"
            style={{ animationDelay: '0.7s' }}
          >
            <Link
              to="/contact"
              className="inline-block rounded-md border border-accent/20 bg-accent/10 px-6 py-2.5 text-sm font-medium text-accent transition-all hover:border-accent/40 hover:bg-accent/20 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
