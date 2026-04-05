import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { AppProviders } from "@/context/app-providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { JsonLd } from "./json-ld";
import { seoConfig } from "./seo-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: "Metadata Reader — Extract & Clean Image Metadata",
    template: "%s | Metadata Reader",
  },
  description: seoConfig.defaultDescription,
  keywords: [...seoConfig.keywords],
  authors: [{ name: "Metadata Reader" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: seoConfig.siteName,
    title: "Metadata Reader — Extract & Clean Image Metadata",
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Metadata Reader — Extract & Clean Image Metadata",
    description: seoConfig.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full" suppressHydrationWarning>
      <body
        className={cn(
          GeistMono.variable,
          GeistSans.variable,
          "h-full bg-background font-sans text-foreground",
        )}
      >
        <JsonLd />
        <AppProviders>
          <div className="max-w-7xl mx-auto min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 pb-16">{children}</div>
            <Footer />
          </div>
        </AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
