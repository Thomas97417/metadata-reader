import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extract Image Metadata",
  description:
    "Upload an image to extract hidden metadata — AI generation prompts, EXIF data, camera settings, GPS coordinates, and more. Runs entirely in your browser.",
  openGraph: {
    title: "Extract Image Metadata | Metadata Reader",
    description:
      "Upload an image to extract hidden metadata — AI prompts, EXIF, camera settings, and more.",
  },
};

export default function ExtractLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
