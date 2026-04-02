import type { MetadataRoute } from "next";
import { seoConfig } from "./seo-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: seoConfig.siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${seoConfig.siteUrl}/extract`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${seoConfig.siteUrl}/clean`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
