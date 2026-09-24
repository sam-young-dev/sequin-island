---
name: Friends of Seguin Island
description: Granite, fog, and keeper's brick. A plain, welcoming site for a volunteer-kept Maine light station.
colors:
  granite-gray: "#79716b"
  keeper-brick: "#8a4a3c"
  keeper-brick-deep: "#733b2f"
  seguin-navy: "#153453"
  fog: "#d6e2e8"
  keeper-black: "#171406"
  charcoal: "#262626"
  ink: "#171717"
  ink-quiet: "#525252"
  station-stone: "#292524"
  hairline: "#e5e5e5"
  tinted-surface: "#f5f5f5"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Public Sans Variable, Public Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 1.70rem + 2.73vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Public Sans Variable, Public Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.57rem + 0.91vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
  title:
    fontFamily: "Public Sans Variable, Public Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 1.36rem + 0.68vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.15
  body:
    fontFamily: "Source Serif 4 Variable, Source Serif 4, Georgia, Cambria, Times New Roman, Times, serif"
    fontSize: "clamp(1rem, 0.95rem + 0.23vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.5
  body-prose:
    fontFamily: "Source Serif 4 Variable, Source Serif 4, Georgia, Cambria, Times New Roman, Times, serif"
    fontSize: "clamp(1rem, 0.95rem + 0.23vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Source Serif 4 Variable, Source Serif 4, Georgia, Cambria, Times New Roman, Times, serif"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "0.05rem"
  nav:
    fontFamily: "Public Sans Variable, Public Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(0.95rem, 0.93rem + 0.09vw, 1rem)"
    fontWeight: 600
  map-label:
    fontFamily: "Public Sans Variable, Public Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(0.95rem, 0.93rem + 0.09vw, 1rem)"
    fontWeight: 700
rounded:
  none: "0"
  input: "0.2rem"
  card: "7px"
  pill: "999px"
spacing:
  3xs: "0.25rem"
  2xs: "clamp(0.4375rem, 0.41rem + 0.11vw, 0.5rem)"
  xs: "clamp(0.6875rem, 0.66rem + 0.11vw, 0.75rem)"
  sm: "clamp(0.875rem, 0.83rem + 0.23vw, 1rem)"
  md: "clamp(1.3125rem, 1.24rem + 0.34vw, 1.5rem)"
  lg: "clamp(1.75rem, 1.66rem + 0.45vw, 2rem)"
  xl: "clamp(2.625rem, 2.49rem + 0.68vw, 3rem)"
  2xl: "clamp(3.5rem, 3.32rem + 0.91vw, 4rem)"
  3xl: "clamp(5.25rem, 4.98rem + 1.36vw, 6rem)"
components:
  button-primary:
    backgroundColor: "{colors.granite-gray}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.85em 1.15em"
  button-secondary:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.85em 1.15em"
  button-support:
    backgroundColor: "{colors.keeper-brick}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.85em 1.15em"
  button-support-hover:
    backgroundColor: "{colors.keeper-brick-deep}"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "1.5rem"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-quiet}"
    rounded: "{rounded.input}"
    padding: "0.5em 0.8em"
  closer:
    backgroundColor: "{colors.granite-gray}"
    textColor: "{colors.white}"
  map-stage:
    backgroundColor: "{colors.fog}"
    rounded: "{rounded.card}"
  map-label:
    backgroundColor: "{colors.white}"
    textColor: "{colors.station-stone}"
    typography: "{typography.map-label}"
    rounded: "{rounded.pill}"
    padding: "0.3em 0.6em"
  map-label-selected:
    backgroundColor: "{colors.keeper-black}"
    textColor: "{colors.white}"
  map-place-selected:
    backgroundColor: "{colors.keeper-black}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
---

# Design System: Friends of Seguin Island

## Overview

**Creative North Star: "Granite & Fog"**

The site takes its palette from the island. Granite Gray is the 1857 tower's stone. Fog is the blue-gray haze Seguin is known for, and it already sits behind the 3D map. Keeper's Brick is the red-brown brick of the keeper's house and station buildings. White is the clapboard trim and the page. Everything is set on plain white with hairline edges, and the photographs of the island do the atmospheric work.

The voice is warm and welcoming, not austere. Surfaces are flat and uncluttered. Reading text is set in Source Serif 4 with generous line spacing, so history and caretaker posts read like a letter from the island rather than a brochure. Headings are set in Public Sans in Granite Gray: sturdy, open, and civic, like federal station signage. Buttons are square, bold, uppercase serif, echoing the letterspaced serif caps of the logo. They should feel inviting to press, never severe.

