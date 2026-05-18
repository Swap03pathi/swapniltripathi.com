# Saras Experience Page — Maintainer Guide

This document explains **what each file does**, **what you should edit**, and **how the pieces connect**. Use it as a map when updating copy, images, links, or layout.

**Live URL:** `/experience/saras`

---

## Quick reference — what to edit

| What you want to change | File | Field / location |
|-------------------------|------|------------------|
| Hero headline, metrics, highlights | `src/data/sarasExperienceCopy.ts` | `sarasHero` |
| Sticky nav section labels | `src/data/sarasExperienceCopy.ts` | `sarasSectionNav` |
| Core system cards + deep-dive routes | `src/data/sarasExperienceCopy.ts` | `sarasCoreSystems` |
| Platform ecosystem bullets + expand text | `src/data/sarasExperienceCopy.ts` | `sarasPlatformCards` |
| Product screenshots | `src/data/sarasExperienceCopy.ts` | `sarasProductSurfaces[].imageUrl` |
| YouTube tutorial URL | `src/data/sarasExperienceCopy.ts` | `sarasTutorialVideoUrl` |
| Platform evolution phases | `src/data/sarasExperienceCopy.ts` | `sarasEvolutionPhases`, `sarasEvolutionConclusion` |
| Press article links | `src/data/sarasExperienceCopy.ts` | `sarasPress[].href` |
| Reliability bullets + incident story | `src/data/sarasExperienceCopy.ts` | `sarasReliabilityLeft`, `sarasIncident` |
| What you owned / collaboration | `src/data/sarasExperienceCopy.ts` | `sarasOwned`, `sarasCollaboration` |
| Section DOM ids (scroll targets) | `src/constants/sarasExperience.ts` | `SARAS_SECTION_IDS` |
| Architecture page URLs | `src/constants/sarasExperience.ts` | `SARAS_SYSTEM_ROUTES` |
| Add/remove page sections | `src/pages/SarasExperiencePage.tsx` | import + `<main>` order |
| Tutorial player UI (size, modal) | `src/components/saras/TutorialVideoPlayer.tsx` | Tailwind classes |

Product screenshots live in **`public/saras/screenshots/`** (served at `/saras/screenshots/...`). Current files:

| File | Source | Surface (display order) |
|------|--------|-------------------------|
| `home.png` | Homepage | Home |
| `trade-feed.png` | Tradepage | Trade |
| `filters.png` | Filter | Filters & Search |
| `trade-detail.png` | Tradedetail | Trade Details |
| `advisor-profile.png` | advisor | Advisor Profile |
| `premium.jpg` | Premium | Premium Signal |

---

## File tree

```
src/
├── App.tsx                          # Routes + scroll-to-top exception for Saras return
├── constants/
│   └── sarasExperience.ts           # Paths + section HTML ids
├── data/
│   └── sarasExperienceCopy.ts       # ★ MOST CONTENT EDITS HERE
├── hooks/
│   └── useSarasScrollRestore.ts     # Scroll back to section after deep-dive
├── utils/
│   ├── sarasScrollRestore.ts        # sessionStorage helpers
│   └── youtubeEmbed.ts              # Parse YouTube URL → video id
├── pages/
│   ├── SarasExperiencePage.tsx      # Assembles all sections
│   └── saras/
│       └── SarasSystemArchitecturePage.tsx  # Wrapper for RRIS/RTE/MMIE canvases
└── components/saras/
    ├── SarasHero.tsx
    ├── SarasCoreSystems.tsx
    ├── SarasPlatformEcosystem.tsx
    ├── PlatformExpandableCard.tsx
    ├── SarasProductSurfaces.tsx
    ├── TutorialVideoPlayer.tsx      # Small preview → click → modal player
    ├── SarasPlatformEvolution.tsx
    ├── SarasReliability.tsx
    ├── SarasPress.tsx
    ├── SarasOwnership.tsx
    ├── SarasSectionNav.tsx
    ├── SarasPrimitives.tsx          # Section shell, cards, backdrop
    └── ...
```

---

## Routing (`src/App.tsx`)

