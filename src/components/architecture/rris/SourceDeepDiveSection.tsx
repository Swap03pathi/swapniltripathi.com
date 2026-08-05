import { m } from 'framer-motion';
import { RrisSectionShell } from './RrisPrimitives';
import { RrisIcon } from './RrisIcons';
import type { RrisIconName } from './RrisIcons';

type SourceId = 'telegram' | 'pdf' | 'youtube' | 'twitter' | 'news' | 'perplexity';

const sources: {
  id: SourceId;
  label: string;
  icon: RrisIconName;
  bullets: string[];
}[] = [
  {
    id: 'telegram',
    label: 'Telegram',
    icon: 'telegram',
    bullets: [
      'Telethon listener',
      'Realtime message capture',
      'Celery-backed queues',
      'Dedup + burst filtering',
      'High-volume noise gates',
    ],
  },
  {
    id: 'pdf',
    label: 'PDF Reports',
    icon: 'file-text',
    bullets: [
      'S3 ingestion',
      'Scheduled cron processing',
      'Table extraction pipeline',
      'OCR normalization',
    ],
  },
  {
    id: 'youtube',
    label: 'YouTube Live',
    icon: 'youtube',
    bullets: [
      'Livestream monitoring',
      'OpenCV frame capture',
      '4 fps OCR sampling',
      'Duplicate suppression',
      'Realtime stream constraints',
    ],
  },
  {
    id: 'twitter',
    label: 'X',
    icon: 'x',
    bullets: [
      'API polling',
      'Keyword + handle tracking',
      'Advisor channel watchlists',
    ],
  },
  {
    id: 'news',
    label: 'News APIs',
    icon: 'newspaper',
    bullets: [
      'Provider ingestion',
      'Entity extraction',
      'Recommendation / sentiment parse',
    ],
  },
  {
    id: 'perplexity',
    label: 'Perplexity',
    icon: 'sparkles',
    bullets: [
      'Web intelligence augmentation',
      'Bounded discovery pulls',
      'Rate-aware search workflows',
    ],
  },
];

export function SourceDeepDiveSection() {
  return (
    <RrisSectionShell eyebrow="Ingestion" title="Source deep dive">
      <div className="-mx-1 flex gap-3 overflow-x-auto pb-2 pt-1 sm:mx-0 sm:flex-wrap sm:overflow-visible">
        {sources.map((s, i) => (
          <m.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -2 }}
            className="min-w-[158px] max-w-[200px] shrink-0 rounded-xl border border-slate-800/90 bg-slate-950/50 p-3.5 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.75)] backdrop-blur-sm sm:min-w-0 sm:max-w-none sm:flex-1"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 text-violet-200/90">
                  <RrisIcon name={s.icon} className="h-4 w-4" />
                </span>
                <span className="truncate text-[11px] font-semibold text-slate-200">{s.label}</span>
              </div>
              <RrisIcon name="chevron-right" className="h-3.5 w-3.5 shrink-0 text-slate-600" />
            </div>
            <ul className="mt-2.5 space-y-1.5">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-[10px] leading-snug text-slate-500">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-slate-600" />
                  {b}
                </li>
              ))}
            </ul>
          </m.div>
        ))}
      </div>
    </RrisSectionShell>
  );
}
