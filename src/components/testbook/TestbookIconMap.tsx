import {
  BarChart3,
  Bell,
  Code2,
  Crosshair,
  Database,
  FileInput,
  LineChart,
  Search,
  Target,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export const testbookHeroMetaIcons = {
  chart: BarChart3,
  dashboard: LineChart,
  database: Database,
  firebase: Zap,
  script: Code2,
} as const satisfies Record<string, LucideIcon>;

export const testbookHubIcons = {
  database: Database,
  zap: Zap,
  users: Users,
  file: FileInput,
  chart: BarChart3,
  bell: Bell,
  workflow: Workflow,
  target: Target,
} as const satisfies Record<string, LucideIcon>;

export const testbookWorkflowIcons = {
  collect: Database,
  process: Search,
  analyze: BarChart3,
  alert: Bell,
  act: Target,
} as const satisfies Record<string, LucideIcon>;

export const testbookWorkIcons = {
  chart: BarChart3,
  target: Crosshair,
  code: Code2,
} as const satisfies Record<string, LucideIcon>;
