import { m } from 'framer-motion';
import { mmiePhilosophyBody, mmiePhilosophySub } from '../../../data/mmieArchitectureCopy';

/** Cinematic breakthrough — dominant type, restrained cyan frame */
export function PhilosophySection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-cyan-500/12 bg-[#020617]/95 px-5 py-12 shadow-[0_0_0_1px_rgba(34,211,238,0.04)] backdrop-blur-md sm:px-8 sm:py-14 md:px-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(34,211,238,0.06),transparent)]" />
      <m.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <p className="text-center font-mono text-sm text-cyan-500/35 md:text-base">
          <span className="mr-2">08</span>
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.22em] text-slate-500">
            Engineering philosophy
          </span>
        </p>
        <h2 className="mt-8 text-center text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          Filter first.
          <br />
          Hydrate last.
        </h2>
        <p className="mt-8 text-center text-xl font-semibold tracking-tight text-cyan-200/90 sm:text-2xl md:text-3xl">
          {mmiePhilosophySub}
        </p>
        <div className="mx-auto mt-10 max-w-sm rounded-lg border border-cyan-500/10 bg-gradient-to-b from-cyan-500/[0.05] to-transparent p-4 md:max-w-md md:p-5">
          <p className="text-center text-xs font-medium uppercase tracking-wider text-slate-600">Narrowing</p>
          <p className="mt-2 text-center text-sm text-slate-400">Millions of IDs</p>
          <m.div
            className="mx-auto my-2 h-8 w-px bg-gradient-to-b from-cyan-500/25 to-violet-500/15"
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <p className="text-center text-sm font-semibold text-cyan-100/85">Top-N IDs → hydrated objects</p>
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-400 md:text-base">
          {mmiePhilosophyBody}
        </p>
      </m.div>
    </section>
  );
}