| Path | Component | Purpose |
|------|-----------|---------|
| `/experience/saras` | `SarasExperiencePage` | Main ecosystem overview |
| `/saras/systems/realtime-ingestion` | `SarasSystemArchitecturePage` | RRIS architecture canvas |
| `/saras/systems/realtime-execution` | `SarasSystemArchitecturePage` | RTE architecture canvas |
| `/saras/systems/market-intelligence` | `SarasSystemArchitecturePage` | MMIE architecture canvas |

**Scroll restoration:** When leaving Saras for a system page, the app saves `core-systems` (or another section id). On browser **Back** or **“Saras Experience”** link, `useSarasScrollRestore` scrolls to that section. `ScrollToTop` skips `window.scrollTo(0)` when a return section is pending.

**Links from Experience list / Timeline:** `ExperienceCard.tsx` and `Timeline.tsx` send `saras` slug to `/experience/saras` instead of `/experience/saras` generic detail page.

---

## Constants — `src/constants/sarasExperience.ts`

```ts
export const SARAS_EXPERIENCE_PATH = '/experience/saras';
```

- **`SARAS_EXPERIENCE_PATH`** — Used in back links from architecture pages.

```ts
export const SARAS_SECTION_IDS = {
  hero: 'overview',           // <section id="overview">
  coreSystems: 'core-systems',
  platform: 'platform',
  product: 'product',
  evolution: 'evolution',
  reliability: 'reliability',
  press: 'press',
  ownership: 'ownership',
} as const;
```

- Each value must match the `id` on the corresponding `<section>` (set via `SarasSection`).
- **Do not change** these casually — nav buttons, scroll CTAs, and scroll-restore depend on them.

```ts
export const SARAS_SYSTEM_ROUTES = {
  ingestion: '/saras/systems/realtime-ingestion',
  execution: '/saras/systems/realtime-execution',
  intelligence: '/saras/systems/market-intelligence',
} as const;
```

- Referenced in `sarasCoreSystems[].href` in the copy file.

---

## Copy file — `src/data/sarasExperienceCopy.ts` (line by line)

This is the **single source of truth** for almost all visible text.

### Imports (lines 1–5)

```ts
import { SARAS_SECTION_IDS, SARAS_SYSTEM_ROUTES } from '../constants/sarasExperience';
```

- Pulls section ids and system URLs so you never typo paths in copy.

### `sarasHero` (lines 3–21)

| Field | Meaning |
|-------|---------|
| `label` | Small eyebrow above title (“Saras Experience”) |
| `title` | First line of H1 |
| `titleAccent` | Teal second line of H1 |
| `description` | Paragraph under headline |
| `highlights[]` | Three small stat-style chips; `icon` is `tv` \| `funding` \| `users` (maps to Lucide icons in `SarasHero.tsx`) |
| `metrics[]` | Five numbers in a row; `value` + `label` only |

### `sarasSectionNav` (lines 23–32)

- One entry per sticky nav button: `id` must match `SARAS_SECTION_IDS`, `label` is button text.

### `sarasCoreSystems` (lines 34–65)

Each object is one **flagship card**:

| Field | Meaning |
|-------|---------|
| `number` | “01”, “02”, “03” shown on card |
| `title` | System name |
| `summary` | Short paragraph |
| `challenge` | “Core challenge” line |
| `stack` | Tech pills |
| `flow` | Strings for horizontal mini flow (`SarasMiniFlow`) |
| `href` | Route to architecture deep-dive (from `SARAS_SYSTEM_ROUTES`) |

To add a fourth system: add an object here, add a route in `App.tsx`, and extend `SarasSystemArchitecturePage` meta map.

### `sarasPlatformCards` (lines 67–126)

**Left column** (`left`) and **right column** (`right`).

Each card:

| Field | Meaning |
|-------|---------|
| `id` | React key only |
| `title` | Card heading |
| `items` | Bullet list (strings) |
| `paragraphs` | **Optional.** If present, card is **expandable** (“Explore” / “Close”) via `PlatformExpandableCard` |
| `scrollTo` | **Optional.** If present (e.g. UX card), button scrolls to that section id — no expand |

Cards **with** `paragraphs` today: `delivery`, `operations`, `reliability`.  
Cards **with** `scrollTo`: `ux` → product section.  
Static only: `evolution-card`, `experiments`.

### `sarasProductSurfaces` (lines 128–169)

One entry per phone mockup in the Product section:

