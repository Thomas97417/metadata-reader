"use client";

import { motion } from "framer-motion";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

interface CleanAddCardProps {
  isDragging: boolean;
  animationDelay: number;
  onBrowse: () => void;
}

export default function CleanAddCard({
  isDragging,
  animationDelay,
  onBrowse,
}: CleanAddCardProps) {
  return (
    <motion.div
      role="button"
      onClick={onBrowse}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, delay: animationDelay }}
      className={`relative rounded-xl border-2 border-dashed overflow-hidden flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
        isDragging
          ? "border-red-400/50 bg-red-400/5"
          : "border-border hover:border-red-400/40 hover:bg-red-400/5"
      }`}
    >
      <div className="aspect-square flex flex-col items-center justify-center gap-2 p-4">
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="flex items-center justify-center rounded-full size-12 bg-red-400/10 border border-red-400/20"
        >
          <ArrowUpTrayIcon className="size-5 text-red-400/60" />
        </motion.div>
        <span className="text-sm font-medium text-muted-foreground">
          Add more
        </span>
        <span className="text-[11px] text-muted-foreground/50">
          Drop or click
        </span>
      </div>
    </motion.div>
  );
}
