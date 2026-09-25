// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sugarcube from "@sugarcube-sh/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://sam-studio-6.netlify.app/",
  // Blog photos are hosted on the current WordPress site. Authorizing the domain
  // lets Astro download and optimize them at build time (sized, lazy-loaded,
  // no layout shift) instead of hot-linking the originals.
  image: {
    domains: ["seguinisland.org"],
  },
  // Lets blog posts embed WordPress photos with <Picture inferSize>, the same
  // properly-sized-image pattern the rest of the site already uses, instead of
  // falling back to plain markdown images (full-size, unoptimized <img> tags).
  integrations: [mdx()],
  vite: {
    plugins: [sugarcube()],
  },
});
