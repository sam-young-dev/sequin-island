# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: prospective and current members/donors — people who care about Maine maritime heritage and lighthouse preservation, arriving to learn about Seguin Island and decide whether to give or join. Secondary: existing supporters checking in on island happenings via the Keeper's Blog, and prospective island visitors researching a trip. Internal: a site editor/staff member using the Decap CMS admin at `/admin` to update pages and blog posts.

## Product Purpose

The site for Friends of Seguin Island Light Station (FOSILS), a 501(c)(3) nonprofit (incorporated 1986) that owns and stewards Seguin Island Light Station in Bath, ME. Mission (verbatim): "Our mission is to distinguish Seguin Island Light Station as part of Maine's maritime heritage through education and preservation to ensure access for generations to come." Success is measured primarily by converting visitors into paying members or donors; building awareness and community engagement (via the blog and island history) is a close secondary goal.

## Positioning

Seguin Island Light Station holds the only operational first-order Fresnel lens north of Rhode Island, on a National Historic Place. FOSILS has owned and stewarded the island since 1998 (granted via the Maine Lights Program) and runs it with seasonal volunteer caretakers (Memorial Day–Labor Day) — a hands-on, community-run preservation model, not a passive historical marker.

## Operating Context

- **Membership**: tiered pricing ($10/mo sustaining up to $1000+ "Merchant Mariner"), purchased through an external `ejoinme.org` page.
- **Donations**: one-time gifts via the same external `ejoinme.org` flow, plus mail/stock transfer/matching-gift/donated-items options described on the Donate page.
- **Contact**: email and mailing address only; no on-site contact form.
- **Content editing**: Decap CMS (`public/admin`, git-gateway backend) is the live, in-use editing workflow for the home page, static pages, and blog ("Keeper's Blog").
- **Active capital/strategic projects** referenced in current content: dock/pier construction, tower railing repairs, tramway restoration, window replacement, cove erosion mitigation, and a North Atlantic Right Whale ship-monitoring relay station.
- Seasonal operating rhythm: caretaker presence and visitor access run Memorial Day–Labor Day.

## Capabilities and Constraints

- Astro static site, deployed via Netlify; content lives in Markdown collections under `src/content/` (home, pages, blog) authored through Decap CMS.
- Blog posts, membership tiers, and donation/contact details are real, current organizational content — not placeholder copy — and should be preserved as-is unless the user changes them.
- A Sanity CMS integration (`@sanity/client`, `PUBLIC_SANITY_PROJECT_ID`/`DATASET`) was present in the codebase but unused anywhere in `src/`; confirmed abandoned/leftover and removed (dependencies, env vars, and the `cdn.sanity.io` image domain) during this init pass.
- Production domain is not yet finalized — `astro.config.mjs`'s `site` and `public/admin/config.yml`'s `site_url`/`display_url` still point at a Netlify staging URL (`sam-studio-6.netlify.app`) by deliberate choice; update these once the real domain is set.
- The project was bootstrapped from an unrelated starter template ("astro-sugarcube" / outdoor-gear demo content). During this init pass the leftover cruft was removed: the package name (now `friends-of-seguin-island`) and ~14 stray unrelated images (hiking/backpacking/outdoor-gear photos, generic template logos and SVGs) not referenced anywhere in the site.
- A `Masthead` component (`src/components/masthead/Masthead.astro`) exists with real placeholder data (`src/data/site-data.ts`'s `masthead` field: "Friends of Seguin Island" / "Bath, Maine" / "~ Est. 1986 ~", replacing stray template values) but is kept intentionally per the user's direction, even though no page currently renders it — future work should either use it or confirm it's still wanted.
- `README.md` is still unmodified Astro-starter boilerplate and does not describe this project; treat it as stale, not authoritative.

## Brand Commitments

- Name: Friends of Seguin Island Light Station (FOSILS); site title "Friends of Seguin Island."
- Voice: warm, personal, community-oriented — "Ahoy, friends!", blog posts signed "Light and love, S&S," donate copy framing supporters as "part of the family here at Friends of Seguin Island Light Station."
- Real brand imagery on hand: `src/assets/seguin-island-hero.jpg`, `seguin-island-lighthouse.png`, `seguin-island-logo.jpg` (logo currently used in site header and closer components).

## Evidence on Hand

- `src/content/pages/about.md` carries a real, detailed history (1985–2024 timeline, named founders/board members, USCG lease history, Fresnel lens petition, a Sen. Olympia Snowe quote).
- Real membership tiers and pricing, and real staff contacts (Tip Koehler, Lauren O'Reilly) with phone numbers/emails on the Membership and Donate pages.
- One real, dated blog post (`src/content/blog/pardon-our-dust.md`, July 2026); `src/content/blog/_placeholder.md` is an explicit draft placeholder used only to bootstrap the collection — do not treat it as real content.
- No customer testimonials, press mentions, or benchmark claims exist on the site; do not fabricate any.

## Product Principles

1. Preserve the organization's real voice and facts (history, pricing, contacts) exactly — this is a real nonprofit's public site, not a demo.
2. Every page should ultimately point toward membership or donation as the primary conversion, without undercutting the site's role as a trusted source of island history and updates.
3. Treat the external `ejoinme.org` checkout flow as a fixed constraint; the site's job is to build the case and hand off cleanly, not to replicate checkout.
4. Keep the CMS-editable content model (Decap, Markdown collections) intact — non-technical staff maintain this site's copy.
