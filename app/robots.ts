import type { MetadataRoute } from "next";
import { seoConfig } from "./seo-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/metadata"],
      },
    ],
    sitemap: `${seoConfig.siteUrl}/sitemap.xml`,
  };
}