| Field | Meaning |
|-------|---------|
| `id` | React key |
| `label` | Title under frame |
| `caption` | Smaller text under label |
| `imageUrl` | **Set this.** Path from site root, e.g. `'/saras/screenshots/feed.png'` → file at `public/saras/screenshots/feed.png`. Empty string = placeholder UI |

### `sarasEvolutionPhases` & `sarasEvolutionConclusion`

Vertical editorial milestones (not a date-based timeline):

| Field | Meaning |
|-------|---------|
| `phase` | Phase number label (e.g. `'01'`) |
| `label` | Short phase name (e.g. `'Early Prototype'`) |
| `title` | Milestone heading |
| `description` | One short paragraph |
| `themes` | Array of chip strings under “Key Themes” |

`sarasEvolutionConclusion` — final reflective card (`title`, `description`).

### `sarasReliabilityLeft` (lines 213–219)

- Array of strings → bullet list in left column of Reliability section.

### `sarasIncident` (lines 221–224)

| Field | Meaning |
|-------|---------|
| `title` | Right card heading |
| `body` | Incident narrative |

### `sarasPress`

| Field | Meaning |
|-------|---------|
| `id` | React key + icon mapping |
| `outlet` | Title on card |
| `type` | Badge: `Feature`, `Video`, `Recognition`, `Social` |
| `href` | External URL; **empty string** = static card (e.g. Shark Tank) |
| `supportLine` | Editorial one-liner under the title |

### `sarasTutorialVideoUrl` (lines 238–242)

```ts
export const sarasTutorialVideoUrl = 'https://youtu.be/5OG9ehGXGNg';
```

- Full YouTube URL or 11-character video id.
- Used by `SarasProductSurfaces` → `getYoutubeVideoId()` → `TutorialVideoPlayer`.

### `sarasOwned` / `sarasCollaboration` (lines 244–261)

- Arrays of strings for the two columns in **What I Owned**.

---

## Page assembly — `src/pages/SarasExperiencePage.tsx`

```tsx
useSarasScrollRestore();  // Runs once on mount / return — restores scroll section
```

Order inside `<main>` controls vertical layout:

1. `SarasHero`
2. `SarasCoreSystems`
3. `SarasPlatformEcosystem`
4. `SarasProductSurfaces`
5. `SarasPlatformEvolution`
6. `SarasReliability`
7. `SarasPress`
8. `SarasOwnership`

To reorder sections: move components here and update `sarasSectionNav` order if needed.

---

## Section wrapper — `SarasPrimitives.tsx`

### `SarasBackdrop`

- Fixed full-screen subtle grid + teal glow (animated opacity). No edit needed unless changing global mood.

### `SarasSection`

Props: `id`, `eyebrow`, `title`, `description`, `children`, `className`.

- Renders `<section id={id}>` — **id must match nav / scroll targets**.
- Wraps children in a fade-in `motion.div` (opacity only, avoids layout overlap bugs).

### `SarasCard`

- Glass-style bordered container used inside sections.

---

## Hero — `SarasHero.tsx`

- Reads `sarasHero` from copy file.
- **CTAs:** “Explore Core Systems” / “Explore Product” call `scrollToSection()` with ids from `SARAS_SECTION_IDS`.
- Right column: `SarasDeviceMockups` (CSS placeholder phones).
- Logo: `public/logos/saras.png` via `resolveAssetUrl`.

---

## Core systems — `SarasCoreSystems.tsx`

For each `sarasCoreSystems` entry:

```tsx
<Link
  to={system.href}
  state={{ scrollSection: SARAS_SECTION_IDS.coreSystems }}
  onClick={() => saveSarasReturnSection(SARAS_SECTION_IDS.coreSystems)}
>
```

- **`onClick`** writes section id to `sessionStorage` (for browser Back).
- **`state`** passes same id for “Saras Experience” link return.
- Entire card is clickable; bottom text: “Open Architecture Deep-Dive →”.

---

## Platform ecosystem — `SarasPlatformEcosystem.tsx`

- Renders two columns from `sarasPlatformCards.left` / `.right`.
- **`PlatformExpandableCard`** if card has `paragraphs`.
- **Button + scroll** if card has `scrollTo`.
- **`StaticPlatformCard`** otherwise.

