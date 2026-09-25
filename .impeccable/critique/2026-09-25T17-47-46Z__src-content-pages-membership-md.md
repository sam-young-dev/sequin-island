---
target: membership
total_score: 15
max_score: 28
na_heuristics: 7,9,10
p0_count: 1
p1_count: 1
target_identity: "file:C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\content\\pages\\membership.md"
target_fingerprint: "sha256:4ca221ae57cda189ad13eb450941537c7207124da8ba44e2c8ca1b8c2ce9882b"
target_path: "C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\content\\pages\\membership.md"
timestamp: 2026-09-25T17-47-46Z
slug: src-content-pages-membership-md
closed: true
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | External purchase link opens in a new tab to a third-party domain with no cue before it opens. |
| 2 | Match System / Real World | 2 | Tier names are strong, but descending price order breaks the conventional ascending pricing-ladder model. |
| 3 | User Control and Freedom | 3 | No traps, but no framing before the external hop. |
| 4 | Consistency and Standards | 1 | The one page with priced, comparable options is structurally identical to plain prose pages; ignores the system's own Ledger price-table pattern. |
| 5 | Error Prevention | 3 | Low-stakes surface, mostly n/a. |
| 6 | Recognition Rather Than Recall | 1 | Comparing tiers requires scrolling and holding near-duplicate lists in memory. |
| 7 | Flexibility and Efficiency | n/a | No power-user surface applies. |
| 8 | Aesthetic and Minimalist Design | 2 | No hierarchy separating price/name/benefits within a tier. |
| 9 | Error Recovery | n/a | No error states exist. |
| 10 | Help and Documentation | n/a | Not applicable to this Persuade-mode surface. |
| **Total** | | **15/28** | **Acceptable (53.6%)** |

## Design Specificity Verdict

Reads as an unstyled markdown dump, not an authored membership page. `[slug].astro` wraps content in generic `.prose flow`; nothing in `membership.md` invokes anything Seguin-specific structurally. DESIGN.md documents a Ledger price-table sub-pattern built for exactly this content shape, but it was never built or applied here. Deterministic scan: `impeccable detect` on `[slug].astro` was defeated by a glob/bracket collision; a full-tree scan found only 2 sitewide advisory `design-system-radius` findings in `prose.css`, unrelated to membership specifically. No browser/screenshot tool was available in either sub-agent session; a raw HTML fetch of the live page corroborated the "no bespoke pricing treatment" claim structurally (no `<table>`, no card/grid wrapper).

## Priority Issues

**[P0] Membership content bypasses the design system's own documented Ledger price-table pattern entirely.** Give Membership its own template (precedent: About was split out of `[slug].astro` for the same reason) and render tiers as `.ledger__row`s with the documented price-table sub-pattern. → `/impeccable shape`, `/impeccable layout`.

**[P1] Three of four tiers repeat an identical five-line benefits block verbatim.** Collapse to a shared baseline + per-tier deltas. → `/impeccable clarify`, `/impeccable layout`.

**[P2] Tiers ordered most-expensive-first with no signal for why.** Reorder ascending or add explicit framing/badge. → `/impeccable clarify`.

**[P2] No visual boundary differentiates one tier from the next.** Wrap each tier in a hairline-bordered block per the Cards spec as an interim fix. → `/impeccable layout`.

**[P3] CTA appears before any pricing/benefit information.** Move CTA below framing copy or add a second CTA at the end. → `/impeccable clarify`.

## Persona Red Flags

- **Jordan:** Can't compare $50 vs $200 tier without scrolling and memorizing near-identical lists.
- **Alex/Sam (time-pressed):** Hits "Purchase Membership" before seeing any price; CTA doesn't say "starting at $50."
- **Sam (accessibility):** Heading hierarchy is technically sound but nothing in the DOM groups the four tiers as one comparison set for screen-reader users.

## Minor Observations

- External link lacks a visible "opens in new tab" affordance.
- The $10/month sustaining-member sentence at the end is unstyled and under-weighted relative to its recurring-revenue value.
- The 2 `design-system-radius` findings are sitewide, not membership-specific.

## Questions to Consider

- Was Membership simply never design-reviewed before ship, given the system already has the right pattern on the shelf?
- Is descending price order a deliberate anchor tactic or just draft order?
- Does one generic CTA actually give a tier-specific next step?
