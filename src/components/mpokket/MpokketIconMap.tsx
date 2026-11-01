import {
  Building2,
  Code2,
  Coins,
  GitBranch,
  HardDrive,
  Layers,
  Mail,
  MapPin,
  TrendingDown,
  Users,
  type LucideIcon,
} from 'lucide-react';

export const mpokketHeroMetaIcons = {
  code: Code2,
  layers: Layers,
  building: Building2,
  pin: MapPin,
} as const satisfies Record<string, LucideIcon>;

export const mpokketHeroMetricIcons = {
  trend: TrendingDown,
  coins: Coins,
  storage: HardDrive,
  users: Users,
} as const satisfies Record<string, LucideIcon>;

export const mpokketSystemIcons = {
  pipeline: GitBranch,
  report: Mail,
  cost: TrendingDown,
  team: Users,
} as const satisfies Record<string, LucideIcon>;
