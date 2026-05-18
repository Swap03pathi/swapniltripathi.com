# Saras Experience Design System Audit

**Date:** May 2026  
**Scope:** `/experience/saras`, `/saras/systems/*` (RRIS, RTE, MMIE via `SarasSystemArchitecturePage.tsx`), shared Saras primitives and section components.  
**Method:** Static review of component structure, Tailwind tokens, motion patterns, and layout contracts.  
**Type:** Premium design-system audit (not a bug report). No code was modified to produce this document.

---

## Table of contents

1. [Visual Hierarchy Audit](#1-visual-hierarchy-audit)
2. [Spacing & Layout Rhythm Audit](#2-spacing--layout-rhythm-audit)
3. [Typography Audit](#3-typography-audit)
4. [Component Consistency Audit](#4-component-consistency-audit)
5. [Motion & Interaction Audit](#5-motion--interaction-audit)
6. [Dark Theme Consistency Audit](#6-dark-theme-consistency-audit)
7. [Screenshot & Media Presentation Audit](#7-screenshot--media-presentation-audit)
8. [Responsive & Mobile Audit](#8-responsive--mobile-audit)
9. [Navigation & Flow Audit](#9-navigation--flow-audit)
10. [Final Prioritized Fix List](#10-final-prioritized-fix-list)
11. [Executive Summary](#executive-summary)

---

## Files reviewed

| Area | Primary files |
|------|----------------|
| Page shell | `src/pages/SarasExperiencePage.tsx` |
| Architecture wrapper | `src/pages/saras/SarasSystemArchitecturePage.tsx` |
| Primitives | `src/components/saras/SarasPrimitives.tsx` |
| Sections | `SarasHero.tsx`, `SarasSectionNav.tsx`, `SarasCoreSystems.tsx`, `SarasPlatformEcosystem.tsx`, `SarasProductSurfaces.tsx`, `SarasPlatformEvolution.tsx`, `SarasReliability.tsx`, `SarasPress.tsx`, `SarasOwnership.tsx` |
| Supporting | `PlatformExpandableCard.tsx`, `SarasMiniFlow.tsx`, `SarasDeviceMockups.tsx`, `TutorialVideoPlayer.tsx` |
| Data / constants | `src/data/sarasExperienceCopy.ts`, `src/constants/sarasExperience.ts` |
| Deep-dive canvases | `src/components/architecture/rris/RrisArchitectureCanvas.tsx` (+ RTE, MMIE equivalents) |
| Theme | `tailwind.config.js` (`dark`, `accent`, etc.) |
| Global chrome | `src/components/Navbar.tsx`, `src/components/Footer.tsx` |

---

# 1. Visual Hierarchy Audit

### What works

- **Core Systems** (`SarasCoreSystems.tsx`) is correctly positioned as the technical centerpiece: largest cards, richest content, clear “Open Architecture Deep-Dive →” affordance.
- **Hero** (`SarasHero.tsx`) establishes brand and scope without feeling like a generic startup landing page.
- **Press** (`SarasPress.tsx`) after recent refinement reads as credibility signals rather than a loud media wall.
- **Platform Evolution** (`SarasPlatformEvolution.tsx`) editorial vertical/2-column narrative fits the “maturity journey” brief better than the old horizontal timeline.

### Problems

| Issue | Location | Impact |
|--------|-----------|--------|
| Hero competes with Core Systems for dominance | `SarasHero.tsx`, `SarasDeviceMockups.tsx` | Three tilted phones, chart bars, PWA strip, metrics grid, and three highlight chips create **more visual noise** than the flagship system cards. The eye lands on decoration before engineering depth. |
| Platform Ecosystem feels like a second “main” section | `SarasPlatformEcosystem.tsx` | Six cards (including expandables) with similar weight to Core Systems previews. Reads as **parallel product surface**, not supporting context. |
| Product Surfaces visually loud mid-page | `SarasProductSurfaces.tsx` | Six devices + tutorial block + explicit `border-t` / extra top padding / `z-10` break editorial calm and feel like a **product marketing strip** inserted into a systems narrative. |
| Reliability & Ownership feel under-weighted | `SarasReliability.tsx`, `SarasOwnership.tsx` | After Evolution + Press, these read as **appendix lists**, not credibility anchors. Incident card is strong content with weak presentation. |
| Evolution conclusion card rivals section titles | `SarasPlatformEvolution.tsx` | Conclusion at `lg:text-3xl` competes with `SarasSection` h2 scale — blurs “section vs milestone” hierarchy. |
| Architecture deep-dives are a different product | `SarasSystemArchitecturePage.tsx` + `*ArchitectureCanvas.tsx` | Leaving the experience page feels like switching sites: palette, density, and motion language shift from **editorial black/teal** to **slate/cyan/violet engineering poster**. |

### Eye-flow summary (current scroll order)

1. Hero mockups → metrics → CTAs  
2. Core Systems (intended primary)  
3. Platform grid (unintended competitor)  
4. Product screenshots (high-contrast band)  
5. Evolution / Press (editorial tone recovers)  
6. Reliability / Ownership (visual energy fades)

### Section dominance ranking (approximate visual weight)

| Rank | Section | Weight driver |
|------|---------|----------------|
| 1 | Hero | Full viewport, 3 phones, shadows, metrics |
| 2 | Core Systems | Large linked cards + mini-flow |
| 2 (tie) | Platform Ecosystem | 6 cards, expandables |
| 3 | Product Surfaces | 6 phones + video card + band styling |
| 4 | Evolution | 6 phases + large conclusion |
| 5 | Press | 5 medium cards |
| 6 | Reliability / Ownership | 2-column list cards |

**Verdict:** Hierarchy is *directionally* right (Hero → Core → rest) but **Platform + Product interrupt** the systems story. Core Systems should win by a wider margin than it currently does.

---

# 2. Spacing & Layout Rhythm Audit

### Shared rhythm (good baseline)

`SarasSection` (`SarasPrimitives.tsx`):

- Vertical: `py-16 md:py-20 lg:py-24`
- Container: `max-w-[1200px]`, `px-5 sm:px-6 lg:px-8`
- Content offset: `mt-10 md:mt-12` below section header

This is a solid editorial spine when sections use it without overrides.

### Breaks in rhythm

| Pattern | Where | Problem |
|---------|--------|---------|
| Hero not using `SarasSection` | `SarasHero.tsx` | Own padding (`py-16 lg:py-20`) and `min-h-[calc(100vh-3.5rem)]` — **different vertical cadence** than every other block. |
| Product section override | `SarasProductSurfaces.tsx` | `pt-20 md:pt-24`, `border-t border-white/[0.08]`, `-mt-px`, `z-10`, `bg-dark` — **banding**; reads as patched overlap fix (Platform/Product stacking), not intentional rhythm. |
| Platform reduced bottom padding | `SarasPlatformEcosystem.tsx` | `className` includes `pb-8 md:pb-12` vs default section padding — **tighter handoff** into Product. |
| Card internal padding drift | Multiple | `p-5 md:p-6` (platform), `p-5 md:p-7 lg:p-8` (core), `p-6 md:p-7` (press), `p-6 md:p-8` (reliability/ownership) — **no single card padding scale**. |
| Grid gap inconsistency | Multiple | `gap-4`, `gap-5`, `gap-6`, `gap-8` used without a documented rule. |
| Evolution spacing stack | `SarasPlatformEvolution.tsx` | Grid + conclusion `mt-12 md:mt-14` nested inside `SarasSection`’s already-offset children — spacing is **implicitly compounded**. |
| Top bar + sticky nav | `SarasExperiencePage.tsx`, `SarasSectionNav.tsx` | Extra chrome before hero; `scroll-mt-28` compensates — good technically, adds perceived density at top. |

### Cramped vs stretched

**Cramped**

- Hero metrics: `grid-cols-2` before `lg:grid-cols-5` — five metrics fight for width.
- Product phones: `grid-cols-2` on mobile with ~148px frames.
- Evolution: `md:grid-cols-2` with paragraph + 4 theme pills per cell.

**Stretched**

- Hero: full viewport with sparse right column on tablet breakpoints.
- Reliability: two-column grid where left column is only bullets (imbalanced whitespace).

**Verdict:** Macro rhythm is good; **micro padding/gap tokens are not systematized**. Product section is the largest rhythm offender.

---

# 3. Typography Audit

### Scale (mostly coherent)

| Level | Treatment | Where |
|-------|-----------|--------|
| Page h2 | `text-2xl md:text-3xl lg:text-4xl font-bold` | `SarasSection` |
| Hero h1 | `text-4xl sm:text-5xl lg:text-[3.25rem]` | `SarasHero` |
| Card h3 | Mostly `text-lg font-semibold` | Platform, Press, Reliability, Ownership |
| Core card h3 | `text-xl md:text-2xl font-bold` | `SarasCoreSystems` |
| Body | `text-sm leading-relaxed text-white/45` | Default across sections |
| Eyebrow | `text-xs uppercase tracking-* text-accent/55` | Sections + hero |

### Issues

| Issue | Files | Detail |
|--------|-------|--------|
| Card title scale fragmentation | Core vs Platform vs Press vs Evolution | Same semantic level (card title), **four treatments**. |
| Eyebrow tracking sprawl | Hero, Section, Evolution, Press | Values include `0.14em`, `0.16em`, `0.18em`, `0.2em`, `0.22em` — breaks typographic discipline. |
| Expandable body size jump | `PlatformExpandableCard.tsx` | Closed list `text-sm`; expanded paragraphs `md:text-base` — **density shift on interaction**. |
| Reliability missing description | `SarasReliability.tsx` | Only eyebrow + title — **typographic hole** vs neighbors. |
| Mono accent overuse | `SarasCoreSystems`, `SarasPlatformEvolution` | System numbers + phase labels — fine alone; together adds **UI chrome noise**. |
| Line length on wide grids | Evolution, Press | 2–3 column layouts without per-card `max-w` → **choppy short lines** on large viewports. |
| Conclusion overscale | `SarasPlatformEvolution.tsx` | `lg:text-3xl` on conclusion h3 nears section title prominence. |

### Contrast notes

- `text-white/45` body on `#0B0B0B` is generally readable.
- `text-white/35` captions (product, press support) are acceptable for secondary copy but borderline for long reading.
- Architecture pages use `text-slate-300` / `text-slate-400` — different contrast curve than experience page.

**Verdict:** Headline system is fine; **card-level and eyebrow typography need a tighter scale table** (recommend 3 levels max for titles, 1 eyebrow token).

---

# 4. Component Consistency Audit

### Shared primitives (strength)

- `SarasCard` — `rounded-2xl`, `border-white/[0.07]`, gradient wash, optional hover border
- `SarasPill` — rounded-full chips
- `SarasSection` — unified section header + content wrapper

### Duplicate / divergent systems

| Element | Variants | Files |
|---------|----------|-------|
| **Primary card** | `SarasCard` + `hover` prop | Most sections |
| **Chip / tag** | `SarasPill` vs press type badge vs evolution “Key Themes” label vs mini-flow boxes | Multiple |
| **List markers** | `·` (platform), `—` (owned), `+` (collaboration), accent dot (reliability) | Platform, Ownership, Reliability |
| **CTA patterns** | Filled buttons (hero), text links (core, platform), external links (press) | Hero, Core, Platform, Press |
| **Icon containers** | `rounded-lg` vs `rounded-xl`; `h-10` vs `h-11` | Press, Reliability, Hero |
| **Phone frame** | Hero `aspect-[9/19]` vs Product `aspect-[9/18]`; multiple border radii | `SarasDeviceMockups`, `SarasProductSurfaces` |

### Border radius inventory

| Element | Radius |
|---------|--------|
| `SarasCard` | `rounded-2xl` |
| Hero / section buttons | `rounded-lg` |
| Product phone outer | `rounded-[1.2rem]` |
| Product phone inner | `rounded-[0.95rem]` |
| Hero phone outer | `rounded-[1.25rem]` |
| Hero phone inner | `rounded-[1rem]` |
| Press icon box | `rounded-xl` |
| Pills / badges | `rounded-full` |
| Section nav buttons | `rounded-md` |

### Glassmorphism

- Cards: `bg-white/[0.02]` + `backdrop-blur-sm` — consistent on experience page.
- Press/Evolution hover glows are **shadow-based**, not extra blur — appropriate.
- Architecture canvases use heavier `backdrop-blur-xl` and slate fills — different tier.

**Verdict:** One card primitive exists, but **~4 satellite visual languages** (hero chips, mini-flow, press badges, phone chrome) still operate in parallel.

---

# 5. Motion & Interaction Audit

### Patterns observed

| Pattern | Duration / easing | Where |
|---------|-------------------|--------|
| `whileInView` fade + y | 0.35–0.45s, staggered `delay` | Core, Press, Evolution milestones |
| Section children fade | 0.45s opacity | `SarasSection` wrapper |
| Hover `translate-y` | 200–300ms | Product frames (`-translate-y-1`), Press cards (`-translate-y-0.5`) |
| Hover box-shadow glow | Custom `rgba(0,212,255,*)` | Press, Evolution milestones |
| Hover border only | `transition-colors` | `SarasCard hover` |
| Infinite backdrop pulse | 16s opacity loop | `SarasBackdrop` |
| Expand height | 0.25s `easeInOut` | `PlatformExpandableCard` |
| Modal fade | 0.2–0.22s | `TutorialVideoPlayer`, screenshot lightbox |
| Hero load animation | 0.5–0.55s on mount | `SarasHero`, `SarasDeviceMockups` |

### Problems

1. **Double fade-in:** `SarasSection` fades all children in; many children also use `whileInView` — redundant, slightly mushy on scroll.
2. **Hover vocabulary not unified:** Some cards lift, some only change border, some add glow — users cannot predict clickability from hover alone.
3. **Hero animates on load; screenshots animate on scroll** — inconsistent “first impression” motion policy.
4. **Modal behavior split:** Tutorial stops propagation on dialog inner click; screenshot lightbox closes on any click including image — both valid, but **inconsistent close models**.
5. **Section nav inert:** No active section, no scroll-spy (`SarasSectionNav.tsx`).
6. **Three interaction models in adjacent zones:** Platform scroll-to-section buttons, expandables, external press links.

### Clickable discoverability

| Element | Discoverability |
|---------|-----------------|
| Core system cards | Strong (full card link + CTA text) |
| Press cards (linked) | Good (external arrow, lift) |
| Product screenshots | Good (`cursor-zoom-in`) |
| Platform scroll cards | Moderate (“View product surfaces ↓”) |
| Platform expandables | Good (“Explore” + chevron) |
| Shark Tank press card | Correctly non-clickable |
| Section nav | Weak (no active state) |

**Verdict:** Motion is restrained overall (good for premium tone), but **not governed by a single interaction spec**.

---

# 6. Dark Theme Consistency Audit

### Experience page (`bg-dark` → `#0B0B0B`)

**Aligned**

- Teal `accent` (`#00d4ff`) as primary highlight
- Borders at `white/[0.06]`–`white/[0.08]`
- Card fills at `white/[0.02]`–`white/[0.035]` on hover

**Misaligned**

| Leak | Location |
|------|----------|
| Emerald in backdrop | `SarasBackdrop` second radial gradient `rgba(16, 185, 129, 0.05)` |
| Emerald incident icon | `SarasReliability.tsx` shield container |
| Emerald collaboration marker | `SarasOwnership.tsx` `text-emerald-400/40` |
| Emerald in hero mocks | `SarasDeviceMockups.tsx` card variant bars |
| Emerald placeholder blocks | `SarasProductSurfaces.tsx` empty state |

### System architecture pages

`SarasSystemArchitecturePage.tsx`:

- Background: `bg-[#020617]` (slate navy, not `bg-dark`)
- Body text: `text-slate-300`
- Canvases: `slate-800` borders, `sky`/`cyan`/`violet`/`amber`/`emerald` accents, animated pings, heavier glows

Back link uses experience styling (`text-white/40 hover:text-accent`) — one of few bridges.

### Glow usage spectrum

| Level | Example |
|-------|---------|
| Minimal | `SarasCard hover` border only |
| Subtle | Press/Evolution hover `box-shadow` |
| Medium | Hero phone `shadow-[0_24px_48px...]` |
| Heavy | RRIS/RTE/MMIE diagram nodes, convergence maps |

**Verdict:** Experience page is ~85% cohesive; **emerald secondary accent** and **architecture palette fork** are the main theme breaks.

---

# 7. Screenshot & Media Presentation Audit

### Product screenshots (`SarasProductSurfaces.tsx`)

**Strengths**

- Real assets in `public/saras/screenshots/`
- Lightbox with Escape + click-anywhere close
- Lazy loading
- Phone chrome is restrained (not giant marketing frames)

**Issues**

| Issue | Detail |
|-------|--------|
| Cropping | `object-cover object-top` on thumbnails **crops bottom** of tall mobile UI (tabs, CTAs). |
| Scale | `lg:grid-cols-6` → ~160px-wide frames — **illegible UI detail** despite HD source assets. |
| Caption size | `text-xs` under tiny frames — hard to scan. |
| Mobile affordance | `cursor-zoom-in` has no equivalent hint on touch devices. |
| Aspect inconsistency | Product `9/18` vs hero mock `9/19`. |

### Hero media (`SarasDeviceMockups.tsx`)

- Still **synthetic mock UI** (bars, placeholders), not product screenshots.
- Creates **narrative disconnect** immediately before/above real Product section.
- Chart bars echo removed Reliability graph — **legacy visual language**.

### Tutorial video (`TutorialVideoPlayer.tsx`)

- `max-w-md`, `max-h-[200px]` — appropriately subordinate to screenshots.
- YouTube thumbnail introduces **full-color external imagery** (unavoidable without custom thumb).
- Modal uses scale animation; lightbox uses fade-only — minor inconsistency.

**Verdict:** Product presentation is functional but **scale and cropping work against premium editorial goals**. Hero mocks weaken authenticity.

---

# 8. Responsive & Mobile Audit

### Breakpoint behavior summary

| Section | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero | Stacked; mockups may clip | 12-col grid starts | Side-by-side copy/mockups |
| Core Systems | Stacked card layout | Flow wraps | 5/7 col split |
| Platform | 1 col | 2 col `lg` | 2 col |
| Product | 2 col phones | 3 col `sm` | 6 col `lg` |
| Evolution | 1 col | 2 col `md` | 2 col |
| Press | 1 col | 2 col `sm` | 3 col `lg` |

### Risk register

| Risk | Section | Severity | Detail |
|------|---------|----------|--------|
| Tiny screenshots | Product | **High** | 2 columns of ~148px phones on small phones. |
| Mockup overflow | Hero | **High** | Absolute positioning + rotation (`-rotate-6`, `rotate-6`). |
| Nav discoverability | Section nav | **Medium** | Horizontal scroll, no fade edge cue. |
| Mini-flow height | Core Systems | **Medium** | Wrapped chips create uneven card heights. |
| Evolution density | Evolution | **Medium** | 2-col from `md` may be early for text + pills. |
| Architecture diagrams | System pages | **Medium–High** | Canvases designed for wide layouts; mobile = long scroll. |
| Footer width | Footer | **Low** | `max-w-2xl` vs page `1200px`. |

### `scroll-mt-28`

Used on hero + all `SarasSection` blocks — correctly accounts for fixed navbar (`h-14`) + sticky section nav.

**Verdict:** Text sections survive mobile well; **hero mockups and product grid are the weak points**.

---

# 9. Navigation & Flow Audit

### Section sequence (current)

```
Overview → Core Systems → Platform → Product → Evolution → Reliability → Press → Ownership
```

| Observation | Assessment |
|-------------|------------|
| Core before Platform | Correct for engineering-first story |
| Product before Evolution | Debatable — product proof before maturity narrative |
| Nav label “Impact” vs title “Reliability & Operations Highlights” | **Mismatch** — hurts trust (`sarasSectionNav` / `SarasReliability`) |
| Press after Reliability | Acceptable |
| Ownership last | Correct closing frame |

### Routing & return flow

- `/experience/saras` → `/saras/systems/*` → back restores Core Systems scroll — **well implemented** (`sarasScrollRestore.ts`, `useSarasScrollRestore`, Link `state`).
- Orphan: `SarasPlatformPage.tsx` + `SARAS_PLATFORM_ROUTES` in constants — not wired in `App.tsx`; maintenance hazard only.

### CTA hierarchy

| Priority | CTA | Location |
|----------|-----|----------|
| Primary | “Explore Core Systems →” | Hero |
| Secondary | “Explore Product ↓” | Hero (competes before user reaches Core on scroll) |
| Primary (in-context) | “Open Architecture Deep-Dive →” | Core cards |
| Tertiary | “View product surfaces ↓” | Platform scroll card |
| Tertiary | “Explore” expand | Platform expandable |
| External | Press cards | New tab |

### Section transitions

- Only **Product** uses explicit `border-t` + extra padding — feels like a **chapter break in the wrong place** (mid-page, not before footer).
- No deliberate “quiet” breathing sections between Hero → Core and Platform → Product.

**Verdict:** Flow is logical; **nav labeling, Product banding, and hero secondary CTA** dilute clarity.

---

# 10. Final Prioritized Fix List

## HIGH priority

| # | Component / file | Issue | Why it hurts | Recommended adjustment |
|---|------------------|-------|--------------|------------------------|
| H1 | `SarasProductSurfaces.tsx` | `lg:grid-cols-6` micro-frames + `object-top` crop | Screenshots illegible; undermines product credibility | Cap at 3–4 columns desktop; consider `object-contain` or taller aspect; use `sm:grid-cols-3` baseline |
| H2 | `SarasHero.tsx`, `SarasDeviceMockups.tsx` | Decorative mocks compete with Core Systems | Wrong focal point on first scroll | Replace center phone with one real screenshot **or** simplify to a single static hero visual |
| H3 | `SarasSystemArchitecturePage.tsx` + canvases | `bg-[#020617]` / slate vs `bg-dark` / teal | Jarring context switch | Add Saras bridge strip (dark bar, shared back link, optional 1-line context) before canvas |
| H4 | `SarasProductSurfaces.tsx` | `border-t`, extra `pt-20`, `z-10` band | Breaks editorial rhythm; overlap patch visible | Fix Platform/Product stacking; remove special-case band styling |
| H5 | `sarasExperienceCopy.ts`, `SarasSectionNav.tsx` | Nav “Impact” vs section “Reliability…” | Nav mislabels content | Align label with section title (e.g. “Reliability”) |
| H6 | `SarasPrimitives.tsx` + all cards | Padding + gap token drift | Subconscious “off” feeling | Define 2 densities: `compact` (`p-5 md:p-6`), `feature` (`p-6 md:p-8`); document gap scale (`gap-5` default, `gap-6` feature grids) |

## MEDIUM priority

| # | Component / file | Issue | Why it hurts | Recommended adjustment |
|---|------------------|-------|--------------|------------------------|
| M1 | `SarasPlatformEcosystem.tsx` | Visual weight rivals Core Systems | Platform steals flagship attention | Lighter card titles; none expanded by default; consider 4-up grid |
| M2 | `SarasReliability.tsx` | No section description; sparse left column | Feels unfinished vs Press/Evolution | Add 1-line `description` prop; rebalance columns or elevate incident card |
| M3 | `SarasPlatformEvolution.tsx` | Conclusion `lg:text-3xl` | Competes with section h2 | Cap at `text-2xl`; use padding/width for emphasis |
| M4 | Saras experience components | Emerald accents scattered | Breaks teal-only language on experience page | Map secondary accent to teal `/30` or neutral white; reserve emerald for architecture canvases |
| M5 | `SarasSection.tsx` + children | Double `whileInView` fade | Mushy scroll reveals | Remove wrapper fade **or** child entrance animations — not both |
| M6 | `SarasPress.tsx` vs `SarasCard` | Custom badges + lift vs border-hover | Press feels like different family | Optional `SarasPill` variant for type; unify hover (border-first, lift optional) |
| M7 | `SarasSectionNav.tsx` | No active / scroll-spy state | Disorientation on long page | `IntersectionObserver` + active pill styling |
| M8 | `TutorialVideoPlayer.tsx` vs lightbox | Different close models | Minor cognitive friction | Document as intentional or align backdrop-click behavior |

## LOW priority (polish)

| # | Component / file | Issue | Why it hurts | Recommended adjustment |
|---|------------------|-------|--------------|------------------------|
| L1 | `SarasHero.tsx` | Highlight chips as full `SarasCard` | Heavy for metadata | Inline pills without card chrome |
| L2 | `SarasMiniFlow.tsx` | `→` + boxed steps | Slightly diagrammy | Vertical stack on `sm` breakpoint |
| L3 | Phone chrome | 4+ radius values | Craft polish | Token: outer `1.25rem`, inner `1rem`, aspect `9/19` everywhere |
| L4 | `SarasOwnership.tsx` | Decorative `Users` icon + mixed markers | Infographic tone | Single list marker style (accent dot) |
| L5 | `SarasBackdrop` | 16s opacity pulse | Perpetual motion while reading | Static or near-static backdrop |
| L6 | `Footer.tsx` on Saras routes | `max-w-2xl` vs `1200px` content | End cap feels narrow | Widen footer on experience layout or match grid |
| L7 | `constants/sarasExperience.ts` | Unused `SARAS_PLATFORM_ROUTES` | Maintainer confusion | Remove orphan routes or restore with clear purpose |
| L8 | Eyebrows globally | 5+ tracking values | Typographic noise | Single class: `tracking-[0.2em]` |

---

## Executive Summary

The Saras Experience page has a **credible editorial foundation**: `SarasSection` spacing, dark restraint, Core Systems depth, and refined Press/Evolution sections. The work reads as a serious engineering portfolio, not a startup landing page.

The main threats to a **premium unified product** are:

1. **Competing visual peaks** — Hero decorative mocks, Platform six-card grid, and Product screenshot band fight Core Systems for attention.  
2. **Token drift** — padding, radii, hovers, list markers, and secondary colors (emerald vs teal) signal incremental feature work rather than one design system.  
3. **Experience ↔ architecture fracture** — deep-dive pages use a different background, typography color, and accent spectrum; the handoff feels like leaving the parent experience.  
4. **Product media scale** — HD screenshots presented too small with aggressive top-crop undermines the investment in real assets.

**Recommended strategy:** Refinement, not redesign. Lower Platform/Product visual weight, unify tokens in `SarasPrimitives`, legibility-fix Product grid, bridge architecture pages visually, and align nav copy with section titles.

---

## Appendix: Design tokens (as implemented today)

From `tailwind.config.js`:

```js
dark: '#0B0B0B'
dark-light: '#111111'
dark-lighter: '#1a1a1a'
accent: '#00d4ff'
accent-dim: '#0099cc'
accent-glow: 'rgba(0, 212, 255, 0.15)'
```

Architecture wrapper additionally uses:

- `bg-[#020617]`
- `text-slate-300`
- Slate/sky/cyan/violet/emerald/amber in canvas components

---

## Appendix: Section nav labels vs titles

| Nav label (`sarasSectionNav`) | Section title | Match? |
|------------------------------|---------------|--------|
| Overview | Hero (no h2; brand headline) | OK |
| Core Systems | Core Engineering Systems | OK |
| Platform | Platform Ecosystem | OK |
| Product | Product Surfaces | OK |
| Evolution | How Saras Evolved… | OK |
| **Impact** | **Reliability & Operations Highlights** | **No** |
| Press | Press, Recognition & Community Presence | Partial |
| Ownership | What I Owned | OK |

---

*End of audit. For content editing, see `docs/SARAS_EXPERIENCE_GUIDE.md`. For implementation, start with HIGH items H1–H6 unless product priorities differ.*
