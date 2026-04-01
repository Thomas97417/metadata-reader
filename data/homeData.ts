import {
  CommandLineIcon,
  CpuChipIcon,
  SparklesIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

import {
  StepDropIllustration,
  StepParsingIllustration,
  StepResultsIllustration,
} from "@/components/illustrations/StepIllustrations";

import {
  BenefitPrivacyIllustration,
  BenefitSpeedIllustration,
  BenefitNoTrackingIllustration,
} from "@/components/illustrations/BenefitIllustrations";

import {
  CleanDropIllustration,
  CleanProcessIllustration,
  CleanResultIllustration,
} from "@/components/illustrations/CleanIllustrations";

export const steps = [
  {
    number: "01",
    title: "Drop your image",
    description:
      "Drag and drop or select any AI-generated image. We support PNG, JPEG, and WebP formats.",
    Illustration: StepDropIllustration,
  },
  {
    number: "02",
    title: "We extract the metadata",
    description:
      "Our engine parses embedded EXIF, PNG tEXt chunks, and XMP data right in your browser. Nothing leaves your device.",
    Illustration: StepParsingIllustration,
  },
  {
    number: "03",
    title: "See everything",
    description:
      "Prompts, negative prompts, model names, samplers, seeds, CFG scale — all extracted and organized for you.",
    Illustration: StepResultsIllustration,
  },
];

export const supportedTools = [
  {
    icon: CommandLineIcon,
    name: "Automatic1111",
    description:
      "The most popular Stable Diffusion web UI. Stores full generation parameters — prompt, seed, sampler, model — directly inside PNG chunks.",
    comingSoon: false,
  },
  {
    icon: CpuChipIcon,
    name: "ComfyUI",
    description:
      "A node-based interface for Stable Diffusion that saves the entire workflow graph as metadata, letting you rebuild any image from scratch.",
    comingSoon: false,
  },
  {
    icon: SparklesIcon,
    name: "Midjourney",
    description:
      "A cloud-based AI image generator known for its artistic style. Metadata support coming soon.",
    comingSoon: true,
  },
  {
    icon: LightBulbIcon,
    name: "Nano Banana",
    description:
      "Google's lightweight image generation model. Metadata support coming soon.",
    comingSoon: true,
  },
];

export const benefits = [
  {
    title: "100% Private",
    description:
      "Your images never leave your device. All processing happens locally in your browser — no uploads, no servers.",
    Illustration: BenefitPrivacyIllustration,
  },
  {
    title: "Lightning Fast",
    description:
      "Results in milliseconds. Our parser extracts EXIF, PNG tEXt, and XMP data instantly with zero latency.",
    Illustration: BenefitSpeedIllustration,
  },
  {
    title: "Zero Tracking",
    description:
      "No accounts, no cookies, no data collection. We don't store or share any of your information whatsoever.",
    Illustration: BenefitNoTrackingIllustration,
  },
];

export const cleanSteps = [
  {
    number: "01",
    title: "Upload your images",
    description:
      "Drag and drop or select multiple images at once. We support PNG, JPEG, and WebP formats — all processed locally.",
    Illustration: CleanDropIllustration,
  },
  {
    number: "02",
    title: "We strip the metadata",
    description:
      "EXIF data, GPS coordinates, camera info, timestamps, software tags — everything gets removed while preserving image quality.",
    Illustration: CleanProcessIllustration,
  },
  {
    number: "03",
    title: "Download clean files",
    description:
      "Get your cleaned images individually or as a single ZIP archive. Share them safely without exposing any private information.",
    Illustration: CleanResultIllustration,
  },
];
