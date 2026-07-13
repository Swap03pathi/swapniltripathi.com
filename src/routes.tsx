import type { ComponentType } from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import { getAllPosts } from './lib/posts';
import { projects } from './data/projects';

// Adapts a default-export page to react-router's lazy() { Component } convention.
const page =
  (loader: () => Promise<{ default: ComponentType }>) =>
  async () => ({ Component: (await loader()).default });

// After the integrity purge every remaining project entry is real, so enumerating is safe.
const projectPaths = projects.map((p) => `project/${p.slug}`);
const architecturePaths = [
  'project/real-time-virtual-execution-system/architecture',
  'project/realtime-recommendation-ingestion-system/architecture',
  'project/multidimensional-market-intelligence-engine/architecture',
];

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, lazy: page(() => import('./pages/HomePage')) },
      { path: 'experience', lazy: page(() => import('./pages/ExperiencePage')) },
      { path: 'experience/saras', lazy: page(() => import('./pages/SarasExperiencePage')) },
      { path: 'experience/apple', lazy: page(() => import('./pages/AppleExperiencePage')) },
      { path: 'experience/testbook', lazy: page(() => import('./pages/TestbookExperiencePage')) },
      { path: 'experience/oyo', lazy: page(() => import('./pages/OyoExperiencePage')) },
      { path: 'experience/ey', lazy: page(() => import('./pages/EyExperiencePage')) },

      {
        path: 'saras/systems/:system',
        lazy: page(() => import('./pages/saras/SarasSystemArchitectureRoute')),
        getStaticPaths: () => [
          'saras/systems/realtime-ingestion',
          'saras/systems/realtime-execution',
          'saras/systems/market-intelligence',
        ],
      },
      {
        path: 'project/:slug',
        lazy: page(() => import('./pages/ProjectPage')),
        getStaticPaths: () => projectPaths,
      },
      {
        path: 'project/:slug/architecture',
        lazy: page(() => import('./pages/ProjectArchitecturePage')),
        getStaticPaths: () => architecturePaths,
      },

      { path: 'thoughts', lazy: page(() => import('./pages/ThoughtsPage')) },
      {
        path: 'thoughts/:slug',
        lazy: page(() => import('./pages/ThoughtPostPage')),
        // Runs at build time in Node; import.meta.glob in posts.ts works there.
        getStaticPaths: () => getAllPosts().map((p) => `thoughts/${p.slug}`),
      },

      { path: 'about', lazy: page(() => import('./pages/AboutPage')) },
      { path: 'contact', lazy: page(() => import('./pages/ContactPage')) },
      { path: 'privacy', lazy: page(() => import('./pages/PrivacyPage')) },
      { path: 'me', lazy: page(() => import('./pages/MePage')) },

      // '404' emits a prerendered page the host serves with a real 404 status;
      // '*' catches bad URLs during client-side navigation.
      { path: '404', lazy: page(() => import('./pages/NotFoundPage')) },
      { path: '*', lazy: page(() => import('./pages/NotFoundPage')) },
    ],
  },
];
