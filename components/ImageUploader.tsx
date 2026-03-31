"use client";
import { useFileUpload } from "@/hooks/use-file-upload";
import * as exifr from "exifr";
import { isWebpFile, parseWebpMetadata } from "@/lib/webp-parser";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpTrayIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { useImageContext } from "./ImageContext";

type ImageUploaderProps = {
  variant?: "default" | "hero";
};

export default function ImageUploader({
  variant = "default",
}: ImageUploaderProps) {
  const { imageUrl, setImageUrl, setMetadata, setFileName } = useImageContext();
  const hasInteracted = useRef(false);

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop: originalHandleDrop,
      openFileDialog: originalOpenFileDialog,
      removeFile: originalRemoveFile,
      getInputProps: originalGetInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
  });

  const markInteracted = () => {
    hasInteracted.current = true;
  };

  const handleDrop = (e: React.DragEvent) => {
    markInteracted();
    originalHandleDrop(e);
  };

  const openFileDialog = () => {
    markInteracted();
    originalOpenFileDialog();
  };

  const removeFile = (id: string) => {
    markInteracted();
    originalRemoveFile(id);
  };

  const getInputProps = () => {
    const props = originalGetInputProps();
    const originalOnChange = props.onChange;
    return {
      ...props,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        markInteracted();
        originalOnChange(e);
      },
    };
  };

  const previewUrl = files[0]?.preview || imageUrl || null;
  const isHero = variant === "hero";

  useEffect(() => {
    const processMetadata = async () => {
      if (files[0]?.file) {
        setFileName(files[0].file.name);
        setImageUrl(files[0].preview);

        try {
          let metadata;
          if (isWebpFile(files[0].file)) {
            console.log("Parsing WebP metadata");
            metadata = await parseWebpMetadata(files[0].file);
          } else {
            console.log("Parsing EXIF metadata");
            metadata = await exifr.parse(files[0].file);
          }
          setMetadata(metadata);
        } catch (error) {
          console.error("Error reading metadata:", error);
          setMetadata(null);
        }
      } else if (hasInteracted.current) {
        setFileName(null);
        setImageUrl(null);
        setMetadata(null);
      }
    };

    processMetadata();
  }, [files, setFileName, setImageUrl, setMetadata]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <motion.div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          animate={{
            scale: isDragging ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
          className={`relative flex flex-col items-center justify-center overflow-hidden rounded-xl transition-all hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
            previewUrl
              ? ""
              : isHero
                ? "border-2 border-dashed border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/8"
                : "bg-card shadow-sm hover:shadow-md"
          } ${isDragging ? "bg-primary/10 border-primary/60" : ""} ${
            isHero ? "min-h-[400px]" : "min-h-[300px]"
          }`}
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
          />
          <AnimatePresence mode="wait">
            {previewUrl ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 group"
              >
                <img
                  src={previewUrl}
                  alt={files[0]?.file?.name || "Uploaded image"}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-xl flex flex-col gap-2 items-center justify-center backdrop-blur-[2px]">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    className="bg-primary-foreground/10 p-3 rounded-full border border-primary-foreground/20 backdrop-blur-sm"
                  >
                    <ArrowUpTrayIcon className="size-5 text-primary-foreground" />
                  </motion.div>
                  <p className="text-primary-foreground/90 text-sm font-medium tracking-wide">
                    Change image
                  </p>
                  <p className="text-primary-foreground/60 text-xs">
                    Drop a new file or click to browse
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center px-4 py-6 text-center"
              >
                <motion.div
                  animate={isHero ? { y: [0, -6, 0] } : {}}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={
                    isHero
                      ? {
                          y: {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          scale: {
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          },
                        }
                      : { type: "spring", stiffness: 400, damping: 17 }
                  }
                  className={`mb-3 flex shrink-0 items-center justify-center rounded-full shadow-md transition-colors ${
                    isHero
                      ? "size-24 bg-primary/10 border-2 border-primary/30 hover:border-primary/50"
                      : "size-20 bg-background/80 border-2 border-muted-foreground/20 hover:border-primary/30"
                  }`}
                >
                  <ArrowUpTrayIcon
                    className={
                      isHero
                        ? "size-12 text-primary/70"
                        : "size-8 text-muted-foreground/60"
                    }
                  />
                </motion.div>
                <h3
                  className={`mb-2 font-semibold ${isHero ? "text-2xl" : "text-lg"}`}
                >
                  Drop your image here
                </h3>
                <p
                  className={`text-muted-foreground ${isHero ? "text-base mb-2" : "text-sm mb-2"}`}
                >
                  {isHero ? "or" : "or click to browse"}
                </p>
                {isHero && (
                  <>
                    <Button
                      type="button"
                      variant="default"
                      size="lg"
                      className="mt-1 rounded-full px-8 shadow-md"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        openFileDialog();
                      }}
                    >
                      Browse files
                    </Button>
                    <p className="text-muted-foreground/60 text-xs mt-3">
                      Supports PNG, JPG, WebP
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {previewUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 right-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-primary/80 text-primary-foreground transition-colors outline-none hover:bg-primary focus-visible:ring-[3px]"
                onClick={() => removeFile(files[0]?.id)}
                aria-label="Remove image"
              >
                <XMarkIcon className="size-4" aria-hidden="true" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-destructive flex items-center gap-1.5 text-sm bg-destructive/10 p-3 rounded-lg border border-destructive/20"
            role="alert"
          >
            <ExclamationCircleIcon className="size-4 shrink-0" />
            <span>{errors[0]}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
