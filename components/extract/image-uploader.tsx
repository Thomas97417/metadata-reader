"use client";
import { useFileUpload } from "@/hooks/use-file-upload";
import * as exifr from "exifr";
import { isWebpFile, parseWebpMetadata } from "@/lib/webp-parser";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpTrayIcon,
  ExclamationCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useRef } from "react";
import { useImageContext } from "../../context/image-context";

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
            metadata = await parseWebpMetadata(files[0].file);
          } else {
            metadata = await exifr.parse(files[0].file);
            console.log("Parsing EXIF metadata", metadata);
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
          className={`relative flex flex-col items-center justify-center overflow-hidden transition-all hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
            previewUrl
              ? ""
              : isDragging
                ? "rounded-2xl ring-2 ring-primary/50 bg-primary/5 shadow-lg"
                : "rounded-2xl bg-card ring-1 ring-primary/15 shadow-sm hover:ring-primary/30 hover:shadow-md"
          } ${isHero ? "min-h-[400px]" : "min-h-[300px]"}`}
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
                {isHero ? (
                  <>
                    {/* Hero icon */}
                    <motion.div
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mb-4 flex shrink-0 items-center justify-center rounded-full size-20 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20"
                    >
                      <MagnifyingGlassIcon className="size-10 text-primary/70" />
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                      Extract Metadata
                    </h1>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-1 mb-5">
                      Reveal AI generation parameters from your images
                    </p>

                    {/* 3-step process */}
                    <div className="flex items-center gap-0 mb-5">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <ArrowUpTrayIcon className="size-5 text-primary/60" />
                        </div>
                        <span className="text-[11px] text-muted-foreground font-medium">
                          Upload
                        </span>
                      </div>
                      <div className="w-10 sm:w-14 h-px border-t border-dashed border-primary/25 -mt-4" />
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <MagnifyingGlassIcon className="size-5 text-primary/60" />
                        </div>
                        <span className="text-[11px] text-muted-foreground font-medium">
                          Extract
                        </span>
                      </div>
                      <div className="w-10 sm:w-14 h-px border-t border-dashed border-primary/25 -mt-4" />
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <EyeIcon className="size-5 text-primary/60" />
                        </div>
                        <span className="text-[11px] text-muted-foreground font-medium">
                          View
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      type="button"
                      variant="default"
                      size="default"
                      className="rounded-full px-6 shadow-sm gap-2"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        openFileDialog();
                      }}
                    >
                      <ArrowUpTrayIcon className="size-4" />
                      Browse files
                    </Button>
                    <p className="text-muted-foreground/50 text-xs mt-3">
                      or drop an image anywhere on this card
                    </p>

                    {/* Privacy footer */}
                    <div className="flex items-center gap-1.5 mt-4 text-muted-foreground/40">
                      <ShieldCheckIcon className="size-3.5" />
                      <span className="text-[11px]">
                        Everything stays in your browser
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className="mb-3 flex shrink-0 items-center justify-center rounded-full size-20 bg-background/80 border-2 border-muted-foreground/20 hover:border-primary/30 shadow-md transition-colors"
                    >
                      <ArrowUpTrayIcon className="size-8 text-muted-foreground/60" />
                    </motion.div>
                    <h3 className="mb-2 font-semibold text-lg">
                      Drop your image here
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      or click to browse
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
