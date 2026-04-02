const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://metadata-reader.com";

export const seoConfig = {
  siteName: "Metadata Reader",
  siteUrl: SITE_URL,
  defaultDescription:
    "A free, private, browser-based tool to extract and clean image metadata. Read AI generation prompts, EXIF data, and more — nothing leaves your browser.",
  keywords: [
    "image metadata",
    "EXIF reader",
    "AI image metadata",
    "extract image metadata",
    "clean image metadata",
    "remove EXIF data",
    "Stable Diffusion metadata",
    "ComfyUI metadata",
    "image privacy",
    "metadata remover",
  ],
} as const;
