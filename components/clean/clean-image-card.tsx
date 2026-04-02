"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { CleanableFile } from "./clean-uploader";

interface CleanImageCardProps {
  file: CleanableFile;
  index: number;
  isProcessing: boolean;
  onRemove: (id: string) => void;
  onDownload: (file: CleanableFile) => void;
  truncateName: (name: string, max?: number) => string;
}

export default function CleanImageCard({
  file,
  index,
  isProcessing,
  onRemove,
  onDownload,
  truncateName,
}: CleanImageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`group relative rounded-xl border overflow-hidden bg-card transition-colors ${
        file.status === "done"
          ? "border-green-500/30"
          : file.status === "error"
            ? "border-destructive/30"
            : file.status === "processing"
              ? "border-primary/40"
              : "border-border"
      }`}
    >
      {/* Thumbnail */}
      <div className="aspect-square relative overflow-hidden">
        <img
          src={file.preview}
          alt={file.file.name}
          className="h-full w-full object-cover"
        />

        {/* Status overlay */}
        <AnimatePresence mode="wait">
          {file.status === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <ArrowPathIcon className="size-8 text-primary" />
              </motion.div>
            </motion.div>
          )}
          {file.status === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-green-500/10 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
              >
                <CheckCircleIcon className="size-10 text-green-500" />
              </motion.div>
            </motion.div>
          )}
          {file.status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-destructive/10 flex items-center justify-center"
            >
              <ExclamationCircleIcon className="size-10 text-destructive" />
            </motion.div>
          )}
          {file.status === "queued" && (
            <motion.div
              key="queued"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ClockIcon className="size-6 text-muted-foreground" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Remove button */}
        {!isProcessing && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(file.id);
            }}
            className="absolute top-2 right-2 z-10 flex size-7 cursor-pointer items-center justify-center rounded-full bg-primary/80 text-primary-foreground transition-colors hover:bg-primary"
            aria-label="Remove image"
          >
            <XMarkIcon className="size-3.5" />
          </motion.button>
        )}

        {/* Individual download button */}
        {file.status === "done" && (
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onDownload(file);
            }}
            className="absolute bottom-2 right-2 size-7 rounded-full bg-green-500/90 flex items-center justify-center hover:bg-green-500 transition-colors"
            aria-label="Download cleaned image"
          >
            <ArrowDownTrayIcon className="size-3.5 text-white" />
          </motion.button>
        )}
      </div>

      {/* Filename */}
      <div className="px-2.5 py-2 flex items-center gap-1.5">
        <span className="text-xs text-muted-foreground truncate">
          {truncateName(file.file.name)}
        </span>
      </div>
    </motion.div>
  );
}
