import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Metadata Reader — how it works, supported formats, privacy, and more.",
  openGraph: {
    title: "FAQ | Metadata Reader",
    description:
      "Frequently asked questions about Metadata Reader — how it works, supported formats, privacy, and more.",
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
