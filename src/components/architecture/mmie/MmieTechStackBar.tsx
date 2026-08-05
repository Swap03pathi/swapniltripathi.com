import { m } from 'framer-motion';
import { mmieTechStack } from '../../../data/mmieArchitectureCopy';
import { MmieSectionShell } from './MmiePrimitives';

export function MmieTechStackBar() {
  return (
    <MmieSectionShell number="10" eyebrow="Stack" title="Technology stack" compact>
      <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
        {mmieTechStack.map((t, i) => (
          <m.a
            key={t.name}
            href={t.homepageUrl}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ y: -1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-slate-950/40 px-3 py-1.5 text-sm text-slate-300 shadow-none transition-colors hover:border-cyan-500/15 hover:text-slate-100 md:px-4 md:py-2"
          >
            <img loading="lazy" decoding="async" src={t.logoUrl} alt="" className="h-4 w-4 object-contain opacity-90 md:h-5 md:w-5" />
            <span className="font-medium">{t.name}</span>
          </m.a>
        ))}
      </div>
    </MmieSectionShell>
  );
}
