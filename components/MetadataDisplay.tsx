"use client";

import { MAX_METADATA_LINES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CheckIcon,
  ChevronDown,
  ChevronUp,
  CopyIcon,
  Database,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

type MetadataDisplayProps = {
  metadata: any;
};

export default function MetadataDisplay({ metadata }: MetadataDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const metadataString =
    metadata !== undefined
      ? JSON.stringify(metadata, null, 2).replace(/[\uFFFD]/g, " ")
      : "This image has no metadata.";

  const lineCount = metadataString.split("\n").length;
  const hasMetadata =
    metadata !== undefined && Object.keys(metadata).length > 0;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(metadataString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between pb-3 border-b">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">Raw Metadata</h2>
        </div>
        {hasMetadata && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            onClick={handleCopy}
            aria-label={isCopied ? "Copied to clipboard" : "Copy metadata"}
          >
            {isCopied ? (
              <CheckIcon className="w-4 h-4 mr-1" />
            ) : (
              <CopyIcon className="w-4 h-4 mr-1" />
            )}
            {isCopied ? "Copied!" : "Copy All"}
          </Button>
        )}
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded
            ? "auto"
            : lineCount > MAX_METADATA_LINES
            ? "15em"
            : "auto",
        }}
        transition={{ duration: 0.3 }}
        className="relative mt-2 overflow-hidden"
      >
        <pre
          className={cn(
            "text-sm font-mono bg-muted/50 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all hover:bg-muted/70 transition-colors max-h-[15em]",
            !isExpanded && lineCount > MAX_METADATA_LINES && "mask-bottom"
          )}
        >
          {metadataString}
        </pre>

        {lineCount > MAX_METADATA_LINES && (
          <div className="flex justify-center mt-2">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              aria-expanded={isExpanded}
              aria-controls="metadata-content"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Show More
                </>
              )}
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
