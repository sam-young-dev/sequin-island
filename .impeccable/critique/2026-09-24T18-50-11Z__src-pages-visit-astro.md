---
target: Plan your visit (/visit)
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\visit.astro"
target_fingerprint: "sha256:5071973e7c90f53a7a9f467c5cd8ee902e316a5013524eaf68266dd7091280ba"
target_path: "C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\visit.astro"
timestamp: 2026-09-24T18-50-11Z
slug: src-pages-visit-astro
---
Method: dual-agent (A: design review · B: detector + CDP browser overlay)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Live tide, season, step rail are clear; loading state is a blank Fog band with a faded "– ft" for up to 12s |
| 2 | Match System / Real World | 3 | Nautical voice fits boaters; "3.8 ft", MLLW, BRAVO mooring mean nothing to ferry passengers |
| 3 | User Control and Freedom | 3 | Scrub has Back to now + Escape; auto-tour yields to pointer/wheel |
| 4 | Consistency and Standards | 3 | Strong system fidelity; three circle vocabularies; rail label ≠ h2 ("What to bring") |
| 5 | Error Prevention | 2 | Dock vs beach copy contradicts; in-season copy shown off-season |
| 6 | Recognition Rather Than Recall | 3 | Landing rule (¾ of tide cycle) lives ~1500px below the curve it depends on |
| 7 | Flexibility and Efficiency | 2 | Tide window is only now±36h; planners plan for Saturday |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained and on-system; three display-scale headings stack in 1.3 viewports |
| 9 | Error Recovery | 3 | NOAA error/offline/retry and map no-WebGL/retry states, plain language |
| 10 | Help and Documentation | 2 | Duncan / Coast Pilot / MITA named but not linked; no trip-questions contact |
| **Total** | | **27/40** | **Acceptable (upper end)** |

## Design Specificity Verdict

LLM: the first viewport is authored for Seguin (live NOAA Hunniwell Point curve, honest offset, runtime season/caretaker status, no photo hero). Below the band the form becomes a generic docs pattern (numbered steps, sticky rail, dl ledger, bring/don't lists); specificity lives in content (BRAVO mooring, cable under the cove, "walk the trail, not the tramway"). Biggest miss: the tide band never connects to the landing: the page says the sea decides the visit but doesn't show how.

Deterministic: CLI detect clean (0) on visit.astro, TideClock.astro, VisitRoute.astro, BaseLayout, src/components. Browser overlay (CDP injection): 9 findings at 1440, 10 at 390. tight-leading 1.15 on p.visit-intro__lead + 6× p.visit-part__lead (real; --leading-snug on multi-line step-2 leads, visit.css:22-25, 226-230), tide status dd/span 1.15 (real, tide.css:97-100); tight-leading 1.25 on p.support__lead (false positive, step-4 display text); cramped-padding on p.island-map__credit at 390 (false positive, deliberate attribution chip). Detector and review agree the system itself (Fog, tabular figures, 7px, Brick once) is clean.

## Priority Issues

1. [P1] Landing copy contradicts itself and the tide never says what it means for landing. visit.astro:19 ("dock… don't land on the beach"), :125 ("drop passengers at the dock"), :150 ("pier under way… small beach… ¾ of the tide cycle"). Fix: reconcile with FOSILS (already in brief's Unresolved), add a "Landing" status row to the band, later shade the unreachable part of the curve. /impeccable clarify
2. [P1] Body ignores the off-season state the band reports. :59 lead implies today, :97 "two trips a day" unqualified, :150 and :200 hard-code 2026. Fix: season-aware sentence under h1 when !open, qualify ferry "in season", de-year the pier/Guest Room copy. /impeccable harden
3. [P2] No-JS / slow-NOAA first viewport is an empty band with a permanent "Loading…" and "– ft" (TideClock.astro:21-24, 58; tide.css:141-148). Fix: SSR neutral copy, NOAA link in the figure slot, collapse plot until ready, inject scrub input from JS. /impeccable harden
4. [P2] Paddlers (primary in brief) get no route, and :19 reads as a ban. Fix: "By kayak" row from published/MITA guidance, clarify beach rule for hand-carried boats, else give office phone. /impeccable clarify
5. [P2] Can't plan a future day (TideClock.astro:219-225). Fix: ≤7-day stepper via NOAA begin_date/range, or at minimum a visible "week's tides on NOAA" link. /impeccable shape

## Persona Red Flags

Kayaker: no kayak row; beach rule reads as a ban; can't pick a launch time or see the weekend tide.
Prospective member: the $20–40/visit vs $50/yr membership arithmetic is never made; camping row doesn't restate members-only.
Accessibility-dependent: auto-tour flips aria-pressed every 2.6s, no pause, not stopped by focus/keys (VisitRoute.astro:68-74,118-119); mooring table has no th/scope (visit.astro:131-133); readout not a live region; nothing tells sighted keyboard users arrows scrub.

## Minor Observations

- Tight 1.15 leading on multi-line leads and tide status (detector-confirmed); DESIGN.md says step-3 leads, code uses step-2.
- Duncan / Coast Pilot / MITA should be links (:108).
- Trash reminder sits in Reservations row and repeats part 4 (:216).
- Off-season "Latest:" blog link points to a July post without an age cue.
- Band heading "The tide today" is the smallest heading on the most important element.
- Map loading stage is ~44rem of empty Fog; a static aerial backdrop would read less broken.
- Mobile header wraps to 3 rows before the h1, pushing the band down.

## Questions to Consider

- Is "3.8 ft" the right hero number, or should it be the decision ("Good landing until 3:10 pm") once FOSILS confirms the window?
- Should the off-season page open on "Caretakers back May 31" and a membership path, with the tide secondary?
- What if the curve itself showed when Seguin is reachable?
