---
target: homepage (src/pages/index.astro)
total_score: 18
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island-new\\src\\pages\\index.astro"
target_fingerprint: "sha256:8d748d0d79edcd662f51ff03429fa0572f477d87bfc3c00ab621bb212a2c6c4e"
target_path: "C:\\Users\\scyoung\\Documents\\projects\\personal\\sequin-island-new\\src\\pages\\index.astro"
timestamp: 2026-09-14T22-06-21Z
slug: src-pages-index-astro
---
# Critique: Homepage (`src/pages/index.astro`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Nav "current page" state is hardcoded static data (`site-data.ts`), never computed from the actual route — never reflects which page you're on |
| 2 | Match System / Real World | 4/4 | Coordinates as hero eyebrow, "Keeper's Blog," Fresnel-lens petition story — genuinely authored maritime voice |
| 3 | User Control and Freedom | 3/4 | Fine for a shallow Persuade-mode page; no escape-hatch issues found |
| 4 | Consistency and Standards | 3/4 | Primary ("Become a Member") and secondary ("Learn Our History") CTA cards render with visually identical weight despite unequal stakes |
| 5 | Error Prevention | n/a | No on-site forms — donation/membership happen off-site at ejoinme.org |
| 6 | Recognition Rather Than Recall | 3/4 | Donate link lives only in the header; not reinforced at page end |
| 7 | Flexibility and Efficiency | n/a | Persuade-mode marketing page, not a power-user tool |
| 8 | Aesthetic and Minimalist Design | 3/4 | Evidence and blog sections are bare `h2`+text with no containing visual device — risk of blurring into one long scroll |
| 9 | Error Recovery | n/a | No user-input error states exist on this page |
| 10 | Help and Documentation | n/a | Not applicable to a landing page |
| **Total** | | **18/24 applicable** | **Good (75%)** — 4 heuristics n/a (no forms, no power-user flows, no errors, no docs need on a static Persuade page) |

## Design Specificity Verdict

**LLM assessment**: Mostly genuine, with one clear tell of unfinished template scaffolding. The copy is unmistakably authored for this org — coordinates (`43°42'26"N, 69°45'28"W`) as the hero eyebrow, the Fresnel-lens/Olympia-Snowe petition story used as the "why trust us" moment, "Keeper's Blog" as a nav label. That's real specificity, not generic-nonprofit boilerplate. But the codebase still carries e-commerce leftovers from whatever starter this was built on: `.cart-button`/`.cart-count` in `site-head.css:31-56` and `.product-card` in `card.css:22-29`, both unused on this nonprofit site. `colors.json` also still defines a full accent/success/warning/error/info color-ramp system that nothing in rendered CSS touches — evidence the single-accent discipline was imposed on top of a generic multi-color starter rather than designed from scratch for FOSILS.