Density is low and roomy: fluid spacing that grows with the viewport, one wide wrapper, and sections separated by generous vertical padding or a pale tinted band.

**Key Characteristics:**
- White page, hairline borders, no decorative shadows.
- Granite Gray headings and primary actions. Keeper's Brick marks the one support action (Donate).
- Source Serif 4 body text with generous (1.65) line-height in long-form prose, lists included.
- Square, uppercase buttons. Softly rounded (7px) cards and panels.
- Full-bleed island photography under a dark gradient for heroes.
- Fog-blue stage for the 3D map, with white pill labels.
- A full-bleed Fog tide band on Plan Your Visit, the one sea context outside the map.

## Colors

A restrained, mineral palette: warm stone gray and near-black on white, with fog blue and brick red standing in for sea air and station buildings.

### Primary
- **Granite Gray** (`granite-gray`): The brand color, token `color.brand.primary`. Used for all h1–h4 headings, the primary button fill, the closer band above the footer, card hover borders, and form accent color. It gives 4.8:1 against white, so it passes AA for text but has no margin to spare. Never lighten it for text.

### Secondary
- **Keeper's Brick** (`keeper-brick`, token `color.brand.brick`): Drawn from the brick of the keeper's house and station buildings. The photograph samples average #865344 in sunlight; the token is tuned slightly richer. It gives about 6.7:1 against white, so white text on a brick fill is safe. It fills the header's Donate button (`data-button-variant="support"`). Its hover state is **Keeper's Brick Deep** (`keeper-brick-deep`, `color.brand.brick-deep`).

