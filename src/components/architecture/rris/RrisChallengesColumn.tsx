import { motion } from 'framer-motion';
import { Activity, Cpu, Layers, ShieldAlert, Timer, type LucideIcon } from 'lucide-react';
import { rrisArchitectureChallengesDetailed } from '../../../data/rrisArchitectureCopy';

const iconMap: Record<(typeof rrisArchitectureChallengesDetailed)[number]['icon'], LucideIcon> = {
  activity: Activity,
  layers: Layers,
  cpu: Cpu,
  'shield-alert': ShieldAlert,
  timer: Timer,
};

export function RrisChallengesColumn() {
  return (
    <ul className="space-y-3">
      {rrisArchitectureChallengesDetailed.map((c, i) => {
        const Icon = iconMap[c.icon];
        return (
          <motion.li
            key={c.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ x: 2 }}
            className="flex gap-3 rounded-xl border border-slate-800/80 bg-slate-950/40 px-4 py-3.5 backdrop-blur-sm"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/60 text-violet-200/85">
              <Icon className="h-4 w-4" strokeWidth={1.35} />
            </span>
            <p className="text-[13px] leading-relaxed text-slate-400">{c.title}</p>
          </motion.li>
        );
      })}
    </ul>
  );
}
