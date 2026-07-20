import type { Experience } from './types';

// Chronological work history used across timeline + experience pages.
// Keep this file focused on company/role data only.
export const experiences: Experience[] = [
  {
    slug: 'saras',
    title: 'Saras',
    role: 'CTO, Co-Founder',
    period: 'Sept 2024 — Present',
    shortDescription:
    'Built a signal intelligence platform that captures, parses, and virtually executes trading recommendations across multiple sources. 150K+ downloads, 200K+ daily messages received, 98% uptime.',
    fullDescription:
    'Saras (formerly Finosauras) is a signal intelligence platform designed to capture trading recommendations from multiple unstructured sources and convert them into structured, trackable, and virtually executed trades.\n\nAs CTO and Co-Founder, I built the system from scratch — covering ingestion, processing, execution, and infrastructure — with a focus on reliability, speed, and cost efficiency.\n\nThe platform ingests signals from Telegram, PDFs, news articles, YouTube live streams, and Twitter, normalizes them using LLM-based parsing, and executes them virtually using real-time price feeds. Trades remain active until exit conditions such as target, stoploss, expiry, or time-based rules are met.\n\nWe launched the platform within 3 months and scaled to over 150,000 downloads, receiving 200K+ messages daily while maintaining 98% uptime.\n\nThe company raised a $500K+ pre-seed led by Antler. Separately, Saras was featured on Shark Tank India.',
    logoUrl: '/logos/saras.png',
    projectSlugs: [
      'signal-ingestion-system',
      'realtime-recommendation-ingestion-system',
      'multidimensional-market-intelligence-engine',
      'signal-processing-pipeline',
      'real-time-virtual-execution-system',
      'analytics-aggregation-system',
      'backend-infrastructure',
      'admin-platform',
    ],
  },
  {
    slug: 'apple',
    title: 'Apple',
    role: 'Data Engineer → Data Scientist',
    period: 'Jan 2022 — July 2024',
    shortDescription:
      'Worked across Data Engineering and Data Science, building systems that handled production-scale data workflows.',
    fullDescription:
      'Started in Data Engineering building robust pipeline infrastructure, then transitioned to Data Science where I developed analytical systems and models. Worked on systems that needed to be reliable at Apple scale — handling massive data volumes with strict correctness requirements.',
    logoUrl: 'https://cdn.simpleicons.org/apple/ffffff',
    projectSlugs: [],
  },
  {
    slug: 'testbook',
    title: 'Testbook',
    role: 'Analyst',
    period: 'Aug 2020 — Jan 2022',
    shortDescription:
      'Data analysis and building internal tools to support product decisions at scale.',
    fullDescription:
      'Worked as an analyst building data-driven tools and reports that directly influenced product strategy. Developed internal systems that automated reporting and provided actionable insights for the team.',
    logoUrl: '/logos/testbook.png',
    projectSlugs: [],
  },
  {
    slug: 'oyo',
    title: 'OYO',
    role: 'Summer Analyst',
    period: 'Jun 2019 — Jul 2019',
    shortDescription:
    'Built data scraping and analysis systems to improve OTA rankings and pricing strategy across 2500+ listings.',
    fullDescription:
    'As a Summer Analyst in Global OTA Operations at OYO, I worked on improving search ranking and pricing strategy across online travel platforms.\n\nI built a Python-based scraping system to collect data from multiple Online Travel Agents and used statistical modeling to understand factors affecting hotel ranking.\n\nThe analysis was used to identify opportunities for improving customer experience and retention, with proposed strategies expected to increase online reviews by ~12%.\n\nI also designed dashboards to monitor performance across 2500+ properties and analyzed discounting strategies across platforms to maintain pricing consistency.\n\nThis was my first exposure to real-world data problems, combining scraping, analysis, and business decision-making.',
    logoUrl: 'https://cdn.simpleicons.org/OYO/EE2E24',
    projectSlugs: [ 'oyo-data-scraping',
      'oyo-ranking-analysis'],
  },
  {
    slug: 'ey',
    title: 'EY',
    role: 'Summer Associate',
    period: 'May 2018 — Jul 2018',
    shortDescription:
    'Built my first working system without prior coding experience as part of a national-scale education platform initiative.',
    fullDescription:
    'As a Summer Associate in Business Advisory Services at EY, I worked on an MHRD initiative to build a national platform for teachers and students.\n\nDuring this project, I was asked to build a system without having prior coding experience. Instead of declining, I learned the required concepts on the fly and delivered a working solution.\n\nI built an automated system to detect broken or blocked YouTube videos in the platform’s content repository and trigger replacement workflows. This was my first end-to-end system built under real constraints.\n\nBeyond this, I worked on assembling and structuring educational content across multiple states, collaborated with large instructor networks for content tagging, and built tools to collect structured feedback from educators.\n\nThis experience shaped my approach to problem solving — focusing on figuring things out under uncertainty rather than relying on prior knowledge.',
    logoUrl: '/logos/ey.png',
    projectSlugs: [
      'ey-video-validation-system',
      'ey-content-platform-ops',
    ],
  },
];
