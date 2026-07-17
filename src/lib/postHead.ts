import { useEffect } from 'react';
import type { BlogPost } from './blogPosts';

const SITE = 'https://swapniltripathi.com';

// FAQ structured data for posts that answer common questions (wins People-Also-Ask /
// AI-overview slots). Answers are faithful summaries of the post content.
const FAQ_BY_SLUG: Record<string, { q: string; a: string }[]> = {
  'malware-in-git-hooks': [
    {
      q: 'Is a take-home coding assignment from a recruiter safe to run?',
      a: 'Treat every take-home as untrusted code. Do not git clone, npm install, or git checkout it on your real machine before inspecting it — malware can hide in git hooks and install scripts, and following the setup instructions can be the exploit itself.',
    },
    {
      q: 'Can git checkout run malware?',
      a: 'Yes. Git hooks such as post-checkout and pre-commit run automatically when you use normal git commands. A ZIP that ships a full .git folder can smuggle live hooks onto your machine — git deliberately does not transmit hooks over a normal clone, which is why attackers deliver assignments as ZIP files instead of repo links.',
    },
    {
      q: 'How do I check a suspicious coding assignment without running it?',
      a: 'Inspect it read-only: look inside .git/hooks/ for anything that is not a *.sample file, use npm install --ignore-scripts inside a throwaway VM if you must install, and verify recruiters through the company’s real domain. The free open-source interview-assignment-scanner automates these checks without ever executing the code.',
    },
  ],
};

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Client-side head metadata for blog posts (title, description, canonical, OG, JSON-LD).
 * Note: JS-injected tags are read by Google but not by social unfurlers — full build-time
 * meta ships with the prerendering work on feat/audit-overhaul.
 */
export function usePostHead(post: BlogPost | undefined): void {
  useEffect(() => {
    if (!post) {
      document.title = 'Post not found — Swapnil Tripathi';
      return;
    }
    const url = post.canonical ?? `${SITE}/blogs/${post.slug}`;
    const image = post.cover ? `${SITE}${post.cover}` : `${SITE}/swapnil-profile.png`;

    document.title = `${post.title} — Swapnil Tripathi`;
    setMeta('name', 'description', post.description);
    setMeta('property', 'og:title', post.title);
    setMeta('property', 'og:description', post.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:type', 'article');
    setMeta('name', 'twitter:title', post.title);
    setMeta('name', 'twitter:description', post.description);
    setMeta('name', 'twitter:image', image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    const jsonLd: object[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        ...(post.updated ? { dateModified: post.updated } : {}),
        author: { '@type': 'Person', name: 'Swapnil Tripathi', url: `${SITE}/` },
        image,
        mainEntityOfPage: url,
      },
    ];
    const faq = FAQ_BY_SLUG[post.slug];
    if (faq) {
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      });
    }
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-post-jsonld', post.slug);
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [post]);
}
