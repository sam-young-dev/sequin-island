import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { siteData } from "../data/site-data";

export async function GET(context) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (left, right) =>
      right.data.publishDate.getTime() - left.data.publishDate.getTime(),
  );

  return rss({
    title: `${siteData.title} — Keeper's Blog`,
    description:
      "Stories, seasonal updates, and preservation news from Seguin Island Light Station.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}/`,
    })),
  });
}
