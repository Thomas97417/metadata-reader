"use client";

import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ArchiveBoxXMarkIcon,
  ArrowDownTrayIcon,
  MapPinIcon,
  CameraIcon,
  CalendarIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export function CleanDropIllustration() {
  const router = useRouter();
  const thumbnails = [
    { rotate: -6, x: -30, delay: 0 },
    { rotate: 3, x: 0, delay: 0.15 },
    { rotate: 8, x: 30, delay: 0.3 },
  ];
  return (
    <div
      onClick={() => router.push("/clean")}
      className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-border bg-card/50 flex flex-col items-center justify-center gap-4 p-8 cursor-pointer hover:border-red-400/50 transition-colors"
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
            className="absolute w-14 h-14 rounded-lg bg-gradient-to-br from-red-400/20 to-red-400/5 border border-red-400/20 flex items-center justify-center"
          >
            <div className="w-7 h-7 rounded bg-gradient-to-br from-red-400/30 to-red-400/10" />
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
            className="text-[10px] px-2 py-0.5 rounded-full bg-red-400/10 text-red-500 font-medium"
          >
            {fmt}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CleanProcessIllustration() {
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
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-br from-red-400/20 to-red-400/5 border border-red-400/20 flex items-center justify-center z-10">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 rounded-full bg-red-400/10"
          >
            <ArchiveBoxXMarkIcon className="w-8 h-8 text-red-400/60" />
          </motion.div>
        </div>

        {/* Metadata tags that fade out with strikethrough */}
        {metadataTags.map((tag) => (
          <motion.div
            key={tag.label}
            style={{ x: tag.x, y: tag.y }}
            className="absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-400/8 border border-red-400/20"
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
            <tag.icon className="w-3 h-3 text-red-400/70" />
            <span className="text-[10px] font-medium text-red-400/70">
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
              <div className="w-full h-[1px] bg-red-400/60" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function CleanResultIllustration() {
  const files = [
    { name: "photo_clean.jpg", delay: 0 },
    { name: "portrait_clean.png", delay: 0.2 },
    { name: "landscape_clean.webp", delay: 0.4 },
  ];
  return (
    <div className="w-full aspect-[4/3] rounded-2xl border border-border bg-card/50 flex flex-col items-center justify-center gap-4 p-6 sm:p-8">
      {/* File list */}
      <div className="w-full max-w-[220px] space-y-2">
        {files.map((file) => (
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
