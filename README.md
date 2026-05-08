# swapniltripathi.com

Personal site for Swapnil—a dark, minimal portfolio focused on engineering experience, projects, and narrative. Built with React, TypeScript, Vite, Tailwind CSS, and React Router.

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-yeyxcjbs)

## What it does

- **Landing (`/`)**: Full-screen hero, about copy, clickable career timeline (anchored `id="timeline"`), previews of highlighted projects and quotable thoughts, footer.
- **Experience index (`/experience`)**: Lists all roles from data.
- **Experience detail (`/experience/:slug`)**: Long-form narrative and all projects for the selected experience.
- **Project detail (`/project/:slug`)**: Full project details, related experience, optional GitHub link, and tool links.
- **Placeholders**: `/thoughts` and `/me` render a “Coming Soon” page (reserved for future content).

Navigation scrolls back to home + `#timeline` when “Timeline” is used from non-home routes (via `/ #timeline`).

## Background logic

### Layering (`src/components/BackgroundLayer.tsx`, used from `src/App.tsx`)

- **Viewports wider than 768px**: React tries to load **Stellarium Web Engine** (`src/components/RealSkyBackground.tsx`): the official global is `window.StelWebEngine` (some samples call it `StellariumWebEngine`; the loader tries both).
- **Narrow screens (≤768px)** or **if the WASM bundle is missing / init fails**: falls back to the lightweight **canvas starfield** below.

### Starfield fallback (`src/components/StarField.tsx`)

- Fixed full-screen `<canvas>` with `pointer-events-none` so clicks pass through to content.
- Twinkling drifting stars via `requestAnimationFrame` (same behavior as before).

### Stellarium bundle (`public/stellarium/`)

- **`stellarium-web-engine.js`** and **`stellarium-web-engine.wasm`** must be copied from upstream `make js` build output (they are **not** on npm — see `public/stellarium/README.md`).
- **`static/`** (Roboto fonts, demo assets) is already committed and matches upstream `apps/simple-html/static`.
- Optional env: **`VITE_STELLARIUM_SKYDATA_BASE_URLS`** — comma-separated URL prefixes hosting the same catalog layout as upstream `test-skydata/` (large; usually self-hosted). Without it, WASM may run with an empty sky until you add data URLs.
- Optional dev env: **`VITE_STELLARIUM_DEBUG_PICK=1`** — experimental click → `pickObject` / console logging.

**AGPL:** the Stellarium Web Engine is AGPL-licensed — respect terms if you redistribute engine builds or covered assets.

## Tech stack

| Layer | Choice |
| --- | --- |
| UI | React 18, TypeScript |
| Build | Vite 5, `@vitejs/plugin-react` |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer |
| Routing | React Router 7 |

**Dependencies in `package.json` used in source today:** React, React DOM, React Router.

**Listed but unused in `/src` (likely template or future hooks):** `@supabase/supabase-js`, `lucide-react` (Lucide icons are not imported anywhere yet; Vite still excludes `lucide-react` from pre-bundling in case you add icons later).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint on the repo |
| `npm run typecheck` | TypeScript check (`tsconfig.app.json`, no emit) |

## Repository file reference

Each path below describes what that file exists for.

### Root

| File | Purpose |
| --- | --- |
| `README.md` | Project overview, routing summary, npm scripts, and this file inventory. |
| `package.json` | Package metadata, dependencies, devDependencies, and npm script definitions. |
| `package-lock.json` | Locked dependency tree so installs are repeatable across machines and CI. |
| `index.html` | Minimal HTML shell: document title (“Swapnil — Systems Builder”), viewport, OG/Twitter image meta tags, `<div id="root">`, and the entry `<script>` for `/src/main.tsx`. Default favicon path is `/vite.svg` (ensure that asset exists under `public/` if you want the icon locally). |
| `vite.config.ts` | Vite configuration: enables the React plugin; `optimizeDeps.exclude` omits `lucide-react` from pre-bundling. |
| `tsconfig.json` | TypeScript solution-style root: references `tsconfig.app.json` (app code) and `tsconfig.node.json` (tooling). |
| `tsconfig.app.json` | Compiler options for application code under `src/` (strict checks, JSX, DOM libs, bundler resolution, no emit). |
| `tsconfig.node.json` | Compiler options scoped to Node/tooling files (here: `vite.config.ts`). |
| `tailwind.config.js` | Tailwind setup: scans `index.html` and `src/**/*` for classes; defines custom palette (`dark`, `accent`, etc.), Inter as default sans stack, and shared keyframe animations (`fade-in`, `fade-in-up`, `slide-in`). |
| `postcss.config.js` | Runs Tailwind and Autoprefixer in the CSS pipeline (used when Vite processes `src/index.css`). |
| `eslint.config.js` | Flat ESLint config: recommended JS + TypeScript rules, browser globals, React Hooks and React Refresh plugins; ignores `dist/`. |
| `.gitignore` | Excludes logs, `node_modules`, build output, editor folders, `.env`, and related artifacts from version control. |

