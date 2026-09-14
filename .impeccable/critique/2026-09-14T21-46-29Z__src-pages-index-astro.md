---
target: homepage (src/pages/index.astro)
total_score: 18
max_score: 28
na_heuristics: 7,9,10
p0_count: 2
p1_count: 2
target_identity: "file:C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island-new\\src\\pages\\index.astro"
target_fingerprint: "sha256:d75e8d5899536581bdf4684d258ade223350370c58238756adbb3ab2498e36c3"
target_path: "C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island-new\\src\\pages\\index.astro"
timestamp: 2026-09-14T21-46-29Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Static page needs little live feedback; blog empty state ("No blog posts have been published yet.") is a good status cue. Minor: no visible nav active-state beyond an unstyled `aria-current`. |
| 2 | Match System / Real World | 2 | Hero headline "Your Island Adventure Starts Here" reads as generic island-tourism copy, not heritage-preservation copy — mismatched to what this org actually is. |
| 3 | User Control and Freedom | 3 | No traps; external ejoinme.org handoff is an acceptable, expected new-context jump per product constraints. |
| 4 | Consistency and Standards | 2 | Header's Donate control nests a `<button>` inside an `<a href="/donate">` (invalid, ambiguous focus/AT behavior); mobile header also fails to wrap at 390px, clipping the Donate button off-screen — two structural consistency breaks. |
| 5 | Error Prevention | 3 | No forms to break on this page; card/heading CSS has no line-clamp, so an unusually long CMS-entered title could overflow rhythm (not yet triggered). |
| 6 | Recognition Rather Than Recall | 3 | CTAs use plain verb labels; nav is a short flat list. Minor: header logo and footer logo serve near-identical roles with no differentiation. |
| 7 | Flexibility and Efficiency of Use | n/a | Persuade-mode landing page; no power-user path expected. |
| 8 | Aesthetic and Minimalist Design | 2 | Single-accent system is well executed in principle, but the confirmed mobile clipping (h1 cut mid-word, CTA paragraphs cut off, nav overflowing) is a real, visible break in an otherwise disciplined layout. |
| 9 | Error Recovery | n/a | No user-triggered error states on this static page. |
| 10 | Help and Documentation | n/a | Not applicable to a persuade-mode nonprofit landing page. |
| **Total** | | **18/28** | **Acceptable (64%)** |

*Heuristics 7, 9, 10 scored n/a (mode-appropriate for a Persuade-mode landing page); applicable max is 28, not 40.*

## Design Specificity Verdict

**LLM assessment:** This homepage fails the "could this be any nonprofit" test at the single most important spot on the page: the hero. `heroHeading: "Your Island Adventure Starts Here"` (`src/content/home/index.md:5`) is generic island-vacation-brochure copy — it could sit on a Maine sea-kayaking outfitter or a ferry company's site with zero edits. The one genuinely specific touch is the hero eyebrow coordinates (`43°42'26"N, 69°45'28"W`) — a quiet, logbook-appropriate detail — but it's undercut immediately by the generic headline beneath it. Below the hero, the two CTA-card paragraphs are competent but interchangeable: no Fresnel lens, no 1986 founding story, no caretaker program, no named person, nothing that only Seguin Island has. That real, specific material exists (per PRODUCT.md, it's all in `about.md`) and never surfaces on the page whose entire job is to build the case before asking for money. The homepage reads as a template with the client's name filled in, not a page authored for this organization.

**Deterministic scan:** The bundled detector (source scan + live URL scan at 1440px and 390px) returned 5 findings at desktop, 3 at mobile: two `low-contrast` warnings ("#ffffff on #ffffff"), two `line-length` warnings (~86 chars/line, prose intro paragraph exceeding the 70ch max in an unusual way), and one `bounce-easing` warning (an overshooting `cubic-bezier(0.5, 0.05, 0.2, 1.5)` used on the hero skip-link hover icon). Source scan alone (no browser) returned zero findings — the CSS living outside the scanned `.astro`/component files meant the source-only pass missed everything the live-render pass caught. No false positives were introduced by the detector for the line-length or bounce-easing findings, both confirmed as real by source inspection.

**Visual overlays:** No browser-injectable overlay bundle was available in this environment, so no `[Human]`-tab overlay is currently visible. In its place, Assessment B took full-page screenshots at 1440px and 390px via headless Chrome and inspected the rendered DOM directly. That inspection surfaced the critique's most concrete, code-confirmed defect: **at 390px the header nav does not wrap, clipping the Donate button off the right edge of the viewport; the hero `<h1>` clips mid-word ("...Adventur"); and both CTA card paragraphs are cut off rather than wrapping.** Desktop (1440px) showed no equivalent overflow. The detector's own `#ffffff on #ffffff` low-contrast findings are very likely a false positive: the hero text sits over a photographic image with a dark gradient overlay (`.hero::before`, `rgba(0,0,0,0.45–0.6)`), not over the flat white `body` background the tool appears to have measured against — the screenshots show the text reads legibly in both viewports.

