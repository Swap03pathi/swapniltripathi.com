// Structured data shared by Home and /about. Approved fields only — no phone,
// no personal email, no GitHub (see WEBSITE_AUDIT_PLAN.md §8 / §12).
export const PERSON = {
  '@type': 'Person',
  '@id': 'https://swapniltripathi.com/#person',
  name: 'Swapnil Tripathi',
  url: 'https://swapniltripathi.com/',
  jobTitle: 'CTO & Co-Founder',
  worksFor: { '@type': 'Organization', name: 'Saras' },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Technology Bombay',
    sameAs: 'https://www.iitb.ac.in/',
  },
  knowsAbout: [
    'Real-time data systems',
    'Data engineering',
    'Redis',
    'MongoDB',
    'AWS',
    'LLM pipelines',
  ],
  sameAs: ['https://www.linkedin.com/in/swapnil-neeraj-tripathi-310019122/'],
  image: 'https://swapniltripathi.com/swapnil-profile.png',
} as const;

export const PROFILE_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: PERSON,
} as const;
