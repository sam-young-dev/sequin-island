---
target: visit page
total_score: 28
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\visit.astro"
target_fingerprint: "sha256:03ae237a4c2fb445650634b401170ef4d93650aa72b437a6cc90e6912d83965c"
target_path: "C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island\\src\\pages\\visit.astro"
timestamp: 2026-09-25T16-38-04Z
slug: src-pages-visit-astro
---
Method: dual-agent (A: design review · B: detector + browser). Page viewed 2026-09-25 12:33 pm, off-season state.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Excellent states; off season still says "The tide today" |
| 2 | Match System / Real World | 3 | "7.2 ft" has no landing meaning for first-timers |
| 3 | User Control and Freedom | 3 | Back to now/Escape/Stop walk work; 6-day cap |
| 4 | Consistency and Standards | 3 | Staying over (4) before What to bring (5) contradicts brief STORY + visit.css; link styles differ band vs body |
| 5 | Error Prevention | 2 | "Call if it looks tight" — tight undefined, no chart reference |
| 6 | Recognition Rather Than Recall | 3 | "Three quarters of the cycle" must be carried from band to section 2 |
| 7 | Flexibility and Efficiency | 3 | Keyboard scrub, jump links; no date beyond 6 days |
| 8 | Aesthetic and Minimalist Design | 2 | Landing caveat x3, office number x6, duplicated guides sentence, empty band right third |
| 9 | Error Recovery | 3 | NOAA retry/saved copy/fallback; WebGL fallbacks |
| 10 | Help and Documentation | 3 | Drag hint quiet, below chart |
| **Total** | | **28/40** | **Good** |

## Design Specificity Verdict
Authored for Seguin (NOAA 8417177, BRAVO mooring, cove cable, courtesy dinghy, real-terrain route; refuses photo hero/icon tiles/FAQ). Generic: steps rail, membership band, kayak boilerplate. Gap: signature tide curve never relates water to landing — reads as a tide widget, not Seguin's landing clock.
Detector: 0 static findings (coverage gap: can't resolve token colors). Live DOM: 2 low-contrast — .visit-callout__label "Landing" and "Access", #79716b on #f5f5f5 4.39:1. Missed by detector, caught by browser pass + LLM: a.visit-row__cta "check today's tide", same pair. Header nav 38px, tide__cta 39px, NOAA link 36px tap targets (<44, ≥24). "Previous day" 2.25:1 disabled = exempt (false positive). No overlay visible to user (headless).

## Priority Issues
- [P1] Tide never answers "can I land?" — tie warning to next-low data already in readout; promote Call the office to an action; top of FOSILS unresolved list. /impeccable clarify
- [P1] First viewport misses direction contract — desktop curve cut at ~y760/900, empty third column, off-season note duplicates Caretakers; mobile curve ~900px down. Move status column to column 3, trim band landing paragraph, fold season note, one-sentence mobile lead. /impeccable layout
- [P1] Mobile route canvas renders top ~45% of 70svh stage (headless 390px DPR2; verify device); 70svh + 5 stops > one screen. ResizeObserver on stage, cap ~55svh mobile. /impeccable adapt
- [P2] Repetition + possibly unsourced kayak advice (visit.astro:128-131): cut duplicate guides sentence, source or label advice, dedupe landing caveat from route stop, consolidate phone links. /impeccable distill
- [P2] Granite on tinted surface 4.39:1 (callout labels, check today's tide link); mobile "Now" label overlaps "10:54 am". /impeccable polish

## Persona Red Flags
- Jordan: 7.2 ft without verdict; MLLW/BRAVO jargon; dense boat/kayak rows.
- Casey: curve below fold; 8,723px page; route map full screen with half empty; 38px nav.
- Sam: 3 contrast misses; drag hint after chart; no-JS route stops are inert aria-pressed buttons; 6 identical phone links.
- Boater: no landing↔tide link; no plain "first come, first served"; no VHF contact; hazards separated from tide; 6-day horizon.

## Minor Observations
Section order vs brief; passed/upcoming steps indistinct on mobile strip; 12px dt labels; loud plot focus ring; no replay cue after walk; re-verify mooring $20/$30/$40 and camping $10; footer empty white box (out of scope).

## Questions to Consider
- If the landing window can't be published, should the Tide Clock lead, or "Call before you go"?
- For ~9 off-season months, what does a next-summer planning page look like?
- Does the 3D walk earn a full phone screen vs a 2D elevation profile beside the access callout?