## Overall Impression

Structurally, this is a disciplined, well-built system — the single-accent rule, the flat/no-shadow aesthetic, and the serif/sans split all survive from DESIGN.md into the rendered page exactly as documented. But the homepage doesn't yet do its actual job: the hero copy is generic tourism language sitting on top of one of the more specific, fact-rich preservation stories a small nonprofit site could tell, and the mobile layout has a real, visible break (nav overflow, clipped headline, clipped CTA copy) that a first-time mobile visitor will hit immediately. The biggest single opportunity is the same at both stops: put the Fresnel lens / 1986 story where the visitor already is (the hero, the CTA cards) instead of leaving it one click away on /about.

## What's Working

1. **The single-accent discipline is genuinely held, not just documented.** Every heading, link, and primary button routes through the one Driftwood Taupe accent with no rogue hues anywhere in the reviewed CSS — a rare case of a stated design rule actually surviving implementation end to end.
2. **Blog empty-state is handled gracefully, not assumed away.** `index.astro` explicitly renders "No blog posts have been published yet." instead of a broken or empty grid — a real edge case someone actually thought about.
3. **The hero coordinate eyebrow (`43°42'26"N, 69°45'28"W`) is a well-chosen, low-cost specificity move** — it's the one line on the page that couldn't be copy-pasted onto another island's site, and it fits the logbook voice DESIGN.md describes.

## Priority Issues

**[P0] Mobile layout clips the header nav, the hero headline, and both CTA paragraphs at 390px**
- **Why it matters:** This is a confirmed, code-verified defect (not a taste call) — at the most common phone width, the Donate button is pushed off-screen, the hero `<h1>` is cut mid-word ("...Adventur"), and the CTA-card body copy is truncated rather than wrapping. A mobile visitor — the persona most likely to be a first-time, on-the-go donor — hits a visibly broken page on arrival.
- **Fix:** Trace why `.repel` (header) and the CTA `switcher`/hero text stack aren't wrapping/reflowing at 390px despite `flex-wrap: wrap` defaults in the composition CSS; likely an explicit width, `white-space`, or absolute-positioning override on the hero text stack or header row is overriding the wrap behavior. Verify by hand at 375-414px after the fix.
- **Suggested command:** `/impeccable adapt`

**[P0] Hero headline is generic tourism copy, not mission copy**
- **Why it matters:** `heroHeading: "Your Island Adventure Starts Here"` (`src/content/home/index.md:5`) primes "vacation," not "preserve/support/steward," for an audience that PRODUCT.md defines as prospective members and donors motivated by maritime heritage. It's the first line every visitor reads, and it currently works against the conversion goal rather than for it.
- **Fix:** Replace with copy anchored in the actual positioning — e.g. naming the Fresnel lens ("Home to the only operational first-order Fresnel lens north of Rhode Island") or the 1986 stewardship — content that could not be copy-pasted onto another island's site.
- **Suggested command:** `/impeccable clarify`

**[P1] Invalid nested interactive markup on the primary nav Donate control**
- **Why it matters:** `SiteHeader.astro` wraps a `<button class="button">Donate</button>` inside an `<a href="/donate">` — invalid HTML (interactive-in-interactive) that produces ambiguous keyboard/screen-reader focus behavior on the site's single most important conversion control.
- **Fix:** Use one anchor styled with `.button` (`<a class="button" href="/donate">Donate</a>`), matching the pattern the homepage's own CTAs already use correctly.
- **Suggested command:** `/impeccable audit`

**[P1] Homepage has no mid-page evidence before the ask — it's a teaser with nothing underneath**
- **Why it matters:** PRODUCT.md frames the page's job as building the case for a National Historic Place with the only operational first-order Fresnel lens north of Rhode Island — none of that appears between the hero and the two CTA cards. The ask (membership/visit) currently has no supporting fact or story behind it on the page itself.
- **Fix:** Add one substantive section (photo + 2-3 sentences) surfacing the single most distinctive fact — the Fresnel lens, the 1986 founding, or the caretaker program — before the CTA cards, so the ask has evidence behind it. The unused `Masthead` component (already populated with real "Est. 1986" data) is a ready-made candidate for this role.
- **Suggested command:** `/impeccable layout`

