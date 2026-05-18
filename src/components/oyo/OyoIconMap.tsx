import {
  Code2,
  Database,
  Globe,
  Info,
  Lightbulb,
  Search,
  Sigma,
  Sparkles,
  Table,
  type LucideIcon,
} from 'lucide-react';

export const oyoPillIcons = {
  sql: Code2,
  postgres: Database,
  scrape: Globe,
  stats: Sigma,
  sheets: Table,
} as const satisfies Record<string, LucideIcon>;

export const oyoCardIcons = {
  search: Search,
  database: Database,
} as const satisfies Record<string, LucideIcon>;

export const oyoNoteIcons = {
  info: Info,
  star: Sparkles,
} as const satisfies Record<string, LucideIcon>;

export const oyoSectionIcons = {
  exploration: Lightbulb,
} as const satisfies Record<string, LucideIcon>;
