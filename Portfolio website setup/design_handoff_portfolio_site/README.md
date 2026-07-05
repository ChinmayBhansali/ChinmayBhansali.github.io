# Handoff: Personal Portfolio Site ("Quiet Index + Digital Garden")

## Overview
A personal portfolio for an HCI / human-AI interaction researcher (BSc Integrated Sciences, UBC; heading into graduate research). The site presents project case studies, a "digital garden" of notes/essays (with reader comments), an about page, and a CV.

**Core product requirement — modularity:** the owner must be able to add or edit a page by creating/editing a single Markdown file (plus dropping images in a folder), commit, and have GitHub Pages publish it. No hand-editing of HTML per page.

## About the Design Files
The files in this bundle are **design references created in HTML** — an interactive prototype showing intended look and behavior, NOT production code to copy directly:

- `Portfolio 2a.dc.html` — the high-fidelity prototype (open in a browser; `support.js` must sit next to it). All five page types are inside it, navigable via the header.
- `Portfolio Wireframes.dc.html` — earlier explorations, for context only.

Your task is to **recreate this design as a Markdown-driven static site deployed on GitHub Pages**.

### Recommended implementation
No existing codebase — choose the stack. Recommended: **Eleventy (11ty)** with a GitHub Actions deploy to Pages (or Jekyll if zero-Action simplicity is preferred). Requirements:

- Each project = one file in `work/*.md`; each garden note = one file in `garden/*.md`; images per page in a sibling folder (e.g. `work/food-waste/`).
- Frontmatter drives all metadata (see "Content model" below). Index pages, nav dropdowns, and "related notes" lists are **generated from the files** — adding an `.md` file must automatically add it to the Work grid / Garden list / header dropdowns.
- Comments on garden notes via **Giscus** (GitHub Discussions) — free, no backend, works on Pages.
- One shared layout for header/footer; three content layouts: `project`, `note`, `page`.

### Content model (frontmatter)
Project (`work/food-waste.md`):
```yaml
title: Reducing household food waste
summary: A mobile app uniting grocery list, pantry, and recipes…
tag: HCI          # HCI | RESEARCH | CODE …
year: 2025
date: 2025-12-05  # sort order
cover: ./food-waste/cover.png
related: [design-philosophy, conceptual-models]  # garden note slugs
```
Garden note (`garden/design-philosophy.md`):
```yaml
title: my design philosophy
stage: still growing   # seedling | still growing | evergreen
planted: 2026-06
```
Body headings (`##`) in projects should auto-generate the "ON THIS PAGE" sidebar TOC.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and interactions are final intent — recreate faithfully. Copy in the prototype marked "Placeholder…" is to be replaced by the owner's real content.

