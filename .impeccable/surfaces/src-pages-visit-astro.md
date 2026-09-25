---
version: 1
slug: "src-pages-visit-astro"
primary_target: "src/pages/visit.astro"
related_targets: ["src/components/tide-clock/TideClock.astro"]
---

# Plan Your Visit (/visit)

**Mode:** Read. The trip planner's question: can I go, how do I get there and ashore, and what do I need to know once I'm on the island?

**Audience and job:** day-trippers, boaters and paddlers (primary on this page), plus members who want to camp. Every fact comes from seguinisland.org's travel, mooring, guidelines and stay pages, or from the repo's about.md. Where they conflict, the newest statement wins: the 2026 pier, Keeper's Guest Room paused for 2026, camping open to members, and the season Memorial Day to Labor Day. The remaining conflicts are listed under "Unresolved" for FOSILS to confirm.

**Action:** plan the trip, then take one quiet step toward membership (moorings and camping are member benefits).

**Constraints:** no invented schedule, prices or landing window. NOAA predictions are for Hunniwell Point (station 8417177), labelled as such. Page must work without JS (static tide note, route list).

**Unresolved:** (2026-09-24: until FOSILS confirms, the page treats the newest statement as current, so passengers land on the small beach until the pier is finished and all "dock" wording is gone.) the caretaker season end (Labor Day vs Columbus Day); the dock tie-up rule once the pier is finished; which part of the tide cycle closes the beach landing; whether the ferry operator is current.

## Direction contract

THESIS: The sea decides the visit, so the page opens on today's tide instead of a scenic hero. It refuses the category's photo hero, icon-tile "Getting Here" row and FAQ accordion.

OWN-WORLD: Granite & Fog as it stands. A full-bleed Fog band carries a drawn tide curve in Keeper Black hairline, filled with a deeper fog wash, with a Granite "now" rule and tabular Public Sans high/low marks. Everything else is on white with hairline ledger rows like the home page's "Only on Seguin". No cards and no icons. Brick is spent only on the header Donate.

STORY: Visitors see today's water, the season and the caretakers' status. Then two ways across (ferry, own boat), then the cove (moorings, dinghy, landing), then the climb, shown on the 3D terrain, then what to bring and the island's rules, then staying over. They leave knowing membership gives them moorings and camping.

FIRST VIEWPORT: The h1 "Plan your visit" and a one-line lead at the top left, in the wrapper. Below it a full-width Fog band roughly 55% of the viewport tall: a 36-hour tide curve spans the band, with the now-marker and next high/low figures at display scale on the left, and a quiet column on the right with Season, Caretakers and Tower status. Under the band, the five parts of the trip are numbered steps: a sticky rail beside the content on wide screens (ring markers on a hairline, like the route stops; the current step fills Keeper Black, passed steps stay dark), and a sticky strip at the top on narrow screens. Each section heading carries its filled step number. Ledger rows use a fixed 11rem label column.

FORM: The Tide Clock, candidate 5 of 7 on the grounded list (seed key 6968698f). The signature interaction: scrubbing the curve by pointer or arrow keys reads out the height at that time; the route map flies from the cove to the tower when the visitor presses "Walk the route" (2026-09-25: changed from on-scroll, so uninvited motion doesn't compete with the climb's access callout). Motion grammar: the curve draws in once and the now-marker settles, its grip chevrons leaning out twice as the drag hint; nothing else animates.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
