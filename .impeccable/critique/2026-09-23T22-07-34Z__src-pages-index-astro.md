---
target: home page against PRODUCT.md audiences before pitch
total_score: 19
max_score: 36
na_heuristics: 7
p0_count: 2
p1_count: 2
target_identity: "file:C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\index.astro"
target_fingerprint: "sha256:5aa7a30794ad28d494b8c547c2ac58b1e7cfdb63fe5033518eca51d0caabd5a2"
target_path: "C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\index.astro"
timestamp: 2026-09-23T22-07-34Z
slug: src-pages-index-astro
closed: true
---
Method: dual-agent (A: design review · B: detector/browser)

# Critique: Home page (src/pages/index.astro), judged as the FOSILS pitch

## Design Health Score
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | Post-season (Sep 23) with no closed/reopens status; only news is a July tower-closure post |
| 2 | Match with the real world | 2 | "Your Island Adventure Starts Here" reads as a tour company; the "Learn Our History" card's copy is about visiting |
| 3 | User control and freedom | 3 | Normal navigation; the ejoinme handoff is never mentioned |
| 4 | Consistency and standards | 2 | Charcoal secondary button outweighs the granite primary; footer nav drops Donate; h2s repeat button labels |
| 5 | Error prevention | 2 | Placeholder excerpt "test" / description "desc" ship; the schema accepts any string |
| 6 | Recognition rather than recall | 2 | No Visit route; tide and landing facts buried under About |
| 7 | Flexibility and efficiency | n/a | Single persuasion page |
| 8 | Aesthetic and minimalist design | 2 | Empty rather than pared back; opens on the mission statement; upscaled closer logo |
| 9 | Error recovery | 3 | No error states; empty-blog fallback exists |
| 10 | Help and documentation | 1 | No tide, landing, mooring or season information for trip planners |
| **Total** | | **19/36** | **Acceptable (53%)** |

## Design Specificity Verdict
Generic nonprofit template (hero, mission, two CTA cards, blog grid, logo band). Only the coordinates eyebrow is specific to Seguin. Missing: highest lighthouse in Maine, the first-order Fresnel and its petition, the 1890 tramway, the 3D map, the caretakers' voice. Detector: CLI scan clean (0 findings across index plus 7 layouts and components). The overlay's 2 low-contrast hits on the hero eyebrow and h1 are false positives (it ignored the photo and gradient), with a real caveat: the text sits where the gradient is only 0-45% dark, and on mobile the h1 crosses the lantern and sky.

## Priority Issues
- [P0] Placeholder blog content ("test"); a six-slot grid shows one 256px card; the Card aria-label hides the date and excerpt. Fix: write a real excerpt, add a schema min, show one featured post, remove the aria-label. /impeccable harden
- [P0] No trip-planner route: season, 9-ft tide, landing, moorings, trails and what's open are all absent; no Visit nav item. Fix: a "Plan your visit" band from about.md facts, plus a CMS season-status line. /impeccable shape, then /impeccable clarify
- [P1] Generic hero with no CTA; the mobile hero is 196px under a two-row nav and the first CTA is ~974px down. Fix: a distinction-led headline, a Become a Member primary, ~60svh on mobile, retuned gradient. /impeccable bolder, then /impeccable layout
- [P1] The support ask has no reason, reassurance or hierarchy: no 501(c)(3), tiers, benefits, capital needs or ejoinme notice. Fix: a "keep the light on" block with real about.md figures and a dominant membership button. /impeccable clarify, then /impeccable colorize
- [P2] The 3D map is hidden; the closer logo is upscaled 1.47x and blurry. Fix: a map teaser, a caretaker quote, a crisp logo. /impeccable delight or /impeccable overdrive

## Persona Red Flags
- Donor: no reason to give, tiers, tax status or benefits; a two-hop handoff (/membership, then ejoinme) that's never explained.
- Trip planner: dead end; no season status, tide or landing info; a stale July post.
- Board member: their mission sentence, a stock headline, a "test" card and a blown-up logo; no sign of the map or the capital needs.
- Jordan: "Island Adventure" reads as a tour operator; history and visiting copy are mixed together.
- Riley: excerpt "test"; no skip link; mission wording differs from about.md; the coordinates have no source.
- Casey: 16px-tall nav links, 16 tap targets under 44x44, Donate top-right, thin hero.

## Minor Observations
- Hero block centered but text left-aligned; dead commented-out CSS in hero.css.
- Eyebrow has no label treatment.
- Granite headings pass AA at 4.8:1 with no margin.
- "Visitors of all ages" is unbacked.
- Page weight measured in dev mode only.

## Questions to Consider
- What on the first screen shows the board this beats the current site? Why isn't it the 3D island?
- Why "adventure" when Seguin holds three records?
- What should the page say in the off-season, and who updates it?
- Is Membership or Donate the primary action?
