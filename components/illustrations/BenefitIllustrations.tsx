"use client";

import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  RocketLaunchIcon,
  BoltIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export function BenefitPrivacyIllustration() {
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

export function BenefitSpeedIllustration() {
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

export function BenefitNoTrackingIllustration() {
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
