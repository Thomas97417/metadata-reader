import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { ImageContextProvider } from "@/components/ImageContext";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
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
    <html lang="en" className="w-full" suppressHydrationWarning>
      <body
        className={cn(
          GeistMono.variable,
          GeistSans.variable,
          "h-full bg-background font-sans text-foreground",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ImageContextProvider>
            <div className="max-w-7xl mx-auto min-h-screen flex flex-col">
              <Navbar />
              {children}
            </div>
          </ImageContextProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
