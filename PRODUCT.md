# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audiences, in the order the site must serve them:

1. **Members and donors.** Current and prospective supporters of Friends of Seguin Island Light Station (FOSILS) who join, renew, or give. Membership and donations are completed off-site on ejoinme pages; this site's job is to make the case and hand them off.
2. **Trip planners.** Day-trippers, boaters, and kayakers working out whether and how to visit: getting there, the 9-foot tide and small landing beach, moorings, the tower, museum, trails, and what's open.
3. **Overnight guests.** Members booking a stay in the guest quarters. Reservations are a membership benefit.

Volunteers, sail-training partners, grant makers, and press are secondary audiences and are not the design target.

## Product Purpose

The public website for FOSILS, a 501(c)(3) founded in 1986 that owns and stewards Seguin Island Light Station off the coast of Maine. It exists to grow membership and donations, help people plan a visit, and tell the island's history and preservation story. Its mission line: "to distinguish Seguin Island Light Station as part of Maine's maritime heritage through education and preservation in order to ensure access for generations to come."

**Project status:** this is a spec rebuild, pitched as a replacement for the current WordPress site at seguinisland.org. FOSILS has not adopted it. Success means a site convincing enough that FOSILS chooses to adopt it.

## Positioning

Seguin has facts no other lighthouse can claim: Maine's highest lighthouse above sea level, the only operational first-order Fresnel lens north of Rhode Island (kept after a 7,200-signature petition), and the longest surviving light station tramway (750 ft, 1890). It is a real, visitable, volunteer-kept island, not a scenic backdrop. The 3D terrain map built from real elevation and aerial data is how this site shows the island directly.

## Operating Context

- The season runs Memorial Day to Labor Day, with volunteer caretakers living on the island to give tours of the tower, museum, and gift shop and to look after five hiking trails.
- Access depends on the tide: the island can be reached for about three quarters of the tide cycle, until the new pier (planned for the 2026 season) is finished.
- Money moves off-site: memberships at `seguinisland.ejoinme.org/membership` and donations at `seguinisland.ejoinme.org/donations`. Gifts of stock and donated items are handled by named contacts.
- The "Keeper's Blog" carries seasonal, first-person updates from the caretakers (for example, tower closures, berry season, visiting schooners).
- Content is edited through Decap CMS (git-gateway, Netlify). Who will edit after launch is **undecided**.

## Capabilities and Constraints

- Astro 7 static site with content collections (home, pages, blog), deployed on Netlify, with Decap CMS at `/admin`.
- Design tokens are authored in `src/design-tokens/` (sugarcube) and CSS is written in CUBE-style blocks in `src/styles/`.
- `/map` is an interactive Three.js island built from `public/terrain/` (heightmap, aerial imagery, OSM features), with labelled places defined in `src/data/island-map.ts`. The generation scripts are in `scripts/terrain/`.
- Membership tiers, as published: Friend of Seguin $50, Lighthouse Keeper $200, Coast Guard Captain $500, Merchant Mariner $1000+, plus a sustaining option at $10/month. Benefits are listed in `src/content/pages/membership.md`.
- Terminology: "FOSILS", "Seguin Island Light Station", "first-order Fresnel lens", "keeper's house", "caretakers", "The Seguin Sentinel" (the newsletter).
- Open: the unused-looking dependencies (`@sanity/client`, `@sanity/image-url`) and whether a visit/plan-your-trip page will be added.

## Brand Commitments

- Name: Friends of Seguin Island Light Station, shortened to "Friends of Seguin Island" in the site title. The existing logo is `src/assets/seguin-island-logo.jpg`.
- Voice, taken from the existing copy: warm, first-person-plural, and a little nautical ("Ahoy, friends!", "Light and love"). Factual and proud about history and preservation work.
- These facts must be reproduced accurately and never embellished: founding dates, the timeline, dollar figures, and named people and organizations in `src/content/pages/about.md`.

## Evidence on Hand

- Real history, facilities, conservation, and education content: `src/content/pages/about.md`.
- Real membership tiers, donation channels, contacts, and mailing address: `src/content/pages/membership.md`, `donate.md`, `contact.md`.
- A real blog post with caretaker photos hosted on seguinisland.org: `src/content/blog/pardon-our-dust.md`.
- Island imagery: `src/assets/seguin-island-hero.jpg`, `seguin-island-lighthouse.png`, and `public/terrain/aerial.jpg`.
- Real terrain and feature data for the map: `public/terrain/`.
- **Not on hand:** testimonials, visitor numbers, a ferry or boat schedule, and pricing or rules for overnight stays. Do not fabricate them.
- **Not Seguin material:** `src/assets/` contains leftovers from another project (`hmg-logo*`, `backpack*`, `tents-header`, `sleep-header`, `crosspeak*`, `trailhead-slider`, `opt-balance-slider`, `website-logo-black`). Do not use them as Seguin evidence.

## Product Principles

1. **Support is the through-line.** Every page should leave a member or donor one clear step from joining or giving, without a hard sell.
2. **Real island, real facts.** Lead with Seguin's specific, verifiable distinctions and first-hand caretaker voice rather than generic coastal sentiment.
3. **Plan around the sea.** Tides, season, and landing conditions are facts visitors need, not fine print.
4. **Pitch-grade, adoption-ready.** It must look good enough to win the pitch and stay simple enough for a volunteer organization to run.
