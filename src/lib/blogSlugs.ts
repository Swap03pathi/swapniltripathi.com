// Blog slug list for route prerendering — deliberately WITHOUT the post bodies.
// routes.tsx is part of the client entry chunk served on every page, so it must
// never import blogPosts.ts: that module's eager `?raw` glob inlines the full
// markdown of every post into whatever chunk imports it.
//
// getStaticPaths only runs inside vite-react-ssg's Node build (routesToPaths),
// never in the browser, so the slugs are populated only in the SSR bundle.
// `import.meta.env.SSR` is statically replaced per build, letting Rollup drop
// the glob (and its per-file import thunks) from the client bundle entirely —
// in the browser this is just an empty array. Do not read it from client code.
//
// The glob pattern must stay identical to the one in blogPosts.ts so the slug
// set can never drift from the posts that actually render.
export const blogSlugs: string[] = import.meta.env.SSR
  ? Object.keys(
      import.meta.glob('../content/blogs/*.{md,mdx}', { query: '?raw', import: 'default' }),
    ).map((path) => path.split('/').pop()!.replace(/\.(md|mdx)$/, ''))
  : [];
