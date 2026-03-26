"use client";
import { MAX_FILENAME_LENGTH } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useImageContext } from "./ImageContext";
import ImageUploader from "./ImageUploader";
import MetadataTabs from "./MetadataTabs";

const supportedFormats = ["Stable Diffusion", "ComfyUI"];

export default function ImageDetails() {
  const [shortFileName, setShortFileName] = useState<string | null>(null);
  const [kindOfPrompt, setKindOfPrompt] = useState<string | null>(null);
  const { imageUrl, metadata, fileName } = useImageContext();

  useEffect(() => {
    if (fileName) {
      const lastDotIndex = fileName.lastIndexOf(".");
      let baseFileName = fileName;
      let fileExtension = "";

      if (lastDotIndex !== -1) {
        baseFileName = fileName.substring(0, lastDotIndex);
        fileExtension = fileName.substring(lastDotIndex);
      }

      if (baseFileName.length > MAX_FILENAME_LENGTH) {
        baseFileName = baseFileName.substring(0, MAX_FILENAME_LENGTH) + "...";
      }

      setShortFileName(baseFileName + fileExtension);
    } else {
      setShortFileName(null);
    }
  }, [fileName]);

  let parametersSections = metadata?.parameters || metadata?.prompt || "";
  parametersSections = parametersSections.replace(/[\uFFFD]/g, " ");

  useEffect(() => {
    if (metadata?.parameters) {
      setKindOfPrompt("parameters");
    } else if (metadata?.prompt) {
      setKindOfPrompt("prompt");
    } else {
      setKindOfPrompt(null);
    }
  }, [metadata]);

  const hasImage = !!imageUrl;

  return (
    <div
      className={
        hasImage
          ? ""
          : "flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] gap-8"
      }
    >
      {/* Hero header — only when no image */}
      <AnimatePresence>
        {!hasImage && (
          <motion.div
            key="hero-header"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-3"
          >
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Drop an AI-generated image to extract its metadata and generation
              parameters
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — ImageUploader is always mounted (same instance) */}
      <div
        className={
          hasImage
            ? "grid grid-cols-1 lg:grid-cols-[minmax(280px,1fr)_2fr] gap-6"
            : "w-full max-w-2xl"
        }
      >
        <div className="flex flex-col gap-3 lg:sticky lg:top-4 lg:self-start">
          <motion.div
            layout
            className={
              hasImage
                ? "rounded-xl overflow-hidden border bg-background/50"
                : ""
            }
          >
            <ImageUploader variant={hasImage ? "default" : "hero"} />
          </motion.div>

          {/* Filename bar — only when image uploaded */}
          <AnimatePresence>
            {hasImage && (
              <motion.div
                key="filename"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3"
              >
                <DocumentTextIcon className="size-4 text-primary shrink-0" />
                <span className="font-medium text-primary">File:</span>
                <span className="truncate">
                  {shortFileName || "No file selected"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Metadata tabs — only when image uploaded */}
        <AnimatePresence>
          {hasImage && (
            <motion.div
              key="metadata"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-xl border shadow-sm p-5 min-h-[300px]"
            >
              <MetadataTabs
                metadata={metadata}
                parametersSections={parametersSections}
                kindOfPrompt={kindOfPrompt}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Format badges — only when no image */}
      <AnimatePresence>
        {!hasImage && (
          <motion.div
            key="badges"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {supportedFormats.map((format) => (
              <span
                key={format}
                className="bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-full font-medium"
              >
                {format}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
