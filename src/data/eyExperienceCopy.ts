
export const eyHero = {
  eyebrow: 'EY · Summer Associate · May – Jul 2018',
  title: 'Early Exposure to Operational Consulting & Structured Research',
  description:
    'Worked on educational content operations, structured data collection workflows, and research support during a summer consulting internship on MHRD\'s DIKSHA initiative — the Govt. of India\'s national digital education platform for teachers and students.',
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
    id: 'video-validation',
    number: '1',
    title: 'Video Link Validation Tool',
    icon: 'automation' as const,
    highlight: true,
    bullets: [
      'Asked to help "write a tool" — with no coding background at the time',
      'Learned enough Python in about two weeks to ship a working script',
      "Scanned the platform's video catalogue for broken or blocked YouTube links",
      'Flagged dead links so content teams could queue replacements',
    ],
    tools: ['Python', 'YouTube', 'Self-taught'],
  },
  {
    id: 'content-ops',
    number: '2',
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
    number: '3',
    title: 'Workflow Automation',
    icon: 'automation' as const,
    highlight: false,
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
    number: '4',
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

