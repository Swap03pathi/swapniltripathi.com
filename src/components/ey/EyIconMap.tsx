import {
  Briefcase,
  ClipboardList,
  Code2,
  FileSpreadsheet,
  FileText,
  Layers,
  Search,
  Table,
  Video,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export const eyMetaIcons = {
  vba: Table,
  research: Search,
  content: Video,
  data: ClipboardList,
  consulting: Briefcase,
} as const satisfies Record<string, LucideIcon>;

export const eyWorkIcons = {
  code: Code2,
  video: Video,
  automation: Workflow,
  research: Layers,
} as const satisfies Record<string, LucideIcon>;

export const eyVisualIcons = {
  doc: FileText,
  sheet: FileSpreadsheet,
  checklist: ClipboardList,
} as const satisfies Record<string, LucideIcon>;
