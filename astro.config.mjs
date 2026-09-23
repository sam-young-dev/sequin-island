// @ts-check
import { defineConfig } from "astro/config";
import sugarcube from "@sugarcube-sh/vite";
import { imageService } from "@unpic/astro/service";

// https://astro.build/config
export default defineConfig({
  site: "https://sam-studio-6.netlify.app/",
  vite: {
    plugins: [sugarcube()],
  },
  image: {
    service: imageService({
      placeholder: "blurhash",
      layout: "constrained",
    }),
  },
});
