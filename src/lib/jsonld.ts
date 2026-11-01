// Structured data for the site owner. Approved fields only — no phone, no personal
// email. jobTitle/worksFor track the current role (mPokket, Sept 2026 →).
export const PERSON = {
  '@type': 'Person',
  '@id': 'https://swapniltripathi.com/#person',
  name: 'Swapnil Tripathi',
  url: 'https://swapniltripathi.com/',
  jobTitle: 'Tech Lead, Data Platform',
  worksFor: {
    '@type': 'Organization',
    name: 'mPokket',
    url: 'https://www.mpokket.in/',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Technology Bombay',
    sameAs: 'https://www.iitb.ac.in/',
  },
  knowsAbout: [
    'Real-time data systems',
    'Data engineering',
    'Databricks',
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