### Bolt / StackBlitz scaffolding

| File | Purpose |
| --- | --- |
| `.bolt/config.json` | Records the Bolt.new template identifier (`bolt-vite-react-ts`) for “Open in Bolt” parity. |
| `.bolt/prompt` | Stored instructions for AI-assisted scaffolding in Bolt (design polish, JSX + Tailwind + Lucide conventions). |

### `src/` — Application entry and global styles

| File | Purpose |
| --- | --- |
| `src/main.tsx` | Application bootstrap: creates the React root on `#root`, wraps `<App />` in `StrictMode`, imports global CSS. |
| `src/App.tsx` | Defines `BrowserRouter`, route table, global layout (`StarField`, `Navbar`, dark background shell), and a `ScrollToTop` helper that resets scroll position on pathname changes. |
| `src/index.css` | Global stylesheet: Google Fonts link for Inter, Tailwind layers, CSS reset-ish box sizing, smooth scrolling, base body typography/colors, text selection tint, scrollbar styling. |
| `src/vite-env.d.ts` | Triple-slash reference pulling in Vite’s client-side type definitions (`import.meta` etc.). |

### `src/data/`

| File | Purpose |
| --- | --- |
| `src/data/types.ts` | Shared TypeScript models for all content entities (`Experience`, `Project`, `Tool`, `SocialLink`). |
| `src/data/experiences.ts` | Experience/company timeline data only (role details, logo, and project slug references). |
| `src/data/projects.ts` | Full project content (summary + long description + tools + optional GitHub URL). |
| `src/data/sections.ts` | Home page section content (`thoughts`) and `highlightedProjectSlugs` list that controls which projects are shown in “Project Highlights”. |
| `src/data/socials.ts` | Footer social links and icon choices. |
| `src/data/index.ts` | Data barrel + helpers (`getProjectBySlug`, `getExperienceForProject`, `getProjectsForExperience`, `getHighlightedProjects`) so components never need to hardcode joins. |

### `src/pages/`

| File | Purpose |
| --- | --- |
| `src/pages/HomePage.tsx` | Home route: composes hero, about, timeline, and highlighted projects resolved via `getHighlightedProjects()`, plus thoughts and footer. |
| `src/pages/ExperiencePage.tsx` | Lists every experience as cards linking to detail routes. |
| `src/pages/ExperienceDetailPage.tsx` | Reads `slug` from URL; resolves matching experience and always renders all related projects via `getProjectsForExperience()`. |
| `src/pages/ProjectPage.tsx` | Reads project slug from URL and renders full project details with related experience context + tool links. |
| `src/pages/ComingSoonPage.tsx` | Generic placeholder layout for unfinished sections (used for Thoughts and Me). |

### `src/components/`

| File | Purpose |
| --- | --- |
| `src/components/Navbar.tsx` | Fixed top navigation: branding link, Experience link, Timeline scroll/jump handler, disabled “Thoughts”/“Me” with “Soon” labels, mail CTA (`hello@swapnil.dev`), responsive hamburger drawer. |
| `src/components/BackgroundLayer.tsx` | Chooses Stellarium (desktop) vs `StarField` fallback (mobile or failed WASM). |
| `src/components/RealSkyBackground.tsx` | Dynamically loads `/stellarium/*.js` + WASM, quiet UI, Bangalore observer defaults, optional sky-data URLs and dev pick debug. |
| `src/components/StarField.tsx` | Full-viewport `<canvas>` fallback stars (`requestAnimationFrame`, `pointer-events-none`). |
| `src/components/Hero.tsx` | Above-the-fold headline tagline (systems builder), subtitle, credential line, primary mail CTA, staggered Tailwind animations. |
| `src/components/AboutBlurb.tsx` | Narrative “About” section introducing background and interests. |
| `src/components/Timeline.tsx` | Vertical timeline keyed off `experiences`: each row links to `/experience/:slug`; section `id="timeline"` for navbar anchor scrolling. |
| `src/components/ExperienceCard.tsx` | Reusable bordered card linking to one experience detail; shows title, period, role, short description. |
| `src/components/ProjectHighlightCard.tsx` | Reusable linked card for project previews (used in home highlights and experience detail project lists). |
| `src/components/Footer.tsx` | Closing CTA, social links (from `src/data/socials.ts`), and dynamic copyright year. |
