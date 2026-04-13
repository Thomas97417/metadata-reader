"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChatBubbleLeftIcon,
  CircleStackIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import CopyToClipboard from "../ui/copy-to-clipboard";
import MetadataDisplay from "./metadata-display";
import ParametersDetails from "./parameters-details";

type Tab = "prompts" | "raw";

type MetadataTabsProps = {
  metadata: any;
  parametersSections: string;
  kindOfPrompt: string | null;
};

export default function MetadataTabs({
  metadata,
  parametersSections,
  kindOfPrompt,
}: MetadataTabsProps) {
  const hasPrompts = kindOfPrompt === "parameters" || kindOfPrompt === "prompt" || kindOfPrompt === "novelai";
  const hasMetadata =
    metadata !== null &&
    metadata !== undefined &&
    Object.keys(metadata).length > 0;

  const [activeTab, setActiveTab] = useState<Tab>(
    hasPrompts ? "prompts" : "raw",
  );
  const [copiedAll, setCopiedAll] = useState(false);

  const metadataString =
    metadata !== null && metadata !== undefined
      ? JSON.stringify(metadata, null, 2).replace(/[\uFFFD]/g, " ")
      : "";

  const copyContent =
    activeTab === "prompts" ? parametersSections : metadataString;

  // Reset tab when image changes
  useEffect(() => {
    setActiveTab(hasPrompts ? "prompts" : "raw");
    setCopiedAll(false);
  }, [hasPrompts, metadata]);

  const tabs = [
    ...(hasPrompts
      ? [{ id: "prompts" as Tab, label: "Prompts", icon: ChatBubbleLeftIcon }]
      : []),
    ...(hasMetadata
      ? [{ id: "raw" as Tab, label: "Raw Data", icon: CodeBracketIcon }]
      : []),
  ];

  // No metadata at all
  if (!hasMetadata && !hasPrompts) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center gap-3 h-full p-8 bg-muted/30 rounded-lg border border-dashed"
      >
        <div className="bg-background/80 rounded-full p-3">
          <CircleStackIcon className="w-6 h-6 text-muted-foreground/70" />
        </div>
        <p className="text-muted-foreground text-center font-medium">
          No Metadata Found
        </p>
        <p className="text-sm text-muted-foreground/70 text-center max-w-md">
          This image doesn&apos;t contain any embedded metadata. Try uploading
          an image created with Stable Diffusion, ComfyUI, or NovelAI.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 w-full min-w-0">
      {/* Tab bar */}
      <div className="flex items-center border-b">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative",
                "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-t-md",
                activeTab === tab.id ? "text-primary" : "text-muted-foreground",
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <CopyToClipboard
            parametersSections={copyContent}
            copied={copiedAll}
            setCopied={setCopiedAll}
            text="Copy All"
          />
        </div>
      </div>

      {/* Tab panels */}
      <AnimatePresence mode="wait">
        {activeTab === "prompts" && hasPrompts && (
          <motion.div
            key="prompts"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ParametersDetails
              metadata={metadata}
              parametersSections={parametersSections}
              kindOfPrompt={kindOfPrompt}
              embedded
            />
          </motion.div>
        )}

        {activeTab === "raw" && hasMetadata && (
          <motion.div
            key="raw"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <MetadataDisplay metadata={metadata} embedded />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
