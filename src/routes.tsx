import type { ComponentType } from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import { getAllBlogPosts } from './lib/blogPosts';
import { projects } from './data/projects';

// Adapts a default-export page to react-router's lazy() { Component } convention.
const page =
  (loader: () => Promise<{ default: ComponentType }>) =>
  async () => ({ Component: (await loader()).default });

// All entries are real (post-purge), so enumerating them for prerender is safe.
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

      { path: 'blogs', lazy: page(() => import('./pages/BlogsPage')) },
      {
        path: 'blogs/:slug',
        lazy: page(() => import('./pages/BlogPostPage')),
        // Runs at build time in Node; import.meta.glob in blogPosts.ts works there.
        getStaticPaths: () => getAllBlogPosts().map((p) => `blogs/${p.slug}`),
      },

      { path: 'about', lazy: page(() => import('./pages/AboutPage')) },
      { path: 'contact', lazy: page(() => import('./pages/ContactPage')) },
      { path: 'privacy', lazy: page(() => import('./pages/PrivacyPage')) },
      { path: 'me', lazy: page(() => import('./pages/MePage')) },
      // NOTE: /thoughts now 301s to /blogs at the edge (public/_redirects) — no route here.

      // '404' emits a prerendered page Cloudflare serves with a real 404 status;
      // '*' catches bad URLs during client-side navigation.
      { path: '404', lazy: page(() => import('./pages/NotFoundPage')) },
      { path: '*', lazy: page(() => import('./pages/NotFoundPage')) },
    ],
  },
];
