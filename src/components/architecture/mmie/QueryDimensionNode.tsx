import { m } from 'framer-motion';
import { MmieGlassPanel } from './MmiePrimitives';

export function QueryDimensionNode({
  label,
  values,
  delay = 0,
}: {
  label: string;
  values: readonly string[];
  delay?: number;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -1 }}
      className="min-w-0"
    >
      <MmieGlassPanel className="flex h-full flex-col p-3 md:p-3.5" glow="subtle">
        <p className="text-sm font-semibold leading-tight text-slate-200 md:text-base">{label}</p>
        <p className="mt-1.5 text-sm leading-snug text-slate-500 line-clamp-3 md:line-clamp-4">{values.join(' · ')}</p>
      </MmieGlassPanel>
    </m.div>
  );
}