**[P2] Generic, non-descriptive alt text on both meaningful images**
- **Why it matters:** Hero image alt is `"hero banner"`; header/footer logo alt is `"logo"` / `"logo icon"`. All are present (no missing alt, confirmed via DOM inspection) but none describe what's actually depicted — a missed opportunity for screen-reader users on the page's dominant visual.
- **Fix:** Hero alt should describe the actual photographed scene (or be marked decorative with an empty alt if the heading already conveys the content); logo alt should read "Friends of Seguin Island logo."
- **Suggested command:** `/impeccable audit`

**[P2] Two homepage CTA-card paragraphs are hardcoded in the template instead of sourced from the CMS**
- **Why it matters:** `index.astro` hardcodes the "Become a Member" and "Learn Our History" descriptive copy directly in the `.astro` file, unlike every other homepage string. This breaks the product principle that non-technical staff maintain this site's copy through Decap CMS — an editor cannot change this text without a code change.
- **Fix:** Add these two strings to the home content schema/markdown (`src/content/home/index.md`) alongside the existing hero fields.
- **Suggested command:** `/impeccable harden`

## Persona Red Flags

**Jordan (First-Timer):** Lands on "Your Island Adventure Starts Here" and, without already knowing FOSILS is a preservation nonprofit, may reasonably read this as a travel/tourism site. No visible photo, fact, or figure about the Fresnel lens, the historic designation, or the founding story appears before being asked to choose "Become a Member" vs. "Learn Our History" — a cold ask with no warm-up.

**Riley (Stress Tester):** Tabbing/inspecting the header's Donate control exposes the invalid button-in-anchor nesting and its inconsistent focus/click behavior directly. Riley also notes the `Card`/heading CSS has no `line-clamp` or overflow handling — an unusually long CMS-entered post or page title (nothing in the content schema constrains length) could visually break card rhythm on the blog grid the first time an editor writes a longer headline.

**Casey (Distracted Mobile User):** Casey is the persona who actually hits the confirmed P0 defect: at 390px the header nav doesn't wrap, the Donate button is pushed off-screen, the hero headline clips mid-word, and both CTA paragraphs are cut off rather than wrapping. This is the single biggest concrete failure this critique found, and it lands on exactly the persona most likely to be a first-time, on-the-go supporter.

## Minor Observations

- Both the header and the `Closer` footer component render the same logo image independently with no distinct role difference beyond size — mildly redundant.
- The `Masthead` component exists, is populated with real data ("Friends of Seguin Island" / "Bath, Maine" / "~ Est. 1986 ~"), and is unused anywhere — a missed "peak moment" opportunity, and a ready-made fix for the P1 mid-page-evidence issue above.
- The hero's `showIcon` scroll-down affordance prop isn't used on the homepage at all — built but silently unused, same pattern as the Masthead.
- Nav "Donate" is the only nav item styled as a button while everything else is a plain text link — a reasonable emphasis choice, but undocumented in DESIGN.md as an intentional pattern.
- Driftwood Taupe on white computes to roughly 4.8:1 contrast — passes WCAG AA for normal text but with a thin enough margin to periodically recheck under non-sRGB rendering.
- The detector's live-URL scan silently reported exit code 0 with an empty result when the Chrome binary wasn't found on one pass (masked by `IMPECCABLE_BROWSER` env var once set) — not a site defect, but worth knowing if you rerun `impeccable detect` yourself and get a suspiciously clean result.

## Questions to Consider

1. What if the hero headline were replaced entirely with the coordinate line as the primary type element, paired with a single fact sentence ("Home to the only operational first-order Fresnel lens north of Rhode Island") — would that out-perform a conventional headline/tagline pairing for a mission this specific?
2. What if the homepage's "Become a Member" card carried a concrete dollar anchor ("$10/month keeps the light on") instead of abstract mission language — does concreteness beat mission-statement phrasing for a $10–$1000 tiered ask?
3. What if the unused Masthead component — already populated with "Est. 1986" — became the page's actual hero treatment, foregrounding provenance and permanence ahead of a travel-brochure headline?
