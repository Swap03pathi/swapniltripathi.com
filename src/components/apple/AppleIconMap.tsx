import {
  Activity,
  BarChart3,
  Building2,
  Code2,
  GitBranch,
  Layers,
  MessageSquare,
  Radio,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export const appleHeroMetaIcons = {
  code: Code2,
  chart: BarChart3,
  building: Building2,
  radio: Radio,
} as const satisfies Record<string, LucideIcon>;

export const appleHeroMetricIcons = {
  pipeline: GitBranch,
  posts: MessageSquare,
  stack: Layers,
  workflow: Workflow,
} as const satisfies Record<string, LucideIcon>;

export const appleSystemIcons = {
  pipeline: GitBranch,
  alert: Activity,
  classify: BarChart3,
} as const satisfies Record<string, LucideIcon>;
