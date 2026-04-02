"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpTrayIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export function StepDropIllustration() {
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

export function StepParsingIllustration() {
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

export function StepResultsIllustration() {
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
