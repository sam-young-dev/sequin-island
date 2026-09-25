---
target: home page
total_score: 19
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 2
p1_count: 2
target_identity: "file:C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\index.astro"
target_fingerprint: "sha256:895310b7a11262a66ab7b6cefc94eb501a9e85603d9b9fada9ccc5b7e5bcaa5e"
target_path: "C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\index.astro"
timestamp: 2026-09-25T20-14-03Z
slug: src-pages-index-astro
---
Method: dual-agent (A: assessment-a-design-review · B: assessment-b-detector-browser)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Blog teaser silently renders with no photo despite `heroImage` being set on the latest post; nothing signals the failure to a visitor or editor |
| 2 | Match System / Real World | 3 | Nautical, first-person voice mostly lands, but "a memorable experience for visitors of all ages" (index.astro:75) breaks into brochure-speak |
| 3 | User Control and Freedom | 4 | Simple linear scroll, no traps |
| 4 | Consistency and Standards | 4 | Ledger, cards and button variants are applied exactly per DESIGN.md with no rogue colors or shapes |
| 5 | Error Prevention | n/a | No forms or destructive actions on this page |
| 6 | Recognition Rather Than Recall | 3 | Nav is persistent with `aria-current`, but three exit-links ("Walk the island in 3D", "Read the full story", "Visit the full blog") share identical low-contrast styling, reading as footnotes rather than recognizable CTAs |
| 7 | Flexibility and Efficiency | n/a | First-visit persuade-mode landing page; no power-user path applies |
| 8 | Aesthetic and Minimalist Design | 2 | Minimalism has tipped into monotony: four consecutive text-only sections (statement, ledger, history, support) share near-identical gray-on-white rhythm with zero imagery or color after the hero |
| 9 | Error Recovery | n/a | No error states present on this page |
| 10 | Help and Documentation | n/a | Not applicable to a persuade-mode landing page |
| **Total** | | **19/24** | **Good (79%)** |

## Design Specificity Verdict

**LLM assessment**: The page is half-specific. The hero photo (the real brick keeper's house, flag, and lantern room) and the four "Only on Seguin" ledger facts (the 7,200-signature Fresnel petition, the 750-ft tramway, kept by friends since 1986) are genuinely un-swappable — no other lighthouse site can claim them. But the very next section undercuts it: "Visiting this historic, active lighthouse is a memorable experience for visitors of all ages" (index.astro:75) is interchangeable stock-attraction copy sitting one paragraph below the most specific facts on the page. Structurally, five sections in a row (statement, ledger, history, support, dispatch) are all "heading + paragraph(s) + link" on white or pale-gray ground, with near-identical rhythm and no photography after the hero. A competitor's site generator could reskin this exact DOM for a different lighthouse by swapping four `dt`/`dd` pairs and one photo. The membership ask — the page's actual goal — reads as a gray box with a gray button and no image of the island, a caretaker, or a member, so nothing differentiates "give money" from "read some facts" in visual weight. This is exactly the generic feeling the user flagged, and it is fixable without touching the (correctly disciplined) color and shape system.

**Deterministic scan**: The static CLI scan (`impeccable detect --json src/pages/index.astro`) returned a clean result: exit 0, `[]`, no findings — not masked by any ignore config (none exists). A separate live-browser injection against the rendered page caught two real findings the static scan and the LLM review both missed: wide letter-spacing on `p.hero__coords` (0.05em on body-sized text) and tight line-height on `p.statement__lead` (1.25, under the 1.3 minimum) — both traced to real tokens (`--tracking-label`, `--leading-tight`) applied to running text rather than labels. A third live finding, a "glowing shadow" on `body`, is a false positive: it is the detector's own amber highlight overlay being detected as a page style, not an actual page defect. All internal links (nav, hero, ledger, history, support, dispatch) resolved 200 with no 404s, all images carry meaningful alt text, and no console errors appeared beyond benign Vite HMR logging.

**Visual overlays**: Injection succeeded in Assessment B's own browser tab (confirmed via `.impeccable-overlay.impeccable-visible` DOM elements after injecting the live-server's `detect.js`), and the two real findings above were visually marked there before that tab and its live-server were torn down at the end of the run. That tab is not the one currently open in your browser, so there is nothing to look at right now — rerun the detector against the dev server if you want to see the overlay live.

## Overall Impression

The bones are honest and disciplined — real facts, a correctly-enforced color system, no rogue shadows or shapes — but the page reads as generic anyway, for reasons that have nothing to do with the design system and everything to do with what's missing: imagery after the hero, color anywhere the palette allows it, and a moment of visual weight at the one place the page is actually trying to persuade someone to act. The single biggest opportunity: the membership ask is the page's goal and its flattest, least photographed section — give it (and the broken blog-photo bug just above it) a face, and the "generic" feeling drops sharply without any color or shape rule needing to change.

## What's Working

1. **The hero photograph** (`seguin-island-hero.jpg`) — a real, specific, sunlit shot of the actual brick keeper's house, flag, and lantern room, not a stock lighthouse silhouette. It reads as the visual peak of the page.
2. **The "Only on Seguin" ledger** (index.astro:28-41) — four ruled facts, each a real, verifiable, emotionally loaded detail (a 7,200-signature preservation fight, a working 1890 tramway) rather than marketing copy, and self-limited to exactly four rows.
3. **`.statement__lead`'s typographic choice** (statement.css:11-20) — setting the mission as one large opening sentence rather than a small "About us" paragraph is a deliberate, considered decision, not a template default.

