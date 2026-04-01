"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpTrayIcon,
  ArrowRightIcon,
  CommandLineIcon,
  CpuChipIcon,
  SparklesIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  BoltIcon,
  GlobeAltIcon,
  SignalSlashIcon,
  MagnifyingGlassIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import TryLinkButton from "@/components/TryLinkButton";
import CleanLinkButton from "@/components/CleanLinkButton";
import {
  ArrowDownTrayIcon,
  XMarkIcon,
  MapPinIcon,
  CameraIcon,
  CalendarIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

/* ── Illustrations ─────────────────────────────────────────────── */

function StepDropIllustration() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/extract")}
      className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-border bg-card/50 flex flex-col items-center justify-center gap-3 p-8 cursor-pointer hover:border-primary/50 transition-colors"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="p-4 rounded-full border-2 border-muted-foreground/20 bg-background"
      >
        <ArrowUpTrayIcon className="w-8 h-8 text-muted-foreground/60" />
      </motion.div>
      <p className="text-sm font-medium text-foreground">
        Drop your image here
      </p>
      <p className="text-xs text-muted-foreground">or click to browse</p>
      <div className="flex gap-2 mt-2">
        {["PNG", "JPEG", "WebP"].map((fmt) => (
          <span
            key={fmt}
            className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
          >
            {fmt}
          </span>
        ))}
      </div>
    </div>
  );
}