## Design tokens
- Background: `#f7f4ee` (warm paper)
- Ink (text): `#1c1a17`
- Muted text: `#6b655c` (secondary), `#3a362f` (sidebar links), `#9b948a` (placeholder labels)
- Accent: `#4A6FA5` (ink blue — the owner's chosen default). Alternates explored: `#37715A` moss, `#A85B32` terracotta. Make this a single CSS variable.
- Hairlines/borders: `rgba(28,26,23,0.12)`; hover row background: `rgba(28,26,23,0.045)`
- Dropdown surface: `#fffdf8`, border `rgba(28,26,23,0.15)`, shadow `0 6px 20px rgba(28,26,23,0.1)`
- **Dark mode** (toggled via a small "dark/light" button at the end of the nav; persist choice in `localStorage`, default light): bg `#181613`, ink `#e9e4d8`, muted `#a49c8e`, sidebar links `#c7c0b2`, placeholder labels `#7c7568`, hairlines `rgba(233,228,216,0.14)`, hover bg `rgba(233,228,216,0.06)`, dropdown surface `#221f1b`, accent lightened to `color-mix(in oklab, var(--accent) 62%, #e9e4d8)`. Implement both themes as CSS variable sets.
- Fonts (Google Fonts):
  - **Newsreader** (serif) — everything by default. Site name is 19px semibold italic. Headings weight 500. Garden note titles are *italic*.
  - **Spline Sans Mono** — metadata only: nav links (12.5px, letter-spacing 0.04em), section labels (11–12px, letter-spacing 0.14em, uppercase, accent color), tags/dates (11–12px), footer links, buttons.
- Radii: 4–6px (rows/cards/figures), 5px buttons. No other shadows besides the dropdown.
- Body text: 17.5–18px / line-height 1.7–1.75; `text-wrap: pretty` on prose.

## Screens
All pages share a header: site name (left, italic serif, links home) + mono nav right: `work · garden · about · cv`, hover = 1.5px accent underline. Header has a bottom hairline; padding `clamp(18px,3vw,32px)` vertical, `clamp(20px,5vw,56px)` horizontal; wraps on narrow screens.

**Nav dropdowns:** hovering "work" or "garden" opens a panel below (right-aligned, 10px gap bridged so hover persists): serif 15.5px item links (italic for notes), hover bg `rgba(28,26,23,0.05)`, then a hairline-separated mono footer link "all work →" / "all notes →" to the index page. Clicking the nav label itself also goes to the index page.

1. **Home** (`/`) — single column, max 720px. Intro letter: large serif paragraph `clamp(22px,3.2vw,31px)`, then a muted 17px paragraph with an inline link to the garden. Section label `SELECTED WORK` (mono, accent), then hand-picked project rows: optional 76×52 cover thumbnail, title 21px/500, one-line summary 14.5px muted, right-aligned mono tag (`HCI · 2025`); row hover = soft bg, 6px radius, padding extends 14px beyond the text column (negative margin). Section `FROM THE GARDEN`: one flowing serif paragraph of inline note links separated by `·`. Footer: hairline top, mono links email/github/linkedin, right-aligned "Vancouver, BC → ?".
2. **Work index** (`/work/`) — max 900px. H1 "Work" + one-line muted intro. CSS grid `repeat(auto-fill, minmax(250px, 1fr))`, gap 24px. Card: 16:10 cover, mono tag, title 20px/500, summary 14.5px muted; hover = soft bg over whole card. Generated from `work/*.md` sorted by date.
3. **Project page** (`/work/<slug>/`) — the "garden reveals itself" layout, max 1060px: sticky sidebar (`flex:1 1 200px`, max 260px) + article (`flex:999 1 420px`, max 660px); flex-wrap collapses sidebar above content on narrow screens. Sidebar: mono "← all work", `ON THIS PAGE` anchor TOC (serif 15px), hairline, `RELATED NOTES` (serif italic 15px). Article: mono meta line (`HCI · TEAM OF 4 · SEP–DEC 2025`), H1 `clamp(28px,4.5vw,42px)`/500, 19px muted standfirst, full-width hero figure, `##` sections (24px/500 headings), figures in a wrapping flex row (`flex:1 1 220px`, 4:3), footer hairline + mono "next: <project> →".
4. **Garden index** (`/garden/`) — max 680px. Italic H1 "The garden", muted intro ("Unfinished is allowed here."). List rows: italic serif title 19px/500 left, mono right label `STAGE · DATE` (from frontmatter), hairline separators, hover bg.
5. **Garden note** (`/garden/<slug>/`) — same sidebar+article shell as project pages. Sidebar: "← all notes" + `THE GARDEN` list of all notes (italic serif; current note is plain text, not a link). Article: mono meta `NOTE · PLANTED JUN 2026 · STILL GROWING`, italic H1, 18px prose, **Giscus comment thread** styled to match (label `COMMENTS (GISCUS)`), then mono "linked from:" backlinks footer (computed from which pages link to this note, if feasible; otherwise frontmatter).
6. **About + CV** (`/about/`) — max 720px. 150px square portrait + bio text (wraps under on narrow). Buttons: solid ink "download CV (pdf)" (hover = accent bg) and outlined "email me" (hover = accent border/text), mono 13px, padding 10px 18px. Footer links github/linkedin/google scholar. The `cv` nav item points here (or directly at the PDF — owner's choice).

## Interactions & behavior
- Hover dropdowns as above (in the prototype they're state-driven; CSS `:hover`/`:focus-within` is fine in production — ensure keyboard accessibility).
- All hovers are instant color/bg swaps; no animations required. Smooth scroll for TOC anchors (`scroll-behavior:smooth`, `scroll-margin-top:24px` on sections).
- Navigation resets scroll to top (native page loads handle this).
- Responsive strategy is fluid, no breakpoints except one: below ~760px the project/note sidebar becomes `position:static` and full-width (in production use a media query) — it must NOT stay sticky once it wraps above the article, or it overlaps content while scrolling.
- Otherwise: `clamp()` type/padding, `width:min(100% - clamp(40px,10vw,112px), <max>)` containers, flex-wrap for header/sidebar/rows, auto-fill grid. Preserve this approach.

## Assets
None final. All images in the prototype are dashed-border striped placeholders (covers, figures, portrait) — the owner supplies real images per page folder. Fonts from Google Fonts.

## Files
- `Portfolio 2a.dc.html` + `support.js` — hi-fi interactive prototype (source of truth; inline styles carry exact values)
- `Portfolio Wireframes.dc.html` — exploration history (context only)
