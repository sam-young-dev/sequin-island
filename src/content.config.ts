import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const home = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/home" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroEyebrow: z.string(),
    heroHeading: z.string(),
    intro: z.string(),
    primaryCtaLabel: z.string(),
    primaryCtaBody: z.string(),
    primaryCtaHref: z.string(),
    secondaryCtaLabel: z.string(),
    secondaryCtaBody: z.string(),
    secondaryCtaHref: z.string(),
    evidenceHeading: z.string(),
    evidenceBody: z.string(),
    evidenceQuote: z.string(),
    evidenceQuoteAttribution: z.string(),
    galleryHeading: z.string().default("The Island in Every Light"),
    galleryPhotos: z
      .array(
        z.object({
          image: z.string(),
          alt: z.string(),
          caption: z.string(),
        }),
      )
      .default([]),
    blogHeading: z.string().default("Latest from the island"),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eyebrow: z.string().optional(),
  }),
});

const membership = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/membership" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eyebrow: z.string().optional(),
    ctaLabel: z.string(),
    ctaHref: z.string(),
    ctaNote: z.string().optional(),
    tiersHeading: z.string().default("Compare Membership Levels"),
    sustainingNote: z.string().optional(),
    tiers: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        benefits: z.array(z.string()),
      }),
    ),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    excerpt: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { home, pages, membership, blog };