### Tertiary
- **Seguin Navy** (`seguin-navy`, token `color.brand.navy`): The ink of the existing logo (`src/assets/seguin-island-logo.jpg`) and its letterspaced serif wordmark. Its only styled use is as a mix ingredient in the Tide band, where it deepens Fog: the water under the tide curve (`--tide-water`, Fog with 22% Navy in oklab, about #a8b9c6) and the band's hairline rules (`--tide-rule`, 30% Navy, about #98aab9). It is never a flat fill or a text color. Keep any surface that holds the logo compatible with it (white or very pale backgrounds).
- **Fog** (`fog`, token `color.brand.fog`): The blue-gray background of the 3D map stage (`.island-map__stage`), the Tide band on Plan Your Visit, and the text-selection highlight. It is the only cool tone in the UI.

### Neutral
- **Keeper Black** (`keeper-black`): The brand dark, token `color.brand.dark`, a warm near-black. Used for selected map labels and places, selection text, and the default focus-ring token.
- **Charcoal** (`charcoal`): Neutral 800, token `color.fill.loud`. Used for the secondary button fill and the footer band.
- **Ink** (`ink`): Neutral 900. The body text color.
- **Ink Quiet** (`ink-quiet`): Neutral 600. Used for quiet text, the map hint, and form field text.
- **Station Stone** (`station-stone`): Stone 800. Used for text inside the map stage (labels, status, credit, close button).
- **Hairline** (`hairline`): Neutral 200. Used for card and place-button borders and input strokes.
- **Tinted Surface** (`tinted-surface`): Neutral 100. The background for `data-bg="tinted"` regions, such as the membership and history band on the home page.
- **White** (`white`): The page background (hard-coded on `body`), card surfaces, and text on dark fills.

### Named Rules
**The Granite Rule.** Granite Gray carries headings and the single primary action in any group. If two things on a screen are Granite Gray buttons, one of them should be secondary.

**The Brick Rule.** Keeper's Brick is an accent, not a fill for reading surfaces. Use it on small areas, never as a background behind paragraphs. Where Granite and Brick sit side by side, Brick is the one that draws the eye, so it is spent on the support action (Donate) and nothing else competes with it on the same screen.

**The Fog Belongs to the Sea Rule.** Fog is reserved for map and sea contexts. It is not a general-purpose "light blue" for panels. The Tide band on Plan Your Visit is the one sea context outside the map, and where it needs a deeper blue for water or rules, it mixes Fog toward Seguin Navy rather than adding a new blue.

## Typography

**Display Font:** Public Sans (variable, self-hosted via `@fontsource-variable/public-sans`, with the system sans as fallback)
**Body Font:** Source Serif 4 (variable with optical sizing, self-hosted via `@fontsource-variable/source-serif-4`, upright and italic, with Georgia as fallback). The Latin upright file is preloaded in `BaseLayout.astro`.
**Label Font:** Source Serif 4 in bold uppercase for buttons. Header nav uses Public Sans at semibold.

**Character:** A civic, open sans for headings and wayfinding over a bookish serif for reading. The serif carries the history and the keepers' voice, and in tracked bold caps it echoes the logo's wordmark. The sans keeps headings and nav sturdy and legible. Headings are set in Granite Gray, not black, which softens the page.

### Hierarchy
- **Display** (700, `--size-step-7` `clamp(2.25rem, 1.70rem + 2.73vw, 3.75rem)`, line-height 1, tracking -0.015em, max 20ch, balanced wrapping): Page h1s, the hero heading, and the home page's section heads (ledger, dispatch). In the hero it switches to white; the landmark hero steps up to `--size-step-9`. Headline and title headings stay at 600 with -0.01em and -0.005em tracking.
- **Metadata** (Public Sans, step 0, tabular numerals, Ink Quiet): Post dates (`small:has(> time)`, `.dispatch__meta`) and the hero coordinates. The same tabular Public Sans carries every figure a visitor reads: tide times and heights, mooring donations, and phone numbers.
- **Headline** (600, `clamp(1.75rem, 1.57rem + 0.91vw, 2.25rem)`, max 35ch): Section h2s.
- **Title** (600, `clamp(1.5rem, 1.36rem + 0.68vw, 1.875rem)`, max 35ch): Card and sub-section h3s.
- **Body** (400, `clamp(1rem, 0.95rem + 0.23vw, 1.125rem)`, line-height 1.5): Source Serif 4 at a comfortable 16–18px. Inside `.prose`, paragraphs, list items and definitions get `--leading-prose` (1.65) and a 70ch measure. Blog articles are capped at 65ch.
- **Label** (700, uppercase, `--tracking-label` 0.05rem, 0.875rem): Buttons.
- **Nav** (Public Sans 600, step 0 at 15–16px, no tracking): Header links. The underline appears on hover and on the current page, and the current page is set in Granite Gray.

### Named Rules
**The Letter from the Island Rule.** Long-form content (history, the Keeper's Blog, facilities) is always set in `.prose flow`: Source Serif 4, `--leading-prose`, and 70ch maximum. Don't set long-form text in the sans.


## Layout

- **Wrapper:** One centered wrapper, max 1550px (the `variables.css` value overrides the token's 896px), with fluid inline padding (`space.lg`, 28–32px).
- **Regions:** Page sections use `.region`, with vertical padding of `space.xl` (42–48px). Alternate sections may take the tinted band.
- **Compositions:** CUBE compositions do the layout: `flow` for vertical rhythm, `cluster` for nav rows, `repel` for header and footer, `switcher` for side-by-side CTA cards that stack when narrow, `grid` for blog cards, and `sidebar` for the map and its places list (a 16rem sidebar that wraps at 60%).
- **Spacing:** Every step is a fluid clamp from a smaller mobile value to a larger desktop value, so layouts breathe without breakpoints. Responsiveness is intrinsic. The one media-query breakpoint is the Tide band's (max-width 52rem), where its readout, chart and status stack into one column.
- **Ledger pages:** Fact-heavy pages (the home page's distinctions, Plan Your Visit) run as a sequence of regions, each with a bold step-7 h2 (step 6 on Plan Your Visit), a step-2 lead at `--leading-normal` of about 52–60ch, and ruled ledger rows beneath. Multi-line leads never sit below 1.3 line-height.
- **Hero:** Full-bleed, with the image covering the grid and the content anchored to its foot.

## Elevation & Depth

Flat by default. Pages, cards, buttons, and inputs sit at rest with no shadow. Hierarchy comes from hairline borders, the tinted band, and the dark closer and footer bands. Shadows appear only on elements that float above the 3D map canvas, where they separate UI from the terrain.

### Shadow Vocabulary
- **Map label** (`box-shadow: 0 1px 4px rgb(0 0 0 / 0.25)`): White pill labels floating over the terrain.
- **Map info panel** (`box-shadow: 0 2px 12px rgb(0 0 0 / 0.2)`): The place-detail panel over the map, on a 95% white background.

The Tide band's high and low labels carry a Fog-colored text halo (`text-shadow: 0 0 3px`, `0 0 3px`, `0 0 6px`, all Fog) so the curve never runs through a label. It is a knockout in the band's own color, not a cast shadow.

The token set includes a full shadow scale (`shadow.2xs`–`2xl`), but no styles use it.

### Named Rules
**The Flat Page Rule.** Nothing on the page itself casts a shadow. Only things floating over the map (or, in future, over imagery) may.

## Shapes

Two corner languages that don't compete. Actions are square (0 radius), like signage. Containers are gently softened (7px) on cards, the map stage, the info panel, and place buttons. Inputs take a barely-there 0.2rem. Pills (999px) are reserved for map labels, which also carry a 2px pointer stalk down to the spot they mark. Borders are 1px solid hairlines. Tables and fieldsets use a 1px dashed stroke. Small circles mark positions and nothing else: the Tide band's now-dot (0.875rem, Granite, ringed in Fog) and the route stops' 12px Granite rings.

## Components

Warm and welcoming: plain, flat shapes, set up so that the next click is obvious and friendly.

### Buttons
- **Shape:** Square corners (0).
- **Primary:** A Granite Gray fill with white bold uppercase serif label text, padded 0.85em by 1.15em (about 38px tall), with a 0.5ch gap for an optional trailing arrow ("Become a Member →").
- **Hover / Focus:** On hover, the fill darkens 14% toward black (`--button-bg-hover`, a `color-mix` in oklab) with a 250ms transition. On press, the button scales to 99%. The focus-visible ring is a 2px solid outline in the button's own fill color.
- **Secondary:** A Charcoal fill with a white label. The focus ring is Keeper Black. It is used for the second CTA and the map's reset control.
- **Full width:** `.full-width.button` stretches the button and centers its label.
- **Support:** `data-button-variant="support"` gives a Keeper's Brick fill that hovers to Keeper's Brick Deep. It is used once: the header Donate link, which is a single `<a class="button">`.

### Cards / Containers
- **Corner Style:** 7px.
- **Background:** White.
- **Shadow Strategy:** None (see Flat Page Rule).
- **Border:** A 1px Hairline border that turns Granite Gray on hover, with a 250ms ease transition. The card scales to 99% on press.
- **Internal Padding:** 1.5rem, with `flow` spacing of `space.sm` between children.
- The whole card is the link (`<a class="card">`).

### Inputs / Fields
- **Style:** A white field with a 1px solid Hairline stroke, 0.2rem radius, 0.5em by 0.8em padding, full width, and Ink Quiet text. Checkboxes and radios take a Granite Gray accent color.
- **Focus:** The global 2px solid focus-visible outline.
- **Disabled:** A Neutral 100 fill and a not-allowed cursor.

### Navigation
- **Header:** The logo on the left (40px tall, in a brand block with a `clamp(25ch, 50%, 50rem)` basis) and a cluster of six Public Sans links on the right (About, Plan Your Visit, Island Map, Keeper's Blog, Contact, Membership), ending with the Brick Donate button. The current page gets `aria-current="page"`. There is no dedicated mobile menu; on phones the cluster wraps to three rows, two of links and then Donate on its own.
- **Closer:** A Granite Gray band with the logo centered on a white 7px plate (max 22.5rem, never upscaled), contact email and mailing address, and a centered repeat of the nav plus a plain Donate link, all in white.
- **Footer:** A Charcoal strip with copyright and "All rights reserved."

### Hero
A full-bleed photograph of the island with a gradient that runs from transparent to 45% black at 35% of the height to 60% black at the bottom. The content sits at the foot of the photo, where the gradient is darkest, aligned to the wrapper's left edge in white: the h1, then the coordinates in tracked tabular sans beneath it. On phones the hero is at least `min(62svh, 36rem)` tall. There is an optional round skip-link with an inline SVG arrow icon. The Hero takes an `alt` prop, which defaults to decorative.

### Island Map (signature)
- A Fog-blue stage (`min(78svh, 52rem)` tall, 7px corners) holding the WebGL terrain.
- White pill labels in bold sans with pointer stalks. On hover or selection they invert to Keeper Black with white text.
- A floating white info panel at the bottom left.
- A secondary button for the reset control at the top right.
- A small credit at the bottom right.
- Alongside the stage is a places list of full-width, 7px-cornered hairline buttons. The selected button (`aria-pressed="true"`) fills Keeper Black.

### Ledger
A station log: one fact per ruled row.
- **Structure:** A definition list. Each row is a grid that auto-fits into claim and evidence columns, opened by a 1px solid Hairline rule, and the list is closed by one more.
- **Claim:** Public Sans semibold in Granite Gray, snug leading.
- **Evidence:** The reading serif.
- **Scales:** The home page's "Only on Seguin" distinctions set the claim at `--size-step-6` over step-2 evidence at 52ch (20rem columns). Plan Your Visit's fact rows set the claim at `--size-step-1` in a fixed 11rem label column over body-size evidence with `--leading-prose` at 68ch. The two columns open once the content is 40rem wide (a container query); narrower, the claim stacks above its evidence.
- **Figures:** Phone numbers in a row are semibold tabular Public Sans and don't wrap. Prices sit in a small table inside the row, with the system's 1px dashed stroke, the caption above in semibold Public Sans, and the amounts right-aligned in semibold tabular Public Sans.

### Tide Band (signature)
The sea on the page: today's predicted tide, on Plan Your Visit.
- **Band:** Full-bleed Fog, padded `space.md-lg`, with Station Stone text. Text selection inside it inverts to Keeper Black.
- **Readout (top left):** An h2 at step 4 that names the day on show ("The tide today", "The tide on Saturday"), the time in tabular Public Sans, the height now at `--size-step-9` in bold tabular Keeper Black (-0.03em, with the unit at 0.4em), and one serif sentence giving the trend and the next high or low.
- **Status (right):** Season, Landing, Caretakers and Tower as a definition list, at `--leading-normal`. Landing restates the published access rule and links to Coming ashore. Each entry is opened by a `--tide-rule` hairline, with the term in small semibold Public Sans and key values in bold Keeper Black.
- **Chart (full width):** The curve is a 2px Keeper Black line over a `--tide-water` fill, on a Station Stone baseline. Clock ticks every six hours are set in tabular sans. Midnight ticks are bold Keeper Black and carry a dashed `--tide-rule` divider. The high and low marks give the height in bold over the time.
- **Now and scrub:** The now-marker is a 2px Granite rule with a Granite dot ringed in Fog. A transparent range input over the plot lets pointer, touch and arrow keys read any time. It shows a Keeper Black cursor and a square, outlined "Back to now" control, and Escape also returns to now. When the plot has focus, it shows a 2px Keeper Black outline.
- **Motion:** The curve draws in once, left to right (1400ms, the bounce easing), then the marks and now-marker fade in (600ms, after 700ms). Stepping to another day swaps the curve without replaying the draw. Nothing else animates, and reduced motion skips both.
- **Span:** Phones get 24 hours of tide and wider screens 36. Today starts a few hours back; a later day starts at its midnight.
- **Days:** Square outlined Previous day / Next day controls in the caption step up to six days ahead. A later day opens read at 9 am with the cursor showing, and Back to now returns to today. A visible hint says the curve can be dragged or read with the arrow keys, and a polite status line announces each reading as it loads.
- **Without JS:** The band renders in a `static` state with its facts, the source caption and a NOAA link; the height, plot and controls stay hidden. While loading or after an error, a dashed `--tide-rule` waterline holds the plot's place.

### Visit Route
The Island Map stage reused for one walk, landing to lantern.
- **Stage:** The same Fog stage and white pill labels, `min(70svh, 44rem)` tall (at least 22rem). The named route trail is drawn heavier than the other trails (a 1.1 tube radius against 0.45) in white with a slight glow.
- **Stops:** An ordered list beside the stage. Each stop is a full-width, borderless, 7px-cornered button with a semibold Public Sans name at step 2 over a quiet serif detail. A 12px Granite ring marks each stop, and a 2px Hairline thread strings the rings together.
- **States:** Hover takes the Tinted Surface fill. The selected stop (`aria-pressed="true"`) fills Keeper Black and its ring fills white, matching the map's places list.
- **Tour:** When the stage comes into view, the camera walks the stops once, 2.6s each. Any click, drag, focus or key press hands control back. With reduced motion it simply starts at the landing.

## Do's and Don'ts

### Do:
- **Do** set every heading in Granite Gray Public Sans and long-form content in `.prose flow` Source Serif 4.
- **Do** keep action buttons square and uppercase, and containers at 7px.
- **Do** use real Seguin photography under the hero gradient for any full-bleed moment.
- **Do** reference brand colors through their tokens (`--color-brand-brick`, `--color-brand-fog`, `--color-brand-navy`), never as raw hex.
- **Do** use only token names that exist: `--font-weight-*`, `--leading-{heading,body,prose,none,snug,tight,normal,relaxed,loose}`, `--size-step-{-2..10}`, and `--space-{3xs..3xl}` plus their pairs. Check the compiled CSS before adding a new `var()`.
- **Do** keep the logo on white or very pale surfaces so Seguin Navy reads.
- **Do** set tide figures, times, prices and phone numbers in tabular Public Sans.
- **Do** deepen Fog toward Seguin Navy (`color-mix` in oklab) for water and rules inside a sea band, rather than adding a new blue.

### Don't:
- **Don't** use the starter kit's pink `accent` tokens. They are not part of Seguin's palette.
- **Don't** use a second Brick-filled element on a screen that already shows the Donate button (see Brick Rule).
- **Don't** add shadows to page-level cards or buttons (see Flat Page Rule).
- **Don't** use Keeper's Brick as a background behind body text (see Brick Rule).
- **Don't** rely on the dark-mode token set. `body` hard-codes a white background, so dark mode is not shipped.
