"use client";

import { MAX_CHARACTERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDownIcon, CircleStackIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import CopyToClipboard from "../ui/copy-to-clipboard";

type MetadataDisplayProps = {
  metadata: any;
  embedded?: boolean;
};

export default function MetadataDisplay({
  metadata,
  embedded = false,
}: MetadataDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);

  const metadataString =
    metadata !== undefined && metadata !== null
      ? JSON.stringify(metadata, null, 2).replace(/[\uFFFD]/g, " ")
      : "";

  const characterCount = metadataString.length;
  const hasMetadata =
    metadata !== undefined &&
    metadata !== null &&
    Object.keys(metadata).length > 0;

  useEffect(() => {
    setShouldShowButton(characterCount > MAX_CHARACTERS);
  }, [characterCount]);

  if (!hasMetadata) return null;

  const formattedCount = characterCount.toLocaleString();

  const inner = (
    <>
      {!embedded && (
        <div className="flex items-center justify-between pb-3 border-b">
          <div className="flex items-center gap-2">
            <CircleStackIcon className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">Raw Metadata</h2>
          </div>
          {hasMetadata && (
            <CopyToClipboard
              parametersSections={metadataString}
              copied={isCopied}
              setCopied={setIsCopied}
              text="Copy All"
            />
          )}
        </div>
      )}

      <div className={cn("w-full min-w-0", embedded ? "" : "mt-2")}>
        <div className="relative w-full">
          <pre
            className={cn(
              "text-[13px] leading-relaxed font-mono bg-muted/50 rounded-lg p-4 w-full whitespace-pre-wrap break-all hover:bg-muted/70 transition-colors",
              !isExpanded &&
                shouldShowButton &&
                "max-h-[32em] overflow-hidden mask-bottom",
              isExpanded && "max-h-none",
            )}
          >
            {metadataString}
          </pre>
        </div>

        {shouldShowButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "group flex items-center justify-center gap-2 w-full py-2.5 mt-1",
              "text-xs font-medium text-muted-foreground/80",
              "hover:text-foreground hover:bg-muted/50 transition-colors hover:cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-md",
            )}
            aria-expanded={isExpanded}
            aria-controls="metadata-content"
          >
            <motion.span
              initial={false}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex items-center"
            >
              <ChevronDownIcon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity group-hover:text-primary" />
            </motion.span>
            {isExpanded
              ? "Show less"
              : `Show more (${formattedCount} characters)`}
          </button>
        )}
      </div>
    </>
  );

  if (embedded) {
    return inner;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      {inner}
    </motion.div>
  );
}
