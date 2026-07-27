
export const eyHero = {
  eyebrow: 'EY Internship Experience',
  title: 'Early Exposure to Operational Consulting & Structured Research',
  description:
    'Worked on educational content operations, structured data collection workflows, and research support initiatives during a summer consulting internship supporting large-scale educational and ecosystem programs.',
  metadata: [
    { label: 'VBA', icon: 'vba' as const },
    { label: 'Research', icon: 'research' as const },
    { label: 'Content Operations', icon: 'content' as const },
    { label: 'Data Collection', icon: 'data' as const },
    { label: 'Consulting', icon: 'consulting' as const },
  ],
};

export const eyWorkAreas = [
  {
    id: 'content-ops',
    number: '1',
    title: 'Educational Content Operations',
    icon: 'video' as const,
    highlight: false,
    bullets: [
      'Assembled catalogue of 700+ educational videos',
      'Worked with digital and teacher-created content',
      'Supported content organization across multiple states',
      'Coordinated tagging workflows with large instructor groups',
      'Assisted SEO-oriented content classification',
    ],
    tools: ['Google Sheets', 'Content Operations', 'SEO Tagging'],
  },
  {
    id: 'automation',
    number: '2',
    title: 'Workflow Automation',
    icon: 'automation' as const,
    highlight: true,
    bullets: [
      'Built VBA-based questionnaire workflows',
      'Automated structured data collection processes',
      'Supported instructor information gathering across multiple states',
      'Reduced manual operational effort through lightweight automation',
    ],
    tools: ['VBA', 'Excel', 'Structured Data Collection'],
  },
  {
    id: 'research',
    number: '3',
    title: 'Research & Ecosystem Analysis',
    icon: 'research' as const,
    highlight: false,
    bullets: [
      'Evaluated startup ecosystem opportunities in Gurgaon',
      'Supported research workflows for mentoring and funding programs',
      'Assisted structured operational analysis and reporting',
    ],
    tools: ['Research', 'Ecosystem Analysis', 'Reporting'],
  },
] as const;

export const eyClosing =
  'This internship introduced me to structured operational workflows, large-scale coordination, and early automation-driven problem solving within consulting environments.';

