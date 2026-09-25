import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Guards against CMS entries that would ship broken or placeholder text.
// A failing entry stops the build with the field name, so it never reaches the live site.
const PLACEHOLDERS =
  /^(test|testing|desc|description|excerpt|todo|tbd|lorem ipsum.*|placeholder.*|x+|\.+|-+)$/i;

const text = (label: string, { min = 1, max }: { min?: number; max: number }) =>
  z
    .string()
    .trim()
    .min(min, `${label} needs at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`)
    .refine(
      (value) => !PLACEHOLDERS.test(value),
      `${label} still contains placeholder text.`,
    );

// Site links ("/membership"), full URLs, and email links. Rejects "membership" or "www.example.com".
const href = z
  .string()
  .trim()
  .regex(
    /^(\/|#|https?:\/\/|mailto:)/,
    'Links must start with "/", "https://", or "mailto:".',
  );

// A local asset path or a remote image URL (e.g. the WordPress media library, authorized
// in astro.config.mjs's image.domains), rendered with <Image inferSize> so it never needs
// a guessed width/height.
const imageSrc = z
  .string()
  .trim()
  .regex(
    /^(\/|https?:\/\/)/,
    'Images must be a local path or an "https://" URL.',
  );

const home = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/home" }),
  schema: z.object({
    title: text("Title", { max: 70 }),
    description: text("Description", { min: 50, max: 200 }),
    heroEyebrow: text("Hero eyebrow", { max: 60 }),
    heroHeading: text("Hero heading", { max: 80 }),
    intro: text("Intro", { min: 50, max: 400 }),
    primaryCtaLabel: text("Primary CTA label", { max: 40 }),
    primaryCtaHref: href,
    secondaryCtaLabel: text("Secondary CTA label", { max: 40 }),
    secondaryCtaHref: href,
    blogHeading: text("Blog heading", { max: 60 }).default(
      "Latest from the island",
    ),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: text("Title", { max: 70 }),
    description: text("Description", { min: 50, max: 200 }),
    // Donate-only: the page has its own template (src/pages/donate.astro) so the
    // single online gift can carry the support-button color and sit beside its
    // own reassurance line, ahead of the markdown body's other ways to give.
    intro: text("Intro", { min: 50, max: 600 }).optional(),
    lede: text("Lede", { min: 10, max: 200 }).optional(),
    ctaLabel: text("CTA label", { max: 40 }).optional(),
    ctaHref: href.optional(),
    reassurance: text("Reassurance", { min: 20, max: 300 }).optional(),
    donorRightsHref: href.optional(),
    // About-only: the founding timeline and facilities list get the site's own
    // Ledger/fact-row treatment (src/pages/about/index.astro) instead of a plain
    // markdown list, so About reads like the rest of the site's fact-heavy pages.
    timeline: z
      .array(
        z.object({
          year: z.number().int().min(1800).max(2100),
          event: text("Timeline event", { max: 500 }),
        }),
      )
      .optional(),
    facilities: z
      .array(
        z.object({
          title: text("Facility title", { max: 80 }),
          detail: text("Facility detail", { max: 700 }),
          // Shown in tabular Public Sans beside the title, like the site's other
          // prices (see DESIGN.md). Omit for facilities with no cost to report yet.
          cost: text("Facility cost", { max: 120 }).optional(),
        }),
      )
      .optional(),
  }),
});

// The honor rolls on /about/keepers, as published on seguinisland.org. The body is
// the "Become a keeper" section shown on the About page.
const keepers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/keepers" }),
  schema: z.object({
    title: text("Title", { max: 70 }),
    description: text("Description", { min: 50, max: 200 }),
    intro: text("Intro", { min: 50, max: 400 }),
    historicIntro: text("Historic keepers intro", { min: 50, max: 400 }),
    volunteers: z
      .array(
        z.object({
          year: z.number().int().min(1990).max(2100),
          names: text("Keeper names", { max: 120 }),
        }),
      )
      .min(1, "List at least one volunteer keeper."),
    historic: z
      .array(
        z.object({
          name: text("Keeper name", { max: 80 }),
          service: text("Role and years", { max: 120 }),
        }),
      )
      .min(1, "List at least one historic keeper."),
  }),
});

// The four annual tiers on /membership, published low to high so a visitor
// reads the levels as a ladder. Each tier lists only what it adds beyond
// `included`, the shared benefits every level gets.
const membership = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/membership" }),
  schema: z.object({
    title: text("Title", { max: 70 }),
    description: text("Description", { min: 50, max: 200 }),
    intro: text("Intro", { min: 50, max: 400 }),
    purchaseHref: href,
    included: z
      .array(text("Included benefit", { max: 120 }))
      .min(1, "List at least one benefit every member gets."),
    sustainingNote: text("Sustaining note", { max: 200 }),
    tiers: z
      .array(
        z.object({
          name: text("Tier name", { max: 60 }),
          price: text("Price", { max: 20 }),
          extras: z.array(text("Extra", { max: 200 })).default([]),
          suggested: z.boolean().default(false),
        }),
      )
      .min(1, "List at least one membership tier."),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z
    .object({
      title: z.string().trim().min(1, "Title is required."),
      description: z.string().trim(),
      publishDate: z.coerce.date(),
      excerpt: z.string().trim(),
      draft: z.boolean().default(false),
      // The caretaker's deliberate choice for the homepage teaser and social-share
      // preview. Prefer a landscape shot: the teaser crops to 4:3 (see dispatch.css).
      heroImage: imageSrc.optional(),
      heroImageAlt: text("Hero image alt text", { max: 160 }).optional(),
      // Who's signing this update, e.g. "S&S" — shown quietly beside the dateline.
      author: text("Author", { max: 60 }).optional(),
      // The post's closing valediction, kept out of the freeform body so it can carry
      // its own "letter from the island" styling instead of reading as one more paragraph.
      signoff: text("Signoff", { max: 120 }).optional(),
    })
    // Drafts can be rough; published posts can't.
    .superRefine((post, ctx) => {
      if (post.draft) return;
      for (const [field, schema] of [
        ["title", text("Title", { max: 100 })],
        ["description", text("Description", { min: 50, max: 200 })],
        ["excerpt", text("Excerpt", { min: 40, max: 300 })],
      ] as const) {
        const result = schema.safeParse(post[field]);
        if (!result.success) {
          for (const issue of result.error.issues)
            ctx.addIssue({
              code: "custom",
              path: [field],
              message: issue.message,
            });
        }
      }
      if (post.heroImage && !post.heroImageAlt) {
        ctx.addIssue({
          code: "custom",
          path: ["heroImageAlt"],
          message: "heroImageAlt is required when heroImage is set.",
        });
      }
    }),
});

// Operational facts that change on their own schedule (renovations, closures) and
// shouldn't require a code change to update. One file per setting group.
const settings = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/settings" }),
  schema: z.object({
    guestRoomClosed: z.boolean().default(false),
    guestRoomClosedNote: text("Guest room closed note", {
      min: 10,
      max: 200,
    }).default(
      "The Keeper’s Guest Room is closed while renovations are under way.",
    ),
  }),
});

export const collections = { home, pages, keepers, blog, settings, membership };
