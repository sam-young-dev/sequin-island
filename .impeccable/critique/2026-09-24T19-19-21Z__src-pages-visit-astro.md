---
target: src/pages/visit.astro
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\visit.astro"
target_fingerprint: "sha256:b238b0b1d386635d9e1baf1df8556b21bd14356155d78c92e02c23be5651c3c5"
target_path: "C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\visit.astro"
timestamp: 2026-09-24T19-19-21Z
slug: src-pages-visit-astro
closed: true
---
Method: dual-agent (A: design review · B: detector + browser)

Captured 2026-09-24, off-season state.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Now-marker, loading waterline, step rail and announcer are good; tour stop state flashes illegibly for 250ms |
| 2 | Match System / Real World | 3 | "About three quarters of the tide cycle" is never tied to the curve |
| 3 | User Control and Freedom | 3 | Back to now, Esc and day stepping work; the camera tour has no explicit pause |
| 4 | Consistency and Standards | 3 | Tide buttons 36px vs 44px elsewhere; missing space in the Staying over lead |
| 5 | Error Prevention | 2 | "1.5 ft, falling" gives no cue about whether it is a landable window |
| 6 | Recognition Rather Than Recall | 3 | The tide sits about 2000px above "The landing" |
| 7 | Flexibility and Efficiency | 3 | Scrub, 6 days ahead, anchors, tel: links; no hour step on PageUp/PageDown |
| 8 | Aesthetic and Minimalist Design | 3 | "Off season" appears 4 times; a fog void top-left on desktop |
| 9 | Error Recovery | 3 | NOAA failure gives Try again, an offline message and a NOAA link |
| 10 | Help and Documentation | 3 | Scrub hint and sources are shown; nothing says what a height means for landing |
| **Total** | | **29/40** | **Good** |

## Design Specificity Verdict
- **Authored for Seguin:** a live NOAA curve for Hunniwell Point, the climb on the real terrain, and island-specific copy. The Granite, Brick and Fog rules all hold.
- **Thesis half-delivered:** the curve never says what the sea decides.
- **First viewport misses the brief:**
  - The desktop band is 83% of the viewport, not 55%.
  - On mobile the curve is cut off by a 217px header and a 369px intro.
- **Detector:**
  - The CLI scan is clean.
  - In the browser, tight-leading on `.support__lead` (1.25; the rule needs at least 1.3) is a true positive.
  - Cramped padding on `.island-map__credit` at mobile is a true positive, P3.

## Priority Issues
1. **[P1] The tide doesn't answer "can I land?"** (TideClock.astro Landing entry, far from the readout)
   - Fix: move Landing under the height, and add a near-low-water line that tells the reader to call before going.
   - Shade the closed window once FOSILS confirms it.
   - Command: /impeccable clarify
2. **[P1] The mobile first viewport is spent on the nav (3 rows, 217px) and caveats** (visit.astro:71)
   - Fix: fold the off-season note into Season, cut the lead to one line, and add a compact mobile nav.
   - Command: /impeccable adapt
3. **[P2] Desktop tide band composition** (tide.css:19-25, `align-items: end`)
   - A fog void opens top-left, and the controls fall below the fold.
   - Fix: align to start, fold Caretakers and Tower off-season into one line, and bring the band to about 55-60vh.
   - Commands: /impeccable layout, then /impeccable distill
4. **[P2] Missing space: "Members can camp on the island.Ask the office…"** (visit.astro:220-223)
   - Command: /impeccable polish
5. **[P3] Route stop flash during the tour** (route.css:63 transitions only background-color)
   - Text is white on white for 250ms, and the map pill lags the list by one step.
   - Command: /impeccable polish

## Persona Red Flags
- **Jordan:**
  - "Three quarters of the tide cycle" gives no usable time.
  - "Chart plotter" and "watch stander" are jargon.
  - The ferry row has only a phone number.
- **Casey:**
  - Previous/Next day buttons are 36px.
  - The now-rule crosses the low label on the narrow plot.
  - The route stage is 591px tall, a scroll-trap risk.
  - The sticky strip plus the header leave little reading room.
- **Sam:**
  - Route button names run together ("Lighthouse TrailAbout 130 feet…").
  - The 13s auto tour changes aria-pressed with no pause control (WCAG 2.2.2).
  - With JS off, the stop buttons do nothing.
- **Kayaker/boater:**
  - The 6-day tide limit means no July planning in the off season, and nothing links to NOAA's annual tables.
  - There is no launch point or distance.
  - The mooring donation appears 3 times; the landing window appears in none.

## Minor Observations
- On desktop the intro h1 sits bottom-left and the lead top-right, so they read as unrelated columns.
- `.support__lead` line-height is 1.25 (DESIGN.md says at least 1.3); this is shared with the home page.
- `.island-map__credit` padding is 1.8px, and the OSM link is 82x12.
- The $20-40 mooring figure is repeated a third time in the support band.
- In next-day mode, "The tide tomorrow" shows no visible date.

## Questions to Consider
- Should the hero be "Next good landing: …" with the height demoted?
- Off season, should the story flip to "plan for May"?
- Would one still cove-to-tower frame with a "walk it" button beat the 13s auto tour?
