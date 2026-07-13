export const oyoHero = {
  eyebrow: 'OYO Internship Experience',
  title: 'Discovering Analytics Through Experimentation',
  role: 'Summer Analyst · Jun — Jul 2019',
  description:
    'Worked on exploratory data analysis and web scraping experiments during an early internship experience in the travel-tech space, which later shaped my interest in analytics engineering and data systems.',
  techPills: [
    { label: 'SQL', icon: 'sql' as const },
    { label: 'PostgreSQL', icon: 'postgres' as const },
    { label: 'Web Scraping', icon: 'scrape' as const },
    { label: 'Statistics', icon: 'stats' as const },
    { label: 'Google Sheets', icon: 'sheets' as const },
  ],
};

export const oyoExplorationCards = [
  {
    id: 'ranking',
    number: '1',
    title: 'Ranking Analysis Experiment',
    icon: 'search' as const,
    bullets: [
      'Scraped Booking.com search pages and listing data',
      'Collected property metadata and listing attributes',
      'Explored correlations between property features and ranking visibility',
      'Performed statistical analysis using Google Sheets',
      'Worked with p-values, coefficients, and correlations',
    ],
    note: {
      icon: 'info' as const,
      text: 'The experiment did not lead to meaningful conclusions but became an important learning experience in exploratory analytics workflows.',
    },
  },
  {
    id: 'sql',
    number: '2',
    title: 'SQL & Data Foundations',
    icon: 'database' as const,
    bullets: [
      'Self-learned SQL during the internship',
      'Practiced queries on PostgreSQL datasets',
      'Explored relational data structures and querying patterns',
      'Built early data analysis workflows',
      'Developed foundational analytical thinking',
    ],
    note: {
      icon: 'star' as const,
      text: 'This experience later helped me transition into analytics-focused roles.',
    },
  },
] as const;

export const oyoClosing =
  'This internship introduced me to analytical thinking, exploratory experimentation, and working with data beyond spreadsheets for the first time.';
