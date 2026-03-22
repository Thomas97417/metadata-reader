"use client";

import { MAX_CHARACTERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown, Database } from "lucide-react";
import { useEffect, useState } from "react";
import CopyToClipboard from "./CopyToClipboard";

type MetadataDisplayProps = {
  metadata: any;
  embedded?: boolean;
};

export default function MetadataDisplay({ metadata, embedded = false }: MetadataDisplayProps) {
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

  const inner = (
    <>
      {!embedded && (
        <div className="flex items-center justify-between pb-3 border-b">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
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

      {embedded && (
        <div className="flex justify-end mb-2">
          <CopyToClipboard
            parametersSections={metadataString}
            copied={isCopied}
            setCopied={setIsCopied}
            text="Copy All"
          />
        </div>
      )}

      <div className={embedded ? "" : "mt-2"}>
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : "15em",
          }}
          transition={{ duration: 0.3 }}
          className={cn("relative", !isExpanded && "overflow-hidden")}
        >
          <pre
            className={cn(
              "text-sm font-mono bg-muted/50 rounded-lg p-3 whitespace-pre-wrap break-all hover:bg-muted/70 transition-colors",
              isExpanded ? "h-auto" : "max-h-[15em] overflow-y-auto",
              !isExpanded && shouldShowButton && "mask-bottom"
            )}
          >
            {metadataString}
          </pre>
        </motion.div>

        {shouldShowButton && (
          <div className="flex justify-center -mt-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "group flex items-center gap-1.5 px-3 py-1.5",
                "text-xs font-medium text-muted-foreground/80",
                "hover:text-muted-foreground transition-colors hover:cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-md"
              )}
              aria-expanded={isExpanded}
              aria-controls="metadata-content"
            >
              <motion.span
                initial={false}
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity group-hover:text-primary" />
              </motion.span>
              {isExpanded ? "Show less" : "Show more"}
            </button>
          </div>
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
