import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import Header from "@/components/Header";
import { ImageProvider } from "@/components/ImageContext";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Metadata Reader",
  description: "Upload an image to read its metadata.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full">
      <body
        className={cn(
          GeistMono.variable,
          GeistSans.variable,
          "h-full bg-background font-sans text-foreground"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ImageProvider>
            <div className="max-w-7xl mx-auto">
              <Header />
              {children}
            </div>
          </ImageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
