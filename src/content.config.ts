import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Guards against CMS entries that would ship broken or placeholder text.
// A failing entry stops the build with the field name, so it never reaches the live site.
const PLACEHOLDERS = /^(test|testing|desc|description|excerpt|todo|tbd|lorem ipsum.*|placeholder.*|x+|\.+|-+)$/i;

const text = (label: string, { min = 1, max }: { min?: number; max: number }) =>
  z
    .string()
    .trim()
    .min(min, `${label} needs at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`)
    .refine((value) => !PLACEHOLDERS.test(value), `${label} still contains placeholder text.`);

// Site links ("/membership"), full URLs, and email links. Rejects "membership" or "www.example.com".
const href = z
  .string()
  .trim()
  .regex(/^(\/|#|https?:\/\/|mailto:)/, 'Links must start with "/", "https://", or "mailto:".');

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
    blogHeading: text("Blog heading", { max: 60 }).default("Latest from the island"),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: text("Title", { max: 70 }),
    description: text("Description", { min: 50, max: 200 }),
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
      .array(z.object({ year: z.number().int().min(1990).max(2100), names: text("Keeper names", { max: 120 }) }))
      .min(1, "List at least one volunteer keeper."),
    historic: z
      .array(z.object({ name: text("Keeper name", { max: 80 }), service: text("Role and years", { max: 120 }) }))
      .min(1, "List at least one historic keeper."),
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
          for (const issue of result.error.issues) ctx.addIssue({ code: "custom", path: [field], message: issue.message });
        }
      }
    }),
});

// Operational facts that change on their own schedule (renovations, closures) and
// shouldn't require a code change to update. One file per setting group.
const settings = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/settings" }),
  schema: z.object({
    guestRoomClosed: z.boolean().default(false),
    guestRoomClosedNote: text("Guest room closed note", { min: 10, max: 200 }).default(
      "The Keeper’s Guest Room is closed while renovations are under way.",
    ),
  }),
});

export const collections = { home, pages, keepers, blog, settings };
