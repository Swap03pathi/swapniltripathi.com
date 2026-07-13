import { Head } from 'vite-react-ssg';

const SITE = 'https://swapniltripathi.com';
// TODO: replace with a dedicated 1200x630 og-card.png (<300KB) — see WEBSITE_AUDIT_PLAN.md §6.5
const DEFAULT_IMAGE = `${SITE}/swapnil-profile.png`;

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
