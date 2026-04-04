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
import type { CleanableFile } from "@/context/clean-context";

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
          ? "border-border"
          : file.status === "error"
            ? "border-destructive/30"
            : file.status === "processing"
              ? "border-red-400/40"
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
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="p-2.5 rounded-full bg-white/15 backdrop-blur-sm"
              >
                <ArrowPathIcon className="size-6 text-white" />
              </motion.div>
            </motion.div>
          )}
          {file.status === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="p-2 rounded-full bg-green-500/20 backdrop-blur-sm"
              >
                <CheckCircleIcon className="size-8 text-green-400" />
              </motion.div>
            </motion.div>
          )}
          {file.status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="p-2 rounded-full bg-red-500/20 backdrop-blur-sm">
                <ExclamationCircleIcon className="size-8 text-red-400" />
              </div>
            </motion.div>
          )}
          {file.status === "queued" && (
            <motion.div
              key="queued"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                <ClockIcon className="size-5 text-white/70" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Remove button — hidden by default, revealed on hover */}
        {!isProcessing && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(file.id);
            }}
            className="absolute top-1.5 right-1.5 z-10 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white/80 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm hover:bg-black/70 hover:text-white"
            aria-label="Remove image"
          >
            <XMarkIcon className="size-3" />
          </motion.button>
        )}

        {/* Individual download button */}
        {file.status === "done" && (
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onDownload(file);
            }}
            className="absolute bottom-1.5 right-1.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/90 backdrop-blur-sm shadow-lg shadow-black/20 hover:bg-green-500 transition-colors"
            aria-label="Download cleaned image"
          >
            <ArrowDownTrayIcon className="size-3 text-white" />
            <span className="text-[10px] font-medium text-white">Save</span>
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
