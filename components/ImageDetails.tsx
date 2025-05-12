"use client";
import { MAX_FILENAME_LENGTH } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useImageContext } from "./ImageContext";
import ImageUploader from "./ImageUploader";
import ParametersDetails from "./ParametersDetails";

type ImageDetailsProps = {
  fileName: string | null;
  setFileName: (fileName: string | null) => void;
};

export default function ImageDetails({
  fileName,
  setFileName,
}: ImageDetailsProps) {
  const [shortFileName, setShortFileName] = useState<string | null>(null);
  const [kindOfPrompt, setKindOfPrompt] = useState<string | null>(null);
  const { imageUrl, metadata } = useImageContext();

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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col xlg:flex-row w-full gap-8 bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-xl overflow-hidden border bg-background/50"
          >
            <ImageUploader setFileName={setFileName} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 hover:bg-muted/70 transition-colors"
          >
            <FileText className="size-4 text-primary" />
            <span className="font-medium text-primary">File:</span>
            <span className="truncate">
              {shortFileName || "No file selected"}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full lg:w-1/2 flex flex-col gap-4"
        >
          {metadata !== null ? (
            <ParametersDetails
              metadata={metadata}
              parametersSections={parametersSections}
              kindOfPrompt={kindOfPrompt}
            />
          ) : imageUrl !== null ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full p-8 bg-muted/30 rounded-lg border border-dashed"
            >
              <p className="text-muted-foreground text-center">
                No metadata found in this image
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full p-8"
            >
              <p className="text-muted-foreground text-center">
                Upload an image to view its metadata and generation parameters
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