function StepParsingIllustration() {
  const barWidths = ["w-3/4", "w-1/2", "w-5/6", "w-2/5", "w-3/5"];
  return (
    <div className="w-full aspect-[4/3] rounded-2xl border border-border bg-card/50 flex items-center justify-center gap-4 sm:gap-6 p-6 sm:p-8">
      {/* Thumbnail */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border flex items-center justify-center shrink-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10" />
      </div>

      {/* Arrow */}
      <ArrowRightIcon className="w-5 h-5 text-muted-foreground/40 shrink-0" />

      {/* Skeleton bars */}
      <div className="flex-1 space-y-2.5 max-w-[180px]">
        {barWidths.map((w, i) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full bg-primary/20 ${w}`}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function StepResultsIllustration() {
  const [activeTab, setActiveTab] = useState<"parameters" | "raw">(
    "parameters",
  );
  const rows = [
    {
      key: "Prompt",
      value: "a beautiful landscape, oil painting, vibrant colors",
    },
    { key: "Negative", value: "blurry, low quality, watermark, text" },
    { key: "Model", value: "SDXL 1.0" },
    { key: "Seed", value: "4281937" },
    { key: "Steps", value: "30" },
    { key: "CFG", value: "7.5" },
  ];
  const rawData = {
    prompt: "a beautiful landscape, oil painting, vibrant colors",
    negative_prompt: "blurry, low quality, watermark, text",
    model: "SDXL 1.0",
    seed: 4281937,
    steps: 30,
    cfg_scale: 7.5,
    sampler: "DPM++ 2M Karras",
    size: "1024x1024",
  };
  const tabs = [
    { id: "parameters" as const, label: "Parameters" },
    { id: "raw" as const, label: "Raw Data" },
  ];
  return (
    <div className="w-full aspect-[4/3] rounded-2xl border border-border bg-card/50 overflow-hidden flex flex-col">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-4 pt-3 pb-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs font-medium px-3 py-1 rounded-md transition-colors ${
              activeTab === tab.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Content */}
      {activeTab === "parameters" ? (
        <div className="flex-1 px-4 py-3 space-y-2.5 overflow-hidden">
          {rows.map((row) => (
            <div key={row.key} className="flex items-baseline gap-3">
              <span className="text-[11px] font-medium text-muted-foreground shrink-0 w-14">
                {row.key}
              </span>
              <span className="text-[11px] font-mono text-foreground/80 truncate">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 px-4 py-3 overflow-auto">
          <pre className="text-[10px] font-mono text-foreground/80 leading-relaxed whitespace-pre">
            {JSON.stringify(rawData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

/* ── Benefit Illustrations ────────────────────────────────────── */

function BenefitPrivacyIllustration() {
  return (
    <div className="w-full aspect-[4/3] rounded-2xl border border-border bg-card/50 flex flex-col items-center justify-center gap-4 p-8">
      {/* Browser frame */}
      <div className="w-full max-w-[220px] rounded-xl border border-border bg-background overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-muted/30">
          <div className="w-2 h-2 rounded-full bg-red-400/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
          <div className="w-2 h-2 rounded-full bg-green-400/60" />
          <div className="flex-1 mx-2 h-4 rounded bg-muted/50 flex items-center justify-center">
            <span className="text-[8px] text-muted-foreground">localhost</span>
          </div>
        </div>
        <div className="p-4 flex flex-col items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 rounded-full bg-green-500/10 border border-green-500/20"
          >
            <ShieldCheckIcon className="w-7 h-7 text-green-500/70" />
          </motion.div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] font-medium text-green-600/80">
              All data stays local
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitSpeedIllustration() {
  const bars = [
    { label: "EXIF", delay: 0, width: "85%" },
    { label: "PNG tEXt", delay: 0.15, width: "70%" },
    { label: "XMP", delay: 0.3, width: "55%" },
  ];
  return (
    <div className="w-full aspect-[4/3] rounded-2xl border border-border bg-card/50 flex flex-col items-center justify-center gap-4 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-1">
        <RocketLaunchIcon className="w-5 h-5 text-primary/60" />
        <span className="text-xs font-medium text-muted-foreground">
          Parsing speed
        </span>
      </div>
      <div className="w-full max-w-[220px] space-y-3">
        {bars.map((bar) => (
          <div key={bar.label} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-muted-foreground">
                {bar.label}
              </span>
              <span className="text-[10px] font-mono text-primary/70">
                &lt;1ms
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary/30"
                initial={{ width: 0 }}
                animate={{ width: bar.width }}
                transition={{
                  duration: 0.8,
                  delay: bar.delay,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-1">
        <BoltIcon className="w-3.5 h-3.5 text-yellow-500/70" />
        <span className="text-[10px] text-muted-foreground">
          Instant results
        </span>
      </div>
    </div>
  );
}

function BenefitNoTrackingIllustration() {
  const items = [
    { label: "Cookies" },
    { label: "Data Collection" },
    { label: "Accounts" },
  ];
  return (
    <div className="w-full aspect-[4/3] rounded-2xl border border-border bg-card/50 flex flex-col items-center justify-center gap-4 p-6 sm:p-8">
      <EyeSlashIcon className="w-7 h-7 text-primary/50" />
      <div className="w-full max-w-[200px] space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/30 border border-border/50"
          >
            <span className="text-[11px] font-medium text-muted-foreground">
              {item.label}
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-500/10 text-red-500/70">
              None
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Clean Illustrations ──────────────────────────────────────── */

function CleanDropIllustration() {
  const router = useRouter();
  const thumbnails = [
    { rotate: -6, x: -30, delay: 0 },
    { rotate: 3, x: 0, delay: 0.15 },
    { rotate: 8, x: 30, delay: 0.3 },
  ];
  return (
    <div
      onClick={() => router.push("/clean")}
      className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-border bg-card/50 flex flex-col items-center justify-center gap-4 p-8 cursor-pointer hover:border-green-500/50 transition-colors"
    >
      <div className="relative flex items-end justify-center h-20 w-40">
        {thumbnails.map((t, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: t.delay,
              ease: "easeInOut",
            }}
            style={{ rotate: t.rotate, x: t.x }}
            className="absolute w-14 h-14 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/20 flex items-center justify-center"
          >
            <div className="w-7 h-7 rounded bg-gradient-to-br from-green-500/30 to-green-500/10" />
          </motion.div>
        ))}
      </div>
      <p className="text-sm font-medium text-foreground">
        Drop your images here
      </p>
      <p className="text-xs text-muted-foreground">or click to browse</p>
      <div className="flex gap-2 mt-1">
        {["PNG", "JPEG", "WebP"].map((fmt) => (
          <span
            key={fmt}
            className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 font-medium"
          >
            {fmt}
          </span>
        ))}
      </div>
    </div>
  );
}

function CleanProcessIllustration() {
  const metadataTags = [
    { label: "GPS", icon: MapPinIcon, x: -70, y: -40, delay: 0 },
    { label: "Camera", icon: CameraIcon, x: 70, y: -35, delay: 0.8 },
    { label: "Date", icon: CalendarIcon, x: -65, y: 35, delay: 1.6 },
    {
      label: "Software",
      icon: WrenchScrewdriverIcon,
      x: 75,
      y: 40,
      delay: 2.4,
    },
  ];
  return (
    <div className="w-full aspect-[4/3] rounded-2xl border border-border bg-card/50 flex items-center justify-center p-6 sm:p-8">
      <div className="relative flex items-center justify-center">
        {/* Image thumbnail */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-border flex items-center justify-center z-10">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 rounded-full bg-green-500/10"
          >
            <SparklesIcon className="w-8 h-8 text-green-500/60" />
          </motion.div>
        </div>

        {/* Metadata tags that fade out with strikethrough */}
        {metadataTags.map((tag) => (
          <motion.div
            key={tag.label}
            style={{ x: tag.x, y: tag.y }}
            className="absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/8 border border-red-500/20"
            animate={{
              opacity: [0.9, 0.9, 0.2, 0],
              scale: [1, 1, 0.95, 0.9],
            }}
            transition={{
              duration: 3.2,
              delay: tag.delay,
              repeat: Infinity,
              repeatDelay: 0,
              times: [0, 0.4, 0.7, 1],
            }}
          >
            <tag.icon className="w-3 h-3 text-red-500/70" />
            <span className="text-[10px] font-medium text-red-500/70">
              {tag.label}
            </span>
            <motion.div
              className="absolute inset-y-0 left-0 right-0 flex items-center px-1"
              animate={{ opacity: [0, 0, 1, 1] }}
              transition={{
                duration: 3.2,
                delay: tag.delay,
                repeat: Infinity,
                repeatDelay: 0,
                times: [0, 0.4, 0.5, 1],
              }}
            >
              <div className="w-full h-[1px] bg-red-500/60" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CleanResultIllustration() {
  const files = [
    { name: "photo_clean.jpg", delay: 0 },
    { name: "portrait_clean.png", delay: 0.2 },
    { name: "landscape_clean.webp", delay: 0.4 },
  ];
  return (
    <div className="w-full aspect-[4/3] rounded-2xl border border-border bg-card/50 flex flex-col items-center justify-center gap-4 p-6 sm:p-8">
      {/* File list */}
      <div className="w-full max-w-[220px] space-y-2">
        {files.map((file, i) => (
          <motion.div
            key={file.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: file.delay,
              repeat: Infinity,
              repeatDelay: 4,
            }}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-green-500/5 border border-green-500/20"
          >
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-3.5 h-3.5 text-green-500" />
              <span className="text-[10px] font-mono text-foreground/80">
                {file.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ZIP download button visual */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600/15 border border-green-500/30"
      >
        <ArrowDownTrayIcon className="w-4 h-4 text-green-600" />
        <span className="text-xs font-medium text-green-600">
          cleaned_images.zip
        </span>
      </motion.div>
    </div>
  );
}

/* ── Data ───────────────────────────────────────────────────────── */

const steps = [
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

const supportedTools = [
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

const benefits = [
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

const cleanSteps = [
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

/* ── Page ───────────────────────────────────────────────────────── */

export default function Page() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="flex flex-col justify-center items-center py-20 lg:py-32 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-3xl text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-bold tracking-tighter text-5xl sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 mb-6"
            >
              Understand your
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                AI images
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-xl mb-10"
            >
              A private, browser-based tool that extracts prompts, models, and
              generation parameters from any AI-generated image.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <TryLinkButton />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheckIcon className="w-4 h-4" />
                <span>No data ever leaves your browser</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── How It Works ─────────────────────────────────────── */}
        <section className="w-full py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="font-bold tracking-tighter text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/30">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Three simple steps to uncover the story behind your images.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto space-y-12 lg:space-y-20">
              {steps.map((step, index) => {
                const isReversed = index % 2 === 1;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center ${
                      isReversed ? "md:direction-rtl" : ""
                    }`}
                  >
                    {/* Illustration */}
                    <div className={isReversed ? "md:order-2" : "md:order-1"}>
                      <step.Illustration />
                    </div>

                    {/* Text */}
                    <div
                      className={`space-y-4 ${
                        isReversed ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <span className="text-5xl font-bold text-primary/25 leading-none">
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Built for AI Artists (merged section) ────────────── */}
        <section className="w-full py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="font-bold tracking-tighter text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/30">
                Built for AI Artists
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                AI image generators embed hidden metadata inside every image —
                prompts, models, seeds, and full generation settings. Extracting
                this data lets you reproduce results, learn from other artists,
                and understand exactly how an image was created. We support the
                most popular tools.
              </p>
            </motion.div>

            {/* Compatibility grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
            >
              {supportedTools.map((tool) => (
                <div
                  key={tool.name}
                  className={`relative flex gap-4 p-5 sm:p-6 rounded-2xl border bg-card transition-colors ${
                    tool.comingSoon
                      ? "border-border/30 opacity-60"
                      : "border-border/50 hover:border-primary/30"
                  }`}
                >
                  {tool.comingSoon && (
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      Soon
                    </span>
                  )}
                  <div
                    className={`p-2.5 rounded-xl h-fit shrink-0 ${
                      tool.comingSoon
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <span
                      className={`text-sm font-medium block ${
                        tool.comingSoon
                          ? "text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {tool.name}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Benefits */}
            <div className="space-y-12 lg:space-y-20">
              {benefits.map((benefit, index) => {
                const isReversed = index % 2 === 1;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center ${
                      isReversed ? "md:direction-rtl" : ""
                    }`}
                  >
                    {/* Illustration */}
                    <div className={isReversed ? "md:order-2" : "md:order-1"}>
                      <benefit.Illustration />
                    </div>

                    {/* Text */}
                    <div
                      className={`space-y-4 ${
                        isReversed ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Protect Your Privacy ────────────────────────────── */}
        <section className="w-full py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="font-bold tracking-tighter text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
                Protect Your Privacy
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Strip all metadata from your images before sharing them online.
              </p>
            </motion.div>

            <div className="space-y-12 lg:space-y-20">
              {cleanSteps.map((step, index) => {
                const isReversed = index % 2 === 1;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center ${
                      isReversed ? "md:direction-rtl" : ""
                    }`}
                  >
                    <div className={isReversed ? "md:order-2" : "md:order-1"}>
                      <step.Illustration />
                    </div>
                    <div
                      className={`space-y-4 ${
                        isReversed ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <span className="text-5xl font-bold text-green-500/25 leading-none">
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Ready to try it?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Choose the tool you need — extract hidden metadata or strip it
                all away. Both run entirely in your browser.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Extract card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0 }}
                className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-colors"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Extract Metadata
                </h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  Drop an image and instantly see prompts, models, seeds, and
                  every generation parameter hidden inside.
                </p>
                <TryLinkButton />
              </motion.div>

              {/* Clean card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl border border-border/50 bg-card hover:border-green-500/30 transition-colors"
              >
                <div className="p-3 rounded-xl bg-green-500/10 text-green-600">
                  <SparklesIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Clean Metadata
                </h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  Strip all EXIF, GPS, and generation data from your images
                  before sharing.
                </p>
                <CleanLinkButton />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