**Deterministic scan**: `impeccable detect --json` returned clean (exit 0, `[]`) on both `src/pages/index.astro` and `src/components/` — no automated findings. The detector's silence doesn't contradict the issues below; none of them are pattern-detectable (they're compositional/semantic, not markup-anti-pattern issues).

**Visual overlays**: Not available. No browser automation tool exists in this session, so no live-page overlay could be injected and no [Human] tab exists to point to. All findings below come from reading the rendered markup and CSS directly, not from an actual render.

## Overall Impression

The bones are good and the voice is real — this doesn't read like a template with the org's name swapped in. But the page currently treats its one actual money-conversion moment (the membership/donate CTA pair) with the same visual weight as its softest secondary ask, and it ships two accidental bugs that would look bad if anyone looked closely: a literal unresolved template string in an `aria-label`, and dead e-commerce CSS from the starter kit. The single biggest opportunity is making the primary CTA card visually dominant — right now a first-time visitor has to *read* to figure out which of the two homepage cards is the ask.

## What's Working

1. **The evidence section as social proof substitute** (`home/index.md`, rendered at `index.astro:32-35`) — a small nonprofit without customer testimonials or press mentions instead leans on a concrete, verifiable, emotionally resonant fact (7,200 signatures, a named U.S. senator, a direct quote). This is a smarter move than most nonprofit sites make, and it's genuinely specific to FOSILS.
2. **Hero eyebrow as coordinates** — `43°42'26"N, 69°45'28"W` instead of a generic tagline signals "real, stewarded place" from the first five seconds, before a single word of copy is read.
3. **Fully CMS-editable copy** — every string on this page (`heroHeading`, `primaryCtaBody`, `evidenceBody`, etc.) routes through `home/index.md` via `content.config.ts`, so non-technical staff can rewrite the page without touching Astro markup — right for a volunteer-run org.

## Priority Issues

- **[P1] Primary and secondary CTA cards carry identical visual weight.** `index.astro:39-49`: "Become a Member" (a recurring paid commitment) and "Learn Our History" (a free page visit) both render as plain `.card`s with an `h2` + button, differing only by a `data-button-variant="secondary"` attribute on the button. A scanning visitor gets no visual signal which one is the actual ask.
  **Why it matters**: this is the page's one real conversion moment; treating it as equal-weight with a free informational link directly undercuts the site's stated primary success metric (membership/donation conversion).
  **Fix**: give the membership card a filled/tinted background or make it visually dominant (larger, bordered, or leading position); demote "Learn Our History" to a plain text link or a visibly lighter ghost-button treatment.
  **Suggested command**: `/impeccable layout`

- **[P1] Broken template artifact in a live `aria-label`.** `Closer.astro:31` — `<nav aria-label="{{ data.navLabel }}" ...>` is a literal, unresolved string (Handlebars/Liquid-style syntax, not valid Astro interpolation). A screen-reader user hears the nav announced as "curly-brace curly-brace data dot navLabel curly-brace curly-brace," not a real label.
  **Why it matters**: this is a real, currently-shipping accessibility defect (heuristic #2, match to real world) hiding in production code, not a hypothetical.
  **Fix**: replace with a real static string (e.g. `aria-label="Footer"`) or a proper Astro expression if `navLabel` is meant to be dynamic.
  **Suggested command**: `/impeccable harden`

- **[P2] No reassurance before the off-site handoff to ejoinme.org.** Neither `primaryCtaBody` nor the button label signals that clicking "Become a Member" leaves the FOSILS site for a third-party checkout platform.
  **Why it matters**: an unbranded, unannounced domain switch at the exact moment someone is about to hand over payment information is a classic donor-drop-off point, and it's also a visibility-of-system-status gap.
  **Fix**: add small microcopy near the button ("via ejoinme.org, opens in a new tab") so the transition is expected, not jarring.
  **Suggested command**: `/impeccable clarify`

- **[P2] Dead e-commerce CSS remnants from the starter template.** `site-head.css:31-56` (`.cart-button`, `.cart-count`) and `card.css:22-29` (`.product-card`) are unused anywhere on this nonprofit site.
  **Why it matters**: harmless today, but it's a maintenance and authenticity risk for a codebase that a non-specialist volunteer team will maintain — dead code from an unrelated "outdoor gear" starter template (per PRODUCT.md) sitting alongside real content.
  **Fix**: delete the unused blocks.
  **Suggested command**: `/impeccable distill`

- **[P3] Evidence and blog sections have no containing visual device.** `index.astro:32-35` and `:53-73` are both bare `h2` + text/list inside a `wrapper`, relying only on whitespace to separate from neighboring sections — only the CTA region gets `data-bg="tinted"`.
  **Why it matters**: on a single long-scrolling homepage, this risks the evidence story (the strongest content on the page) visually blending into the sections around it instead of standing out.
  **Fix**: extend the tinted/bordered treatment to at least the evidence section, since it's the page's strongest persuasive asset.
  **Suggested command**: `/impeccable layout`

## Persona Red Flags

**Jordan (First-Timer)**: Reads the hero eyebrow coordinates (minor parse friction — may not immediately register as "a real place," but recoverable), reaches the evidence section (compelling), then hits the two CTA cards and is genuinely unsure which one "gives money" since both look equally weighted (ties directly to the P1 above). Clicks "Become a Member" and lands on ejoinme.org with zero warning it's a different domain — a brief "did I click the wrong thing?" moment right at the conversion point.

**Riley (Stress Tester)**: Checks the header nav for a "you are here" indicator — finds none highlighted on the homepage, even though `aria-current` logic exists in the markup (`site-data.ts`'s `current` flag is static, never route-derived, so it can never correctly light up on any page). Notices the header's direct `/donate` link (`SiteHeader.astro:31`) is a separate path from the homepage's `primaryCtaHref: /membership` — two related-but-distinct asks, which is defensible (membership vs. one-time donation are legitimately different products here) but worth confirming is intentional rather than accidental drift.

**Casey (Mobile User)**: No mobile-specific nav pattern (hamburger/drawer) exists per the design system notes — on a narrow viewport the header's `cluster`-based nav (About, Blog, Contact, Membership, Donate button — 5 items) has to wrap or shrink inline with no dedicated mobile treatment. Cannot confirm actual on-device behavior without a browser (this session had none available); flagging as a concrete thing to visually verify at ~390px width before shipping further changes.

## Minor Observations

- `evidenceHeading`/`evidenceBody` citing a named senator and an exact signature count is good specificity — no factual concern, don't touch this copy without checking with the org.
- `heroHeading` ("Help Preserve Maine's Most Storied Lighthouse") is a specific, confident claim — not generic "Welcome to our website" filler.
- The nav "current page" data model (`site-data.ts`) is structurally broken regardless of visual impact — it can't ever correctly reflect the active route since it's static per-item data, not derived from `Astro.url.pathname`.

## Questions to Consider

- Is "Become a Member" really the primary conversion action for most visitors, or is a one-time "Donate" (already available in the header) the lower-friction, higher-conversion ask that should be visually dominant on the homepage instead?
- Given there's no contact form by design, does burying contact info at the very bottom of the page (after every CTA) undersell it as a legitimate, low-commitment option for a hesitant prospect who isn't ready to pay yet?
