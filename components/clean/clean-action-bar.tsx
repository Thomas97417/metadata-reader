"use client";

import { motion } from "framer-motion";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArchiveBoxXMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/buttons/button";

interface CleanActionBarProps {
  totalCount: number;
  completedCount: number;
  allDone: boolean;
  hasQueued: boolean;
  isProcessing: boolean;
  suffix: string;
  onSuffixChange: (value: string) => void;
  onClearAll: () => void;
  onProcessAll: () => void;
  onDownloadAll: () => void;
}

export default function CleanActionBar({
  totalCount,
  completedCount,
  allDone,
  hasQueued,
  isProcessing,
  suffix,
  onSuffixChange,
  onClearAll,
  onProcessAll,
  onDownloadAll,
}: CleanActionBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-card border border-border overflow-hidden"
    >
      {/* Progress bar — thin stripe at top of card */}
      <div className="h-1 w-full bg-muted/30">
        <motion.div
          className={`h-full ${allDone ? "bg-green-500" : "bg-gradient-to-r from-primary to-primary/60"}`}
          initial={{ width: 0 }}
          animate={{
            width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        {/* Left: status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="font-medium">
              {totalCount} image{totalCount !== 1 ? "s" : ""}
            </span>
            {completedCount > 0 && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${allDone ? "bg-green-500/15 text-green-500" : "bg-primary/10 text-primary"}`}
              >
                {allDone
                  ? "All cleaned"
                  : `${completedCount}/${totalCount}`}
              </span>
            )}
          </div>
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center h-8 rounded-lg bg-muted/50 overflow-hidden">
            <span className="text-xs text-muted-foreground px-2.5 whitespace-nowrap select-none">
              Suffix
            </span>
            <input
              id="suffix-input"
              value={suffix}
              onChange={(e) => onSuffixChange(e.target.value)}
              placeholder="_clean"
              className="h-full w-24 text-xs bg-background/80 px-2 border-l border-border outline-none"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            disabled={isProcessing}
            className="gap-1.5 hover:cursor-pointer text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <TrashIcon className="size-3.5" />
            Clear all
          </Button>

          {allDone ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              <Button
                size="sm"
                onClick={onDownloadAll}
                className="gap-1.5 hover:cursor-pointer bg-green-600 hover:bg-green-700 text-white"
              >
                <ArrowDownTrayIcon className="size-4" />
                Download all
              </Button>
            </motion.div>
          ) : (
            <Button
              size="sm"
              onClick={onProcessAll}
              disabled={isProcessing || !hasQueued}
              className="gap-1.5 hover:cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <ArrowPathIcon className="size-4" />
                  </motion.div>
                  Cleaning...
                </>
              ) : (
                <>
                  <ArchiveBoxXMarkIcon className="size-4" />
                  Clean all
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
