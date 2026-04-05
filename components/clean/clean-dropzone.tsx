"use client";

import { motion } from "framer-motion";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  ArchiveBoxXMarkIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/buttons/button";

interface CleanDropzoneProps {
  isDragging: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowse: () => void;
}

export default function CleanDropzone({
  isDragging,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onBrowse,
}: CleanDropzoneProps) {
  return (
    <>
      {/* Info section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-2 max-w-lg mx-auto"
      >
        <h2 className="text-lg font-semibold tracking-tight">
          Why remove metadata?
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Your images contain hidden data — location, device info, software
          settings, and AI generation parameters. Cleaning metadata protects
          your privacy before sharing online.
        </p>
      </motion.div>

      {/* Upload Zone */}
      <motion.div
        role="button"
        onClick={onBrowse}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        animate={{ scale: isDragging ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        className={`relative flex flex-col items-center justify-center overflow-hidden transition-all hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 rounded-2xl min-h-[320px] py-8 w-full max-w-3xl ${
          isDragging
            ? "ring-2 ring-red-400/50 bg-red-400/5 shadow-lg"
            : "bg-card ring-1 ring-red-400/15 shadow-sm hover:ring-red-400/30 hover:shadow-md"
        }`}
      >
        {/* Hero icon */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-4 flex shrink-0 items-center justify-center rounded-full size-20 bg-gradient-to-br from-red-400/15 to-red-400/5 border border-red-400/20"
        >
          <ArchiveBoxXMarkIcon className="size-10 text-red-400/70" />
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-400/50">
          Clean Metadata
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-1 mb-5">
          Strip metadata from multiple images at once
        </p>

        {/* 3-step process */}
        <div className="flex items-center gap-0 mb-5">
          <div className="flex flex-col items-center gap-1.5">
            <div className="size-10 rounded-full bg-red-400/10 flex items-center justify-center">
              <ArrowUpTrayIcon className="size-5 text-red-400/60" />
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">
              Upload
            </span>
          </div>
          <div className="w-10 sm:w-14 h-px border-t border-dashed border-red-400/25 -mt-4" />
          <div className="flex flex-col items-center gap-1.5">
            <div className="size-10 rounded-full bg-red-400/10 flex items-center justify-center">
              <ArchiveBoxXMarkIcon className="size-5 text-red-400/60" />
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">
              Clean
            </span>
          </div>
          <div className="w-10 sm:w-14 h-px border-t border-dashed border-red-400/25 -mt-4" />
          <div className="flex flex-col items-center gap-1.5">
            <div className="size-10 rounded-full bg-red-400/10 flex items-center justify-center">
              <ArrowDownTrayIcon className="size-5 text-red-400/60" />
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">
              Download
            </span>
          </div>
        </div>

        {/* CTA */}
        <Button
          type="button"
          variant="default"
          size="default"
          className="rounded-full px-6 shadow-sm gap-2"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onBrowse();
          }}
        >
          <ArrowUpTrayIcon className="size-4" />
          Browse files
        </Button>
        <p className="text-muted-foreground/50 text-xs mt-3">
          or drop images anywhere on this card
        </p>

        {/* Privacy footer */}
        <div className="flex items-center gap-1.5 mt-4 text-muted-foreground/40">
          <ShieldCheckIcon className="size-3.5" />
          <span className="text-[11px]">
            Everything stays in your browser
          </span>
        </div>
      </motion.div>
    </>
  );
}
