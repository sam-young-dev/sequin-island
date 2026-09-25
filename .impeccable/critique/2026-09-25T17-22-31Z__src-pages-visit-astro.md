---
target: visit page
total_score: 31
max_score: 36
na_heuristics: 10
p0_count: 1
p1_count: 1
target_identity: "file:C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\visit.astro"
target_fingerprint: "sha256:ccff6182fade8690ee271d46fabf36583f6940bd1622f71b008a0d5cba45ebcb"
target_path: "C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\visit.astro"
timestamp: 2026-09-25T17-22-31Z
slug: src-pages-visit-astro
---
Method: dual-agent (A: general-purpose source review · B: general-purpose detector scan)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Tide band has loading/error/saved/ready states; scrollspy marks current/passed steps; 3D route reports WebGL-lost/offline states with real copy. |
| 2 | Match Between System and Real World | 4 | Nautical vocabulary (watch stander, chart plotter vs. paper charts, mooring vs. anchoring) is explained inline; facts stated in real units. |
| 3 | User Control and Freedom | 3 | Tide scrub has Escape-to-now, day-stepping, "Back to now"; minor gap getting back to top from deep in "Staying over." |
| 4 | Consistency and Standards | 4 | `.visit-row` ledger pattern and the two `.visit-callout` treatments repeat consistently; brand color tokens used exactly per the documented rules, no leakage found. |
| 5 | Error Prevention | 3 | Strong technical error handling (NOAA fetch failure, offline, no-WebGL), but the hardcoded `GUEST_ROOM_PAUSED = 2026` conditional is a content error waiting to happen. |
| 6 | Recognition Rather Than Recall | 3 | Tide band and "Coming ashore" cross-link well, but the unpublished landing-window rule forces the visitor to carry unresolved uncertainty across two callouts. |
| 7 | Flexibility and Efficiency of Use | 3 | Keyboard arrow-key + drag scrubbing and day-stepping are real power-user affordances for an informational page. |
| 8 | Aesthetic and Minimalist Design | 3 | Ledger rows are clean, but "Getting there"'s boat/kayak safety copy runs three dense un-chunked paragraphs, heavier than the rest of the page. |
| 9 | Error Recovery | 4 | Tide fetch failures are plain-language with working retry, distinguishing "NOAA didn't answer" from "you appear offline." |
| 10 | Help and Documentation | n/a | The page functions as its own documentation on this informational surface; the one real gap (the landing threshold) is a content gap, not a missing-help-affordance gap. |
| **Total** | | **31/36** | **Good (86%)** |

## Design Specificity Verdict

**LLM assessment**: This is not a generic "plan your trip" template with lighthouse copy dropped in — it is built for this exact tidal crossing. Evidence: a live NOAA tide fetch (station 8417177) with a localStorage-cached fallback specifically because boats near the marina lose signal; named operator/vessel facts (RippleSmith Sailing, Captain Shawn Mercer, the training schooner Harvey Gamage on the BRAVO mooring); the chart-plotter-vs-raster-chart distinction; a real $20/$30/$40 mooring donation ledger; USGS-measured trail elevation; and a prose voice ("go slow on your approach," "Walk the trail, not the tramway") that reads as written by someone who has made the trip. Color-token discipline is followed, not just documented: Keeper's Brick appears only on the primary support button, Fog only in the tide band, and every in-page accent uses Granite or Keeper Black, exactly matching the "Granite Rule" and "Fog Belongs to the Sea" rule in DESIGN.md.

**Deterministic scan**: `impeccable detect --json` ran clean (exit 0, zero findings) across `visit.astro`, `VisitRoute.astro`, and `TideClock.astro`, individually and combined. No rule violations, so no false positives to weigh.

**Visual overlays**: Browser automation was not available in this session for either assessment, so no live-page screenshots or injected-detector console output could be gathered. This critique rests on a full source-level read of the page, its two components, and their stylesheets, cross-checked against the design tokens. Nothing here should be read as a claim about rendered pixel behavior (overflow, contrast, wrapping) — only about markup, logic, and copy.

## Overall Impression

The page is the most specifically-authored piece of this rebuild seen so far: the tide widget alone is bespoke engineering for a real operational problem, and the copy is written by people who know the island. The gap isn't craft, it's content: the single highest-stakes question a trip planner has ("can I land today?") is explicitly unanswered by the page and resolved only by a phone call, twice, without office hours given. A beautifully engineered tide chart that can't say "the beach is open" at the moment of decision is the biggest missed opportunity here.

## What's Working

1. **TideClock is real, not decorative.** Live NOAA fetch, offline-tolerant caching, keyboard/drag scrubbing, day-stepping a week out, reduced-motion and forced-colors handling, and a no-JS fallback that still shows the facts. This is what "authored for this product" looks like in code, not just copy.
2. **The landing rule is cross-referenced, not duplicated by accident.** The tide band's landing note and the "Coming ashore" callout deliberately rhyme (matching rule, matching CTA styling) so the same safety-critical fact reads as one idea encountered twice — a real IA decision, not two writers who forgot about each other.
3. **Color-token discipline holds under inspection.** Keeper's Brick, Fog, and Granite are used exactly where DESIGN.md says they should be and nowhere else, verified by tracing the tokens through the stylesheets rather than taking the intent on faith.