Expand copy is edited in **`sarasPlatformCards.*.paragraphs`** — not in a separate page.

---

## Product surfaces — `SarasProductSurfaces.tsx`

- Maps `sarasProductSurfaces` → `SurfaceFrame` (image or placeholder).
- **`TutorialVideoPlayer`** when `sarasTutorialVideoUrl` resolves to a valid id.

### Tutorial player — `TutorialVideoPlayer.tsx`

| Behavior | Implementation |
|----------|----------------|
| Default size | `max-w-md`, `max-h-[200px]` preview with YouTube thumbnail |
| Expand | Click preview → full-screen modal with iframe (`autoplay=1`) |
| Close | Click dark **backdrop**, **X** button, or **Escape** |
| Scroll lock | `document.body.style.overflow = 'hidden'` while open |

To make preview smaller/larger: edit `max-w-md` and `max-h-[200px]` on the preview button.  
To make modal wider: edit `max-w-4xl` on the dialog container.

---

## Platform evolution — `SarasPlatformEvolution.tsx`

- Vertical stacked milestone cards from `sarasEvolutionPhases` (left border accent, theme chips).
- Concluding card from `sarasEvolutionConclusion`.

---

## Press — `SarasPress.tsx`

- Responsive grid (1 / 2 / 3 columns); monochrome Lucide icons per outlet.
- Cards with `href` open in a new tab (subtle `ArrowUpRight` on hover).
- `type: 'Recognition'` + empty `href` → static, non-clickable card.

---

## Architecture return — `SarasSystemArchitecturePage.tsx`

Back link:

```tsx
<Link
  to={SARAS_EXPERIENCE_PATH}
  state={{ scrollSection: SARAS_SECTION_IDS.coreSystems }}
  onClick={() => saveSarasReturnSection(SARAS_SECTION_IDS.coreSystems)}
>
```

- Renders existing canvas: `RrisArchitectureCanvas` | `RteArchitectureCanvas` | `MmieArchitectureCanvas`.
- **Does not duplicate** architecture content — only changes back link target and scroll behavior.

---

## Scroll utilities

### `src/utils/sarasScrollRestore.ts`

| Export | Role |
|--------|------|
| `saveSarasReturnSection(id)` | `sessionStorage.setItem` before leaving Saras |
| `readSarasReturnSection()` | Read stored id |
| `clearSarasReturnSection()` | Remove after restore |
| `scrollToSarasSection(id)` | `document.getElementById(id)?.scrollIntoView` |
| `hasPendingSarasScrollRestore(path, state)` | Tells `ScrollToTop` to skip jumping to top |

### `src/hooks/useSarasScrollRestore.ts`

- On `/experience/saras` mount: read `location.state.scrollSection` OR sessionStorage, then scroll and clear storage.

---

## YouTube helper — `src/utils/youtubeEmbed.ts`

```ts
getYoutubeVideoId('https://youtu.be/5OG9ehGXGNg')  // → '5OG9ehGXGNg'
getYoutubeVideoId('https://www.youtube.com/watch?v=5OG9ehGXGNg')  // → same
youtubeEmbedSrc('5OG9ehGXGNg')  // → embed URL for iframe
```

---

## Common tasks

### Add a press outlet

In `sarasPress`, add:

```ts
{ id: 'livemint', outlet: 'LiveMint', type: 'Article', href: 'https://...' },
```

### Add an evolution phase

In `sarasEvolutionPhases`, add an object with `phase`, `label`, `title`, `description`, and `themes`.

### Change core system deep-dive URL

Prefer editing `SARAS_SYSTEM_ROUTES` in constants, then `href` on the system object in copy (or reference the constant only).

### Disable tutorial video

Set `sarasTutorialVideoUrl = ''` — shows placeholder text instead of player.

---

## What not to edit for content

- `src/components/architecture/**` — deep-dive canvases (RRIS, RTE, MMIE); separate case studies.
- `src/pages/saras/SarasPlatformPage.tsx` — unused (platform content is inline collapsible now); safe to delete later.

---

## Local dev

```bash
npm run dev
# Open http://localhost:5173/experience/saras
```

After changing copy in `sarasExperienceCopy.ts`, save — Vite hot-reloads automatically.
