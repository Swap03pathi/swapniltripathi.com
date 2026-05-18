import { motion } from 'framer-motion';
import { rrisTechStack } from '../../../data/rrisArchitectureCopy';

export function RrisTechStackBar() {
  return (
    <div className="rounded-2xl border border-slate-800/70 bg-slate-950/35 px-4 py-5 backdrop-blur-md sm:px-6">
      <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        Technology stack
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {rrisTechStack.map((t, i) => (
          <motion.a
            key={t.name}
            href={t.homepageUrl}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -2 }}
            className="flex h-14 w-14 items-center justify-center rounded-lg border border-slate-800/80 bg-slate-950/60 shadow-[0_8px_28px_-18px_rgba(59,130,246,0.2)] transition-colors hover:border-sky-500/25 hover:bg-slate-900/80"
            title={t.name}
          >
            <img
              src={t.logoUrl}
              alt=""
              className={
                'logoClassName' in t && t.logoClassName
                  ? t.logoClassName
                  : 'h-7 w-7 object-contain opacity-90'
              }
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
