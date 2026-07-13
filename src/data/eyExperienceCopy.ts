export const eyHero = {
  eyebrow: 'EY Internship Experience',
  title: 'Early Exposure to Operational Consulting & Structured Research',
  role: 'Summer Associate · May — Jul 2018',
  description:
    'Worked on educational content operations, structured data collection workflows, and research support during a summer consulting internship on an MHRD (Govt. of India) initiative to build a national education platform for teachers and students.',
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
    title: 'Video Validation — My First Working System',
    icon: 'code' as const,
    highlight: true,
    bullets: [
      'A senior official asked me to "write code" — without checking that I had never coded before',
      'Pre-AI era: asked multiple people what to learn, then taught myself',
      'Shipped a working Python tool in ~1–2 weeks',
      'Detected broken & blocked YouTube videos across the national content repository',
      'Triggered replacement workflows for flagged videos',
    ],
    tools: ['Python', 'Video Validation', 'Self-Taught'],
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
