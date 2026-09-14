---
name: Friends of Seguin Island
description: A warm, archival lighthouse-keeper's ledger for Maine's Seguin Island Light Station.
colors:
  brand-primary: "#79716B"
  brand-dark: "#171406"
  brand-light: "#FFFFFF"
  neutral-surface-default: "#FFFFFF"
  neutral-surface-lowered: "#F5F5F5"
  neutral-surface-lowest: "#E5E5E5"
  neutral-text-normal: "#171717"
  neutral-text-quiet: "#525252"
  neutral-text-quieter: "#737373"
  neutral-fill-quiet: "#FAFAFA"
  neutral-fill-normal: "#F5F5F5"
  neutral-fill-loud: "#262626"
  neutral-on-loud: "#FAFAFA"
  neutral-border-quiet: "#F5F5F5"
  neutral-border-normal: "#E5E5E5"
  neutral-border-loud: "#D4D4D4"
typography:
  body:
    fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif"
    fontSize: "1rem (fluid step 1)"
    fontWeight: 400
    lineHeight: 1.5
  heading:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontWeight: 500
    lineHeight: 1
  label:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontWeight: 700
    letterSpacing: "0.04ch"
  mono:
    fontFamily: "'Geist Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace"
rounded:
  s: "0.2rem"
  m: "0.75rem"
  l: "2.5rem"
spacing:
  xs: "0.75rem"
  s: "1rem"
  m: "1.5rem"
  m-l: "clamp(1.3125rem, ~, 3rem)"
  l: "2rem"
  xl: "3rem"
  2xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.brand-primary}"
    textColor: "{colors.brand-light}"
    padding: "0.5em 0.75em"
  button-primary-hover:
    backgroundColor: "{colors.brand-primary}"
  button-secondary:
    backgroundColor: "{colors.neutral-fill-loud}"
    textColor: "{colors.neutral-on-loud}"
  card:
    backgroundColor: "{colors.neutral-surface-default}"
    rounded: "7px"
    padding: "1.5rem"
---

# Design System: Friends of Seguin Island

## Overview

**Creative North Star: "The Keeper's Ledger"**

This is the visual language of a lighthouse keeper's logbook, not a marketing site: warm, weathered, and archival. Georgia serif carries the reading voice — history, blog entries, contact details — while a plain grotesque sans (Geist/Inter) handles headings and labels the way a keeper's handwriting on a chart legend would: clear, upright, no ornament. Surfaces stay flat and matte; nothing glows or lifts off the page. The palette is deliberately narrow — a single driftwood-taupe brand color against near-black and near-white — so the one recurring accent reads as considered, not decorative.

The system currently favors restraint over decoration: no shadows, no gradients beyond the hero's readability scrim, and only one true accent color in active use. Where the component library exposes more (accent/success/warning/error/info roles, a fuller radius scale, dark-mode tokens), none of it is wired into the rendered site — treat those as available raw material, not confirmed direction.

**Key Characteristics:**
- Serif body text (Georgia) paired with sans-serif headings/labels (Geist/Inter) — a reading-voice/label-voice split, not a single typeface doing both jobs.
- One brand accent (driftwood taupe) used sparingly for links, headings, primary actions, and hover states — not spread across the page.
- Flat by observation: zero `box-shadow` usage anywhere in the current CSS; depth comes from color contrast and 1px borders only.
- Sharp-cornered buttons against gently rounded cards and inputs — a deliberate material contrast between "action" and "container."
- Fluid, clamp-based type and spacing scales (CUBE CSS methodology: compositions → utilities → blocks) rather than fixed breakpoints.

## Colors

Narrow and warm: one true brand accent, a wide achromatic neutral range for structure, and near-white/near-black for contrast extremes. No secondary or tertiary accent is in active use.

### Primary
- **Driftwood Taupe** (`#79716B`): the system's only accent. Used for heading text, links, the primary button fill, card hover borders, and the header's brand-colored rule. Its restraint is the point — this color marks "the one active thing on the page."

