---
target: visit page
total_score: 31
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
target_identity: "file:C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\visit.astro"
target_fingerprint: "sha256:6af2ff93ffc608127bbe60288bab1d238b95e02a7834a78831660943d6852cc0"
target_path: "C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\visit.astro"
timestamp: 2026-09-25T15-35-30Z
slug: src-pages-visit-astro
closed: true
---
Method: dual-agent (A: general-purpose design-review subagent · B: general-purpose detector/browser-evidence subagent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Tide band and route stage both have real loading/error/offline states, but the sticky step-rail's "current step" is a fragile 0.33-viewport-height scroll heuristic with no ResizeObserver for lazy-loaded content shifting section heights. |
| 2 | Match System / Real World | 4 | Real names throughout (RippleSmith Sailing, Captain Shawn Mercer, BRAVO mooring, Cobble Beach, Hunniwell Point station 8417177); mariner language ("rising," "the cove," "the climb"). |
| 3 | User Control and Freedom | 3 | Tide scrub Escapes to now with a "Back to now" control; route tour yields on any interaction. No way to jump straight to "the climb" without scrolling past two long, dense sections first. |
| 4 | Consistency and Standards | 4 | Ledger-row pattern, numbered markers, and ring-and-thread motif are reused disciplined across tide status, visit rows, and route stops. |
| 5 | Error Prevention | 3 | NOAA fetch and route-load failures both have retry + fallback. But a tide-height readout and the separate "is landing safe" verdict aren't causally linked for the reader — nothing stops someone reading "rising, 9.2ft" as an answer to the wrong question. |
| 6 | Recognition Rather Than Recall | 3 | Step rail keeps section names visible, but the "exact landing window isn't published" caveat is restated near-verbatim in two places (the tide band and Coming Ashore) instead of one source with a pointer. |
| 7 | Flexibility and Efficiency | 2 | Arrow-key scrub and day-stepping are a real power-user path, but there's no deep link to a specific day/time and no way to skip ahead past 5 numbered steps to the one you want. |
| 8 | Aesthetic and Minimalist Design | 3 | Palette discipline is strong, but "Getting there" packs the boat and kayak rows with 5-6 distinct facts each (chart type, hazard, guides, phone) as unbroken prose rather than a skimmable chunk, and the tide band's caption strip crowds four controls plus a hint under the page's visual centerpiece. |
| 9 | Error Recovery | 3 | Tide and route error states both give a human-readable reason, retry, and a fallback (NOAA link / aerial photo). |
| 10 | Help and Documentation | 3 | "Call the office" is the correct, domain-appropriate help channel for facts PRODUCT.md forbids fabricating (ferry schedule, exact landing window, guest-room status); NOAA source is properly labeled. |
| **Total** | | **31/40** | **Good** |

Both heuristics 7 and 10 genuinely apply to this Read-mode planning page (a returning visitor benefits from shortcuts; the page's entire job is answering questions unassisted), so neither was marked n/a — the applicable maximum is the full 40.

## Design Specificity Verdict

**LLM assessment**: This is not a template with Seguin's name swapped in. The whole page is built around one unrepeatable fact — Seguin is reached across a tide that isn't always crossable — and copy carries real proper nouns throughout (RippleSmith Sailing, Captain Shawn Mercer, the BRAVO mooring, Cobble Beach, Roger Duncan's cruising guide, NOAA station 8417177). The structural conceit — opening on a live, computed tide curve instead of a photo hero — is a genuine, risky choice that only makes sense for this subject, and it's actually engineered to the bar it claims: live NOAA data, pointer- and arrow-key scrubbing, a `role="status"` announcer, and a real no-JS static fallback. The five-step story mirrors the trip's real causality (across → ashore → up → pack → sleep), and the route stage reuses the real 3D terrain rather than a generic embedded map. Two patches pull toward category-interchangeable: the kayak row, which largely recycles the boat row's hazard paragraph rather than being built for paddlers independently, and the closing membership CTA block, whose shape (heading, lead, terms, two links) resembles any donation upsell. Net: specific and well-earned; the generic patches are real but don't undermine the whole.

**Deterministic scan**: The bundled static detector ran clean against `visit.astro`, `TideClock.astro`, and `VisitRoute.astro` — exit code 0, zero findings (run twice to confirm). No browser/screenshot/automation tool was exposed to either assessment this run (Assessment B searched the deferred-tool registry and confirmed none registered; `WebFetch` explicitly refuses localhost). A dev server was already running at `localhost:4321` (confirmed live via `curl` → 200) but nothing could render or capture it, so no injected-detector console findings and no screenshots exist from this run. Treat the static `[]` result as inconclusive rather than a clean bill of health — it means the AST-level rule set found nothing, not that the page is free of the spacing/contrast/responsive issues a browser pass would catch. A prior critique run (2026-09-25T15-10-17Z, before the two most recent commits) did get live browser evidence once and found a real mobile-width `cramped-padding` warning (7.2px vs 8.0px) it couldn't localize to a source line; that evidence predates the current commit and could not be reconfirmed or refuted this run.

**Visual overlays**: Not available this run. No user-visible overlay exists in any browser tab — no browser automation tool was exposed to this session at all, so no injection was attempted (this is a hard capability gap, not a failed attempt). The one concrete signal is that the page is live and returns 200 at `http://localhost:4321/visit`; nothing about its rendered layout, spacing, or the sticky-rail/route-tour interactions has been visually confirmed since the last commit ("critique items fixed," 6a25675).

## Overall Impression

The page earns its central bet. Leading with a live, computed tide chart instead of a lighthouse photo is exactly the right call for a boater or kayaker deciding whether today is workable, and the five-step structure mirrors the real causality of the trip without inventing a single fact PRODUCT.md says isn't on hand. The biggest opportunity is presentation at the two moments that matter most: the landing-safety fact is still typeset with no more weight than a mooring price, and the page's last beat before the membership ask is an unresolved, paused amenity rather than a settled note. A close second: this is the second critique run in a row where the sticky step-rail and route-tour — both load-bearing, first-viewport interactive pieces — ship unverified in an actual browser, because no browser tool has been available in either session. That's a real gap independent of code quality.

## What's Working

1. **The tide-as-hero interaction is engineered to the bar it claims, not just staged for it.** TideClock computes live NOAA data, supports pointer- and arrow-key scrubbing, announces state via `role="status"`, degrades to a static no-JS fallback that keeps the facts and drops only the chart, and handles forced-colors mode. Signature interaction, actually built.
2. **Failure-state parity between the two live subsystems.** Both TideClock and VisitRoute implement matched loading/slow-load/offline/error/retry states with graceful non-JS and non-WebGL fallbacks (aerial photo, static tide note) — disciplined engineering-as-design most marketing pages skip.
3. **The safety-fact cross-reference is a deliberate, specific IA decision.** The tide band's landing note and Coming Ashore's landing row are intentionally paired (both files' CSS comments call this out), stitching two physically distant parts of the page into one idea for a reader who lands on either half first — undermined only by the fact both instances have equal, unremarkable visual weight (see P1).

## Priority Issues

**[P1] The highest-stakes fact on the page is typeset identically to routine facts**
- **Why it matters**: The landing paragraph inside "Coming ashore" sits in the same `.visit-row` structure as "Moorings" and "The BRAVO mooring," differentiated only by a single bolded `<strong>Landing:</strong>` label. This is the exact fact a boater or kayaker under time pressure is scanning for, and PRODUCT.md itself frames tide/landing as the thing "visitors need, not fine print" — yet it reads as equal in weight to a mooring-donation amount.
- **Fix**: Give this one row a distinct treatment consistent with the existing vocabulary — pull it out of the ledger rhythm into its own hairline-bordered callout, or give it a Granite Gray accent rule that visually rhymes with the tide band's own landing note, so the two safety passages read as one reinforced idea instead of one flagged fact and one flat row.
- **Suggested command**: `/impeccable layout`

**[P2] The membership CTA follows directly after the least-resolved, most anxiety-inducing content**
- **Why it matters**: "Staying over" ends on the paused Keeper's Guest Room note, and the very next block is "Moor and camp as a member." This is a textbook peak-end violation: the last impression before the donation ask is "this amenity isn't available," not a settled note followed by an invitation — and this is the second consecutive critique to flag it unresolved.
- **Fix**: Reorder so "Staying over" isn't the last body section before the CTA (e.g., swap with "What to bring," ending on a neutral, procedural beat), or add one resolving sentence before the CTA reaffirming what *is* available now (camping is open) rather than closing on what's paused.
- **Suggested command**: `/impeccable layout`

**[P2] Kayakers, PRODUCT.md's named co-primary audience alongside boaters, get thinner and largely recycled treatment**
- **Why it matters**: The kayak row states FOSILS doesn't publish a separate paddler route, then reuses the boat row's hazard sentence near-verbatim. It does add a real solo-call-ahead line, but a paddler's actual question — is 2.5 miles of open Gulf of Maine water a reasonable solo crossing in a human-powered craft — is never addressed with anything paddler-specific (crossing time, VHF/PFD expectations, exposure).
- **Fix**: Either genuinely differentiate the kayak row (crossing time, paddler-specific hazard framing, why a solo check-in matters) or merge boat and kayak into one row with an explicit, non-duplicated paddler sub-note, instead of two full-weight rows that mostly say the same thing.
- **Suggested command**: `/impeccable clarify`

**[P3] The sticky step-rail's current-step detection is fragile and still unverified live**
- **Why it matters**: Current-step state is computed from a 0.33-viewport-height scroll threshold, checked only on scroll/resize, with no ResizeObserver on section content that changes height after late-loading (route/tide content, WebGL canvas). This is exactly the class of interaction the prior critique flagged as needing live verification and still couldn't reach, because no browser tool exists in either session.
- **Fix**: Verify live across viewport resizes and lazy-content-load timing; add a ResizeObserver on the visit sections in addition to the scroll/resize listeners.
- **Suggested command**: `/impeccable audit`

**[P3] The tide band's control cluster crowds four affordances into one strip under the display numeral**
- **Why it matters**: Hint text, Previous/Next day, and "Back to now" all sit in one flex-wrapped caption row directly beneath the page's visual centerpiece — for a first-viewport element meant to be scannable in seconds, that's a lot to parse before the reader has decided whether today's tide even works for them.
- **Fix**: Demote the hint text to a tooltip/title shown on first hover or focus rather than always-visible, and visually subordinate the day-stepper relative to "Back to now," which is the more urgent recovery action.
- **Suggested command**: `/impeccable quieter`

## Persona Red Flags

**Jordan (Confused First-Timer)**: Jordan lands on the tide band and reads "Rising. High water 9.2ft at 4:12pm" — that's a height, not a go/no-go verdict. To answer the actual question ("can I go today?") Jordan has to combine that number, a separate landing paragraph three rows down in a different section, and the fact that the exact closing window "isn't published," then call an office phone number for a real answer. The page never renders a plain-language verdict ("tide looks workable now" / "tide is tight, call ahead"), only raw data plus a disclaimer, for the single highest-stakes decision on the page.

**Sam (Accessibility-Dependent User)**: The bones are genuinely strong — `aria-valuetext` on the scrub, `role="status"` live regions on both tide and route, `aria-pressed` on stop buttons, forced-colors overrides, and reduced-motion handling on both the curve draw-in and the route's autoplay tour. The one real gap: the step-rail's `aria-current="step"` is set only via JS, so with JS disabled there's no "you are here" cue at all beyond a plain link list — an acceptable no-JS degradation per PRODUCT.md, but worth a deliberate look rather than an assumption it reads fine.

**Riley (Stress Tester)**: The day-stepper (tide view) and the season/guest-room status (build-time flag) run on two different time models with no code path connecting them — scrub the tide three days into next week and every other status column on the page still describes today, which could read as an internal contradiction under scrutiny. NOAA timeout/offline is handled well by contrast (retry + fallback, tested in code).

## Minor Observations

- No Brick Rule violations found: Keeper's Brick doesn't appear in `visit.astro`, `TideClock.astro`, `VisitRoute.astro`, or their CSS — Donate remains the only Brick element.
- No Flat Page Rule violations found: no `box-shadow` in `tide.css`, `route.css`, or `visit.css`.
- The mooring-price table correctly uses a semantic `<table>` with tabular Public Sans, matching the Ledger spec's sanctioned exception for prices.
- `visit-part__lead` caps at 60ch while row prose caps at 68ch — a minor measure-width wobble within the same section; both are inside the 70ch DESIGN.md ceiling, not a rule violation.
- The "9-foot tide" headline claim is hardcoded copy, not derived from the live NOAA series — worth confirming it stays accurate if the data range ever shifts.
- Static detector findings: zero, across all three files, run twice for confirmation. Treat as inconclusive rather than clean, since the class of issues this page is most exposed to (computed spacing/contrast at specific viewports, live interaction timing) isn't something a static AST scan reaches — no browser tool was available in this session to check that class of issue directly.
