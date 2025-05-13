"use client";
import { useFileUpload } from "@/hooks/use-file-upload";
import * as exifr from "exifr";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { useImageContext } from "./ImageContext";

export default function ImageUploader() {
  const { setImageUrl, setMetadata, setFileName } = useImageContext();

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
  });

  const previewUrl = files[0]?.preview || null;

  useEffect(() => {
    const processMetadata = async () => {
      if (files[0]?.file) {
        setFileName(files[0].file.name);
        setImageUrl(files[0].preview);

        try {
          const metadata = await exifr.parse(files[0].file);
          setMetadata(metadata);
        } catch (error) {
          console.error("Error reading EXIF data:", error);
          setMetadata(null);
        }
      } else {
        setFileName(null);
        setImageUrl(null);
        setMetadata(null);
      }
    };

    processMetadata();
  }, [files, setFileName, setImageUrl, setMetadata]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-2"
    >
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
            borderColor: isDragging
              ? "hsl(var(--primary))"
              : "hsl(var(--border))",
            backgroundColor: isDragging ? "hsl(var(--accent))" : "transparent",
          }}
          transition={{ duration: 0.2 }}
          className="relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-xl transition-all hover:cursor-pointer hover:bg-accent/20 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
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
                    className="bg-white/10 p-3 rounded-full border border-white/20 backdrop-blur-sm"
                  >
                    <ImageUpIcon className="size-5 text-white" />
                  </motion.div>
                  <p className="text-white/90 text-sm font-medium tracking-wide">
                    Change image
                  </p>
                  <p className="text-white/60 text-xs">
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
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="bg-background/80 mb-2 flex size-20 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/20 shadow-md hover:border-primary/30 transition-colors"
                >
                  <ImageUpIcon className="size-8 text-muted-foreground/60" />
                </motion.div>
                <h3 className="mb-2 text-lg font-semibold">
                  Drop your image here
                </h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  or click to browse
                </p>
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
                className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                onClick={() => removeFile(files[0]?.id)}
                aria-label="Remove image"
              >
                <XIcon className="size-4" aria-hidden="true" />
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
            <AlertCircleIcon className="size-4 shrink-0" />
            <span>{errors[0]}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
