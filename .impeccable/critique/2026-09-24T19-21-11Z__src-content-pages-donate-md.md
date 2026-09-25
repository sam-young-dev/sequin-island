---
target: membership and donate pages
total_score: 18
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\content\\pages\\donate.md"
target_fingerprint: "sha256:c20b212edbc575c764bd29eb31ca471069caaed78c337185ee86aff8b214d494"
target_path: "C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\content\\pages\\donate.md"
timestamp: 2026-09-24T19-21-11Z
slug: src-content-pages-donate-md
---
Method: dual-agent (A: design review · B: detector + Playwright browser overlay)
Targets: /membership and /donate (both via src/pages/[slug].astro). Shared snapshot.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Current-page header Donate illegible on /donate (1.4:1); no new-tab signal |
| 2 | Match System / Real World | 3 | Tier names fit; "Purchase Membership" transactional; title mismatch with nav/CTA |
| 3 | User Control and Freedom | 2 | Silent target=_blank handoffs; unlabelled PDF |
| 4 | Consistency and Standards | 2 | Brick on header link, Granite on real Donate Now; phones not tabular, wrap |
| 5 | Error Prevention | 2 | $10/month sustaining option unlinked |
| 6 | Recognition Rather Than Recall | 1 | Four near-identical benefit lists to diff mentally |
| 7 | Flexibility and Efficiency | 2 | No renew shortcut; phones not tel: links |
| 8 | Aesthetic and Minimalist Design | 2 | Undesigned; repetition is the noise |
| 9 | Error Recovery | n/a | No forms; recovery on ejoinme |
| 10 | Help and Documentation | 2 | No membership contact; moorings/stays unexplained |
| **Total** | | **18/36** | **Acceptable (50%)** |

## Design Specificity Verdict
Generic: default prose template, no imagery/ledger/band; right 55% empty at desktop. Donate copy is boilerplate while about.md holds fundable facts ($35,000 railing, 24 windows x $10,000, tramway survey, pier). Detector: CLI 0 findings; browser overlay clean on /membership, 1 finding on /donate (gray-on-color + low-contrast 1.4:1, header Donate) from site-head.css:48 not excluding .button.

## Priority Issues
- [P1] Current-page header Donate illegible on /donate. Fix: `.site-head .nav a:not(.button)[aria-current="page"]`. /impeccable harden
- [P1] /membership has no case, no grouping, no end CTA. Fix: short case from about.md, "Every member receives" once, compact tiers low to high showing deltas, linked sustaining option, repeated Join, renew line, home-band type scale. /impeccable distill then layout
- [P2] Brick Rule inverted on /donate: make Donate Now the brick support button, quiet the header current state. /impeccable colorize
- [P2] No reassurance at handoff: new-tab microcopy + hidden text, 501(c)(3) on membership, PDF label. /impeccable clarify
- [P2] /donate generic case: ledger of real needs from about.md verbatim, railing "your gifts did this", island photo, tel: tabular phones. /impeccable bolder

## Persona Red Flags
- Jordan: no statement of what money does; "Purchase" reads as buying; unclear normal choice.
- Casey: ~2,900px mobile page with CTA only at top; phones wrap and aren't tappable; 38px targets.
- Riley: unlinked sustaining; silent new tabs; PDF; no tax line on membership; pier 2027 (about.md:27) vs 2026 (PRODUCT.md, visit brief).
- Renewing member: no renew wording or contact.
- Mooring boater: moorings buried in every tier; no link to Plan Your Visit moorings.

## Minor Observations
- h2 "Additional Ways to Give" immediately followed by h3; "Checks payable to:" split from address.
- En dash joins tier name and price; bare "Donate" h1; pages don't cross-link; no imagery.

## Questions to Consider
- Does /membership need four full lists?
- Lead /donate with the railing repair?
- Are moorings the real hook?
- Merge into one Support Seguin page?
