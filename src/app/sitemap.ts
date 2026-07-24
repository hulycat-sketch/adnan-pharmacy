import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { BLOG_ARTICLES } from "@/lib/blog";
import { parseArabicDateToISO } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => {
    const publishedISO = parseArabicDateToISO(article.publishedAt);
    return {
      url: `${SITE.url}/blog/${article.slug}`,
      lastModified: publishedISO ? new Date(publishedISO) : undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...articleRoutes];
}
