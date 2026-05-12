import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Bell,
  Cpu,
  Database,
  HardDrive,
  History,
  Layers,
  LineChart,
  Radio,
  RefreshCw,
  Server,
  Shield,
  Timer,
  Waves,
  Zap,
} from 'lucide-react';

const map = {
  activity: Activity,
  database: Database,
  radio: Radio,
  cpu: Cpu,
  'hard-drive': HardDrive,
  shield: Shield,
  timer: Timer,
  'refresh-cw': RefreshCw,
  layers: Layers,
  bell: Bell,
  waves: Waves,
  server: Server,
  zap: Zap,
  'line-chart': LineChart,
  history: History,
} as const satisfies Record<string, LucideIcon>;

export type RteIconName = keyof typeof map;

export function RteIcon({
  name,
  className,
}: {
  name: RteIconName;
  className?: string;
}) {
  const C = map[name];
  return <C className={className} aria-hidden />;
}