## Priority Issues

**[P0] The page's single most important fact is explicitly unpublished at the exact decision gate.**
- **Why it matters**: Both the tide band and the "Coming ashore" callout state that the tide level that closes the landing beach "isn't published" and tell the visitor to call the office — with no hours given, in two places. This is the highest-consequence question on the page (can I even land today), and the sophisticated tide UI built around it can't answer it.
- **Fix**: Get FOSILS to supply the actual threshold (e.g., "above X ft MLLW") so TideClock can render a real open/closed state — it already computes height and trend, so this is one added rule, not a rebuild. Short of that, publish office hours next to both "call the office" instances.
- **Suggested command**: `/impeccable clarify`

**[P1] A hardcoded year cutoff is a stale-content landmine.**
- **Why it matters**: `GUEST_ROOM_PAUSED = 2026` flips the guest-room copy from a dated, factual closure notice to a permanent "ask the office" for every year after 2026, with nothing forcing a revisit. It will drift silently once whoever wrote it moves on, exactly the kind of edge case that erodes trust in a volunteer-run site over time.
- **Fix**: Turn this into a CMS-editable field rather than a source constant, since the site is expected to outlive this line of code.
- **Suggested command**: `/impeccable harden`

**[P2] A content-marketing link dilutes the tide band's single focus.**
- **Why it matters**: The "Latest: [blog post]" teaser is nested inside the Tower-status row of the tide band, mixing an unrelated link into a safety/status readout at the exact moment a visitor is deciding whether to go — directly against the component's own CSS comment that this column should stay quiet and subordinate to the tide figure.
- **Fix**: Move the "latest dispatch" link out of the tide band entirely, or to a clearly separate, lower-priority slot elsewhere on the page.
- **Suggested command**: `/impeccable distill`

**[P2] "Not accessible to wheelchairs" is a hard stop with no alternative framing.**
- **Why it matters**: The access callout states the trail is steep and the island isn't wheelchair-accessible, then stops. It doesn't say whether a mobility-limited visitor can still enjoy the landing, boat house, or museum grounds without the climb, so as written it risks discouraging a whole visit rather than just the summit.
- **Fix**: Either state what is possible at ground level, or say plainly "we don't have a good answer for partial-mobility visits yet, call us" — more honest than implying total exclusion.
- **Suggested command**: `/impeccable clarify`

**[P3] Undifferentiated safety prose in "Getting there."**
- **Why it matters**: The by-boat and by-kayak rows stack three dense paragraphs (chart plotter guidance, hazard rocks, swell/current/fog) with no sub-structure, while lower-stakes content ("Bring," "Please don't") gets scannable bulleted lists. The highest-consequence content for self-piloting visitors is the least skimmable.
- **Fix**: Break the boat/kayak guidance into the same chunked list treatment used elsewhere on the page.
- **Suggested command**: `/impeccable layout`

## Persona Red Flags

**Jordan (Confused First-Timer, safety-anxious)**: Hits the "landing rule unpublished, call the office" dead-end right at the pivotal go/no-go decision, and the boat-approach paragraphs pile on fear-specific detail (fog, swell, current, "foggiest place off the coast of Maine") with no equivalent "here's how people actually do this safely each summer" counterweight. Likely outcome: anxious hesitation, with no proactive "not sure? call us" framing offered up front.

**Riley (Deliberate Stress Tester)**: The `GUEST_ROOM_PAUSED = 2026` cutoff is the obvious target: a one-line hardcoded sunset with no forcing function to revisit it. Also worth a second look: `seasonState()` is evaluated independently in both `visit.astro` and inside `TideClock.astro`, two separate reads of "now" for what should be one source of truth.

**Sam (Accessibility-Dependent User)**: Mixed picture. The 3D route map is genuinely well built for this persona: it's always backed by a real `<ol>` of stops even without JS/WebGL, has live-region announcements matching the sighted-user copy, keyboard-operable controls, and a `forced-colors` mode. But the page's one explicit accessibility statement, "not accessible to wheelchairs," gets none of that same care.

## Minor Observations

- The ferry captain's phone number sits as plain inline text, while the office number gets a dedicated styled button in the tide band — the two most important phone numbers on the page carry noticeably different visual weight.
- The mooring donation table uses a proper `<caption>` and `<th scope="row">` headers — solid accessible table markup.
- `.visit-callout` is deliberately capped at two uses per its own CSS comment, and the current build honors that constraint.
- The scrollspy re-measures on `ResizeObserver` specifically because the guest-room conditional text can change section height, a reasoned fix for a real edge case, even though the underlying year-cutoff (P1) is still fragile.

## Questions to Consider

- If the page's single most important question ("can I land today?") always resolves to "call the office," is the elaborate scrub/day-step tide chart solving the right problem, or polishing the UI around a data gap the phone call already has to close?
- Is "not accessible to wheelchairs" the complete accessibility story, or is it silence standing in for "we don't actually know what's possible at ground level"?
- Is a `.astro` file the right home for a time-bound operational fact that needs to flip correctly years from now with no one thinking about it?
