---
target: map
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\map.astro"
target_fingerprint: "sha256:e35ddb9d354418f43f698a5dbaed002444f999070c60b09bb61903c9baa41f82"
target_path: "C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\map.astro"
timestamp: 2026-09-24T17-22-19Z
slug: src-pages-map-astro
---
Method: dual-agent (A: design review · B: detector + browser)

# Critique: /map (src/pages/map.astro, src/components/island-map/)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Good load/slow/lost states; mobile list taps change an off-screen stage |
| 2 | Match System / Real World | 3 | Real terrain; no north/scale; Landing silent on tide |
| 3 | User Control and Freedom | 3 | Reset/close/Escape work; no zoom buttons; Reset shown at home view |
| 4 | Consistency and Standards | 3 | Hover == selected (Keeper Black); "Right-drag" hint on touch |
| 5 | Error Prevention | 2 | touch-action:none on 78svh stage traps mobile scroll |
| 6 | Recognition Rather Than Recall | 3 | Only 4/8 labels (2/8 mobile) at home view |
| 7 | Flexibility and Efficiency | 2 | No keyboard orbit/zoom; no ?place= deep link |
| 8 | Aesthetic and Minimalist Design | 3 | Calm, on-system; intro pushes stage past desktop fold |
| 9 | Error Recovery | 3 | Retry + aerial fallback + working list; drag hint persists without WebGL |
| 10 | Help and Documentation | 2 | One quiet mouse-only hint, below fold on mobile |
| **Total** | | **27/40** | **Acceptable** |

## Design Specificity Verdict
Map is unmistakably Seguin (lidar terrain, cove, tramway, brick roofs, beam); the page shell (h1, paragraph, stage, 8 flat buttons) is generic. No tide/landing/season/trail facts. Fog stage is only visible during load; rendered stage is mostly dark teal WATER_COLOR 0x3f6f86 (viewer.ts:17).
Detector: CLI clean (exit 0). Browser: skipped-heading (real, IslandMap.astro:25 h3 before h2 at :44); cramped-padding on .island-map__credit at 390px (real, island-map.css:185); dark-glow (false positive, detector's own overlay). Overlays headless only.

## Priority Issues
1. [P1] No visit-planning facts, no support path. Fix: "Coming ashore" in Landing (3/4 tide cycle, 9-ft tide, small beach, 2026 pier); selectable named trails; one contextual link per panel; membership closer CTA. Cmd: clarify, shape.
2. [P1] Mobile scroll trap (island-map.css:16, :27) and off-screen selection. Fix: shorter stage on narrow screens, tap-to-explore with pan-y, scroll stage into view on pick, consider chip row above stage. Cmd: adapt.
3. [P2] 3D view not keyboard-operable; h1→h3→h2; jumpy Tab order. Fix: focusable stage with arrow/+/-/0 keys, zoom buttons, aria-controls, fix heading order. Cmd: harden.
4. [P2] 8 flat list items, no starting point; hover == selected. Fix: group (Light station / The cove / Shore & trails), guided tour, lighter hover. Cmd: layout, delight.
5. [P3] Flat load wait; non-adaptive copy. Fix: aerial poster behind loader, tighten intro to fit 900px, hide Reset at home, per-input hint, pad credit. Cmd: polish.

## Persona Red Flags
- Jordan: 4/8 labels at home, no starting point, page ends abruptly.
- Sam: no keyboard 3D control, jumpy Tab, h1→h3→h2, panel only via aria-live.
- Casey: scroll trap, 1.5 MB loads on first screen, no poster, panel covers credit, off-screen changes, right-drag hint.
- Kayak trip planner: Landing says nothing on tide window, beach, moorings, approach, or pier.

## Minor Observations
Small Granite panel h3; no compass; unexplained unnamed trails and Donkey House missing from list; beam busy at close zoom; empty space right of desktop intro; credit wraps with mismatched band on mobile.

## Questions to Consider
- Should /map be the Plan-your-visit page?
- Guided walk from tide line to lens ending in a join CTA?
- Mobile: annotated aerial first, 3D opt-in?
