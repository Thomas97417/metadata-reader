import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { cn } from "@/lib/utils";
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
        {children}
      </body>
    </html>
  );
}
