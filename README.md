# Metadata Reader

A privacy-first web app to **extract** and **clean** metadata from AI-generated images. All processing runs locally in your browser — nothing is uploaded or sent over the internet.

## Features

### Extract Metadata

Upload an AI-generated image and instantly recover its hidden generation details:

- Prompts and negative prompts
- Model name, sampler, seed, CFG scale
- EXIF, XMP, TIFF, IPTC and PNG tEXt chunk data
- Full ComfyUI workflow graphs (node-based)

### Clean Metadata

Strip sensitive metadata from your images before sharing:

- Remove EXIF, GPS coordinates, camera info, timestamps, software tags
- Batch processing — clean multiple images at once
- Download individually or as a ZIP archive
- Image quality is preserved

### Supported formats

| Format | Extract | Clean |
|--------|---------|-------|
| PNG    | Yes     | Yes   |
| JPEG   | Yes     | Yes   |
| WebP   | Yes     | Yes (re-encoded) |

### Supported AI tools

| Tool | Status |
|------|--------|
| ComfyUI | Supported |
| AUTOMATIC1111 (Stable Diffusion WebUI) | Supported |
| Midjourney | Coming soon |
| Nano Banana (Google) | Coming soon |

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS 4, Framer Motion
- **UI components:** Radix UI primitives, shadcn/ui
- **Metadata parsing:** exifr, piexifjs, custom WebP RIFF parser
- **Batch downloads:** JSZip
- **Analytics:** PostHog, Vercel Analytics
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn / pnpm / bun)

### Installation

```bash
npm install
```

### Environment variables

Create a `.env.local` file at the root of the project:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=your_posthog_token
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  page.tsx              # Landing page
  extract/              # Extract metadata feature
  clean/                # Clean metadata feature
  layout.tsx            # Root layout (providers, fonts, analytics)
  seo-config.ts         # SEO configuration
  json-ld.tsx           # Structured data
  robots.ts / sitemap.ts

components/
  extract/              # Extract feature components
  clean/                # Clean feature components
  ui/                   # Shared UI components (shadcn)
  illustrations/        # SVG illustrations

context/
  image-context.tsx     # Single image state (extract)
  clean-context.tsx     # Batch cleaning state
  app-providers.tsx     # Combined providers

lib/
  webp-parser.ts        # Custom WebP RIFF container parser
  clean-image.ts        # Metadata stripping logic
  types.ts              # TypeScript types
  constants.ts          # App constants

hooks/
  use-file-upload.ts    # Drag-and-drop file upload hook
```