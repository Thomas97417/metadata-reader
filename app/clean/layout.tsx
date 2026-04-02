import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clean Image Metadata",
  description:
    "Remove all metadata from your images before sharing — EXIF, GPS, AI generation data, and more. Private and browser-based.",
  openGraph: {
    title: "Clean Image Metadata | Metadata Reader",
    description:
      "Strip EXIF, GPS, and AI generation metadata from images before sharing. Runs in your browser.",
  },
};

export default function CleanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