### Neutral
- **Cast Iron** (`#171406`, brand-dark): used only for `::selection` text color — a deliberate, near-black moment rather than a general-purpose ink.
- **Paper White** (`#FFFFFF`, brand-light): base surface color, `::selection` background, default card/surface background.
- **Ink 900** (`#171717`, neutral text normal): primary body text color.
- **Ink 600 / Ink 500** (`#525252` / `#737373`, neutral text quiet/quieter): secondary and tertiary text (footer copy, captions, `<small>`).
- **Fog 50 / Fog 100** (`#FAFAFA` / `#F5F5F5`, neutral fill quiet/normal): subtle background fills; `#F5F5F5` also serves as the "lowered" surface tone.
- **Charcoal 800** (`#262626`, neutral fill loud): the secondary button's dark fill, paired with `#FAFAFA` (neutral-on-loud) text for contrast.
- **Line 200 / Line 300** (`#E5E5E5` / `#D4D4D4`, neutral border normal/loud): dividers, card borders, form-field borders.

### Named Rules
**The Single-Accent Rule.** Driftwood Taupe (`#79716B`) is the only brand color rendered anywhere on the site. Every other color in use is achromatic (white/gray/near-black). Do not introduce a second hue without a confirmed reason — the accent's rarity is what makes it read as intentional.

**The Direct-Palette Exception.** The slider component (`src/styles/blocks/slider.css`) references raw `--color-stone-*` values directly instead of the semantic `--color-*` roles used everywhere else. This is inherited from the starter template and is not currently rendered on any page — don't extend this direct-reference pattern into new work; route new components through the semantic tokens instead.

## Typography

**Body Font:** Georgia (with Cambria, Times New Roman, Times, serif)
**Heading/Label Font:** Geist (with Inter, system sans fallbacks)
**Mono Font:** Geist Mono (with SFMono-Regular, Consolas, monospace) — code/kbd/samp only

**Character:** A working reading/labeling split — serif for anything meant to be *read* (body copy, blog posts, history), sans for anything meant to be *scanned* (headings, nav, buttons, small print like the uppercase button label).

### Hierarchy
- **Display / H1** (sans, fluid step 6, line-height 1.25, max 20ch): page-level headings only; one per page.
- **H2** (sans, fluid step 5, line-height 1.25, max 35ch): major section headings (e.g. "Become a Member", "Read Our Island Blog").
- **H3** (sans, fluid step 4, line-height 1.25, max 35ch): sub-section headings.
- **H4–H6** (sans, fluid step 3, line-height 1.25): minor headings.
- **Body** (serif, fluid step 1, line-height 1.5): default paragraph text; prose blocks cap width at 65–70ch for legibility.
- **Small / Label** (sans, fluid step 0, uppercase where used on buttons, letter-spacing 0.04ch, bold): captions, button labels, the site header/footer's small print.

### Named Rules
**The Two-Voice Rule.** Serif is for reading (body, prose, blog); sans is for everything structural (headings, nav, labels, buttons). Don't mix the two roles — a sans-serif paragraph or a serif button label breaks the pattern.

## Layout

Built on CUBE CSS (Composition → Utility → Block): reusable layout primitives (`cluster`, `flow`, `grid`, `repel`, `sidebar`, `switcher`, `wrapper`) compose with block-level component styles rather than page-specific layout CSS. The `wrapper` composition caps content width at 1550px with a fluid gutter (`--gutter`, bound to the `m-l` fluid space step). Vertical rhythm between elements uses the `flow` composition's `--flow-space` custom property rather than fixed margins, so spacing adapts contextually (e.g. more space is added automatically before a heading than after one).

Both type and spacing scales are fluid (clamp-based, Utopia-style), defined in `src/design-tokens/space.json` and resolved into fluid `--size-step-*` / `--space-*` custom properties — there are no fixed breakpoint overrides observed in the current components; responsiveness comes from the fluid scales and CSS Grid/Flexbox composition behavior (e.g. the header's `repel` layout, the hero's grid stack) rather than media queries.

## Elevation & Depth

Flat by current implementation: no `box-shadow` is used anywhere in the rendered site. Depth and separation come entirely from flat color contrast (e.g. a white card against a tinted `region` background) and 1px borders (`--stroke` / `--stroke-solid`). A fuller shadow/elevation token set exists in `src/design-tokens/elevation.json` and `shadows.json` but is not wired into any component — this reflects the current build, not a confirmed permanent constraint; a later pass may choose to activate elevation for specific components (e.g. a modal or dropdown) without contradicting the system.

## Shapes