## Priority Issues

**[P0] The featured blog teaser silently drops its photo**
- Why it matters: `pardon-our-dust.md` sets a real `heroImage` of caretakers at work, but `.dispatch__feature` renders with no `data-has-photo` attribute and no `<img>` at all — the one section of the home page that could show first-hand island life instead shows another gray text block, and nothing anywhere (console, CMS, UI) signals that it failed.
- Fix: Debug why `latest.data.heroImage` evaluates falsy at render (remote-image domain allowlist or schema inference), and get the real photo showing. This single bug fix does more for "engaging" than any copy change on the page.
- Suggested command: /impeccable harden

**[P0] The membership ask has no image, no face, no place**
- Why it matters: `.support` is text-on-tinted-gray with a single button — visually weaker than the free ledger section above it, at the exact point the page asks a visitor for money. Per PRODUCT.md's own "real island, real facts" principle, the ask is the one section that most needs a reminder this is a real place kept by real people, and it currently has less visual richness than the content that costs the visitor nothing.
- Fix: Add a small real photo to the support band (a caretaker, the museum interior, a summer visitor group, even a crop from the blog's own caretaker photos) so the ask has a face attached to it.
- Suggested command: /impeccable delight

**[P1] Generic filler copy sits directly beneath the most specific facts on the page**
- Why it matters: "Visiting this historic, active lighthouse is a memorable experience for visitors of all ages" (index.astro:75) is the one sentence on the page interchangeable with any museum or nature preserve, immediately after the 7,200-signature petition and 750-ft tramway facts. It also gives a first-time trip planner zero actual planning signal (no tide, ferry, or season), and buries the one relevant link ("Plan your visit") mid-sentence in body-copy weight.
- Fix: Replace with something as specific as the ledger — what the climb actually feels like, or a caretaker's line about greeting a boat at the landing — and promote "Plan your visit" out of running text.
- Suggested command: /impeccable clarify

**[P1] Four consecutive sections with zero color or imagery**
- Why it matters: Statement → Ledger → History → Support run gray-on-white or gray-on-tinted with identical section rhythm (region → h2 → prose → exit-link) and no photography, so the page goes visually silent for the entire middle of the scroll — the core of the "generic" feeling the user named. DESIGN.md deliberately reserves Fog and Brick for map/sea and Donate respectively, but that constraint doesn't require zero imagery.
- Fix: Break the run with at least one more real photograph (the tramway, the Fresnel lens, or a caretaker) within the existing palette rules, and vary section rhythm so not every block is heading-paragraph-link.
- Suggested command: /impeccable bolder

**[P2] The site's signature feature and other exits read as footnotes**
- Why it matters: "Walk the island in 3D →" (ledger.css:40-45), "Read the full story →" (history.css:27-30), and "Visit the full blog →" (dispatch.css:60-64) all share identical quiet semibold-serif styling with no color or hierarchy distinction from body copy. The 3D map is DESIGN.md's stated "signature" component and PRODUCT.md's stated differentiator, yet its only two home-page entry points look exactly like a footnote link to the blog index.
- Fix: Give the map exit-links (and ideally a static preview frame of the terrain) enough visual weight to read as an invitation, not fine print.
- Suggested command: /impeccable layout

## Persona Red Flags

**First-time trip planner (discovering cold)**: Lands on a strong hero, then the very next sentence they read is "a memorable experience for visitors of all ages" (index.astro:75) — no tide, ferry, or season signal. The one link that would actually help them ("Plan your visit") is buried mid-paragraph in body-copy weight, not a button, despite trip planners being the site's #2 priority audience.

**Prospective donor (deciding whether to give)**: Scrolls from a beautiful hero straight into four sections of unrelieved gray text, then arrives at the ask having seen no second photo of the island, a volunteer, or a visitor. The reassurance line ("Every gift is tax-deductible...") is present and well-written but styled as quiet fine print, easy to skip past exactly when it matters most.

## Minor Observations

- Live detector findings (not caught by the design review): wide letter-spacing on `.hero__coords` (0.05em on body text) and tight line-height on `.statement__lead` (1.25, under the 1.3 minimum) — both real, traced to `--tracking-label`/`--leading-tight` applied to running text rather than a short label.
- `heroEyebrow` (the real coordinates) appears only once; it could be echoed anywhere else data-heavy for reinforcement.
- The dispatch section's empty-state copy ("The caretakers haven't posted yet this season...") is warmer and more voiced than the generic history-section line — worth using as the copy model site-wide.
- The blog card grid (`Card.astro`) never actually renders on the home page right now since only one non-draft post exists, so its hover/press states are currently untested by a real visitor here.

## Questions to Consider

- If the membership ask is the one place money changes hands, why is it the only section with strictly less visual richness than the free content above it?
- The 3D map is the site's stated signature feature — what would it take to give it a visual preview on the home page instead of a footnote-styled link?
- Every ledger fact is dramatic (a 7,200-signature fight, a working 1890 tramway) — what would it cost to let one spill out of its ruled row into something bigger (a pull-quote, an image, hero-scale type) instead of keeping all four at identical weight?
