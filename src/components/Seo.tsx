import { Head } from 'vite-react-ssg';

const SITE = 'https://swapniltripathi.com';
// Dedicated 1200x630 dark share card (public/og-card.png). Pages with their own
// image (blog covers, Finman poster) override via the `image` prop.
const DEFAULT_IMAGE = `${SITE}/og-card.png`;

type SeoProps = {
  title: string;
  description: string;
  /** Route path starting with '/', e.g. '/experience/saras' */
  path: string;
  image?: string;
  /** Thin/utility pages set this until they have real content */
  noindex?: boolean;
  /** Structured data for this page — Person, TechArticle, BreadcrumbList… */
  jsonLd?: object | object[];
  ogType?: 'website' | 'article';
};

/**
 * Per-route head tags. At build time vite-react-ssg bakes these into each page's
 * static HTML — so crawlers, link unfurlers, and AI bots (which run no JS) see real
 * titles, descriptions, OG tags, and JSON-LD. During client-side navigation the same
 * component keeps the tab title in sync.
 */
export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  noindex,
  jsonLd,
  ogType = 'website',
}: SeoProps) {
  const url = `${SITE}${path === '/' ? '/' : path.replace(/\/+$/, '')}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Swapnil Tripathi" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Head>
  );
}