Deliberately mixed by role rather than a single global radius:
- **Buttons**: no border-radius — sharp, square corners on every variant.
- **Cards**: 7px radius (`src/styles/blocks/card.css`), not currently drawn from the `--radius-*` scale.
- **Inputs / form fields**: `--radius-s` (0.2rem) — a subtle, almost-square softness.
- **Circular elements** (hero scroll-down icon): full circle (`border-radius: 50%`).
- **Scale in the token system** (`--radius-s` 0.2rem / `--radius-m` 0.75rem / `--radius-l` 2.5rem) exists for future use; only `--radius-s` is currently consumed by rendered components.

Borders are uniformly thin (1px, `--stroke-width`) and either dashed (`--stroke`, decorative dividers) or solid (`--stroke-solid`, functional edges like form-field borders and card outlines).

## Components

**Feel:** Quiet and considered — restrained, editorial detailing. Nothing decorative; confidence comes from consistency and legibility rather than flourish.

### Buttons
- **Shape:** sharp, square corners (no radius) on every variant.
- **Primary:** Driftwood Taupe (`#79716B`) background, white text, uppercase label, bold weight, small text size (fluid step -1), `0.5em 0.75em` padding.
- **Secondary:** Charcoal 800 (`#262626`) background, Fog 50 (`#FAFAFA`) text — used for less-emphasized actions (e.g. "Learn Our History" alongside "Become a Member").
- **Hover:** `filter: brightness(105%)` — a subtle lightening, no color swap, no shadow.
- **Active:** `transform: scale(99%)` — a small tactile press-down.

### Cards
- **Corner Style:** 7px radius.
- **Background:** white (neutral-surface-default).
- **Border:** 1px solid Line 200 (`#E5E5E5`) at rest, shifting to Driftwood Taupe on hover — the accent color used as an interactive-state signal, not a resting-state decoration.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Internal Padding:** 1.5rem.
- **Active:** `transform: scale(99%)` on press, matching the button's tactile feedback.

### Inputs / Fields
- **Style:** white background, 1px solid border, 0.2rem radius, `0.5em 0.8em` padding.
- **Focus:** `outline: 2px solid currentColor` (or a component-scoped `--focus-color`), offset ~0.2lh — a plain, high-contrast focus ring rather than a glow or border-color shift.
- **Placeholder:** Ink 500 (`#737373`).

### Navigation
- **Style:** sans-serif, bold, uppercase-adjacent small text (fluid step 0), letter-spacing 0.04ch. Nav items sit in a `cluster` layout inside a `repel`-based header alongside the brand logo. No visible active/hover treatment beyond the browser default and `aria-current` support — a plain, unstyled state that a future pass could sharpen.
- **Mobile:** relies on the fluid/`repel` layout to reflow; no distinct mobile nav pattern (hamburger, drawer) currently exists in the header component.

### The Masthead (available, not yet placed)
`Masthead.astro` renders a large brand mark (`brand-exploded.svg`) alongside a heading/location/meta line (currently "Friends of Seguin Island" / "Bath, Maine" / "~ Est. 1986 ~"). It exists in the component library but isn't rendered by any current page — treat it as available raw material for a future landing moment, not an established pattern.

## Do's and Don'ts

### Do:
- **Do** keep the serif/sans split intact: serif for body copy and prose, sans for headings, labels, and buttons.
- **Do** treat Driftwood Taupe (`#79716B`) as the only accent color; reach for the neutral scale for everything else.
- **Do** route new component colors through the semantic `--color-*` roles (e.g. `--color-brand-primary`, `--color-fill-loud`) rather than raw palette values.
- **Do** use `--flow-space` / the `flow` composition for vertical rhythm between elements instead of hardcoded margins.

### Don't:
- **Don't** add box-shadows to match a generic "modern SaaS" default — the current system is flat by observation everywhere it's actually rendered; if a future component needs elevation, make that a deliberate, scoped choice rather than a blanket restyle.
- **Don't** reference raw Tailwind-style palette values (e.g. `--color-stone-100`) in new components — that pattern exists only in the unused-on-any-page slider component and shouldn't spread.
- **Don't** round button corners to match card/input rounding — the sharp-vs-rounded contrast between buttons and containers is a deliberate, observed distinction.
- **Don't** treat the accent/success/warning/error/info color roles in `src/design-tokens/colors.json` as confirmed system colors — they're template scaffolding with no current rendered use.
