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
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import TryLinkButton from "@/components/TryLinkButton";

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
    { label: "Cookies", blocked: true },
    { label: "Analytics", blocked: true },
    { label: "Accounts", blocked: true },
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
  { icon: CommandLineIcon, name: "Stable Diffusion", comingSoon: false },
  { icon: CpuChipIcon, name: "ComfyUI", comingSoon: false },
  { icon: SparklesIcon, name: "Midjourney", comingSoon: true },
  { icon: LightBulbIcon, name: "DALL-E", comingSoon: true },
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
      "No accounts, no cookies, no analytics. We don't track you or collect any data whatsoever.",
    Illustration: BenefitNoTrackingIllustration,
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
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Works with the tools you already use, with the privacy you
                deserve.
              </p>
            </motion.div>

            {/* Compatibility grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12"
            >
              {supportedTools.map((tool) => (
                <div
                  key={tool.name}
                  className={`relative flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl border bg-card transition-colors ${
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
                    className={`p-2.5 rounded-xl ${
                      tool.comingSoon
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      tool.comingSoon
                        ? "text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {tool.name}
                  </span>
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

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-16 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Ready to try it?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto px-4">
              It takes just a few seconds. Drop an image and see what&apos;s
              hidden inside.
            </p>
            <TryLinkButton />
          </motion.div>
        </section>
      </div>
    </main>
  );
}
