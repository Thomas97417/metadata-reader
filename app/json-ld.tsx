import { seoConfig } from "./seo-config";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Extract image metadata and EXIF data",
      "Read AI generation prompts from images",
      "Remove metadata from images for privacy",
      "Browser-based — no data uploaded to servers",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
