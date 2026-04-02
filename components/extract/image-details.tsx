"use client";
import { MAX_FILENAME_LENGTH } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useImageContext } from "../../context/image-context";
import ImageUploader from "./image-uploader";
import MetadataTabs from "./metadata-tabs";

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
          : "flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] gap-6"
      }
    >
      {/* Info section */}
      {!hasImage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-2 max-w-lg mx-auto"
        >
          <h2 className="text-lg font-semibold tracking-tight">
            What can you find?
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            AI-generated images embed prompts, models, seeds, and sampler
            settings in their metadata. Extract them instantly to understand how
            any image was created.
          </p>
        </motion.div>
      )}

      {/* Main content — ImageUploader is always mounted (same instance) */}
      <div
        className={
          hasImage
            ? "grid grid-cols-1 md:grid-cols-[minmax(280px,1fr)_2fr] gap-6"
            : "w-full max-w-3xl"
        }
      >
        <div className="flex flex-col gap-3 md:sticky md:top-4 md:self-start">
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

          {/* Format badges — only when no image */}
          {!hasImage && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-muted-foreground/50 text-xs">
                Supported:
              </span>
              {supportedFormats.map((format) => (
                <span
                  key={format}
                  className="bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-full font-medium"
                >
                  {format}
                </span>
              ))}
            </div>
          )}

          {/* Filename bar — only when image uploaded */}
          <AnimatePresence>
            {hasImage && (
              <motion.div
                key="filename"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <DocumentTextIcon className="size-4 text-primary shrink-0" />
                  <span className="font-medium text-primary">File:</span>
                  <span className="truncate">
                    {shortFileName || "No file selected"}
                  </span>
                </div>
                {kindOfPrompt && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground/70">
                      Generated with
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full
                      bg-primary/15 text-primary
                      "
                    >
                      {kindOfPrompt === "parameters"
                        ? "Automatic1111"
                        : "ComfyUI"}
                    </span>
                  </div>
                )}
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
    </div>
  );
}
