"use client";

import { useFileUpload } from "@/hooks/use-file-upload";
import { cleanImage } from "@/lib/clean-image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
  ArchiveBoxXMarkIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { useCallback, useRef, useState } from "react";
import JSZip from "jszip";

type FileStatus = "queued" | "processing" | "done" | "error";

interface CleanableFile {
  id: string;
  file: File;
  preview: string;
  status: FileStatus;
  cleanedBlob: Blob | null;
  error: string | null;
}

export default function CleanUploader() {
  const [cleanFiles, setCleanFiles] = useState<CleanableFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suffix, setSuffix] = useState("_clean");
  const processingRef = useRef(false);

  const [
    { isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop: originalHandleDrop,
      openFileDialog,
      getInputProps: originalGetInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    multiple: true,
  });

  // Intercept file upload to add to our own state
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const droppedFiles = e.dataTransfer?.files;
      if (!droppedFiles?.length) return;
      addFiles(droppedFiles);
      // Still call original to clear dragging state
      originalHandleDrop(e);
    },
    [originalHandleDrop],
  );

  const addFiles = useCallback((fileList: FileList) => {
    const newFiles: CleanableFile[] = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({
        id: Math.random().toString(36).slice(2),
        file,
        preview: URL.createObjectURL(file),
        status: "queued" as const,
        cleanedBlob: null,
        error: null,
      }));
    setCleanFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const getInputProps = useCallback(() => {
    const props = originalGetInputProps();
    return {
      ...props,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files?.length) {
          addFiles(files);
        }
        e.target.value = "";
      },
    };
  }, [originalGetInputProps, addFiles]);

  const removeFile = useCallback((id: string) => {
    setCleanFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    cleanFiles.forEach((f) => URL.revokeObjectURL(f.preview));
    setCleanFiles([]);
  }, [cleanFiles]);

  const processAll = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    setIsProcessing(true);

    const filesToProcess = cleanFiles.filter(
      (f) => f.status === "queued" || f.status === "error",
    );

    for (const file of filesToProcess) {
      setCleanFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: "processing" as const } : f,
        ),
      );

      try {
        const blob = await cleanImage(file.file);
        setCleanFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, status: "done" as const, cleanedBlob: blob }
              : f,
          ),
        );
      } catch {
        setCleanFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  status: "error" as const,
                  error: "Failed to process",
                }
              : f,
          ),
        );
      }
    }

    setIsProcessing(false);
    processingRef.current = false;
  }, [cleanFiles]);

  const downloadFile = useCallback(
    (file: CleanableFile) => {
      if (!file.cleanedBlob) return;
      const url = URL.createObjectURL(file.cleanedBlob);
      const a = document.createElement("a");
      a.href = url;
      const ext = file.file.name.split(".").pop() || "jpg";
      const baseName = file.file.name.replace(/\.[^.]+$/, "");
      a.download = `${baseName}${suffix}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
    [suffix],
  );

  const downloadAll = useCallback(async () => {
    const doneFiles = cleanFiles.filter((f) => f.status === "done");
    if (doneFiles.length === 0) return;
    if (doneFiles.length === 1) {
      downloadFile(doneFiles[0]);
      return;
    }
    const zip = new JSZip();
    doneFiles.forEach((file) => {
      if (!file.cleanedBlob) return;
      const ext = file.file.name.split(".").pop() || "jpg";
      const baseName = file.file.name.replace(/\.[^.]+$/, "");
      zip.file(`${baseName}${suffix}.${ext}`, file.cleanedBlob);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned_images.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [cleanFiles, downloadFile, suffix]);

  const completedCount = cleanFiles.filter((f) => f.status === "done").length;
  const totalCount = cleanFiles.length;
  const hasFiles = totalCount > 0;
  const allDone = hasFiles && cleanFiles.every((f) => f.status === "done");
  const hasQueued = cleanFiles.some(
    (f) => f.status === "queued" || f.status === "error",
  );

  const truncateName = (name: string, max: number = 20) =>
    name.length > max ? name.slice(0, max - 3) + "..." : name;

  return (
    <div
      className={`flex flex-col gap-6 ${!hasFiles ? "items-center justify-center min-h-[calc(100vh-12rem)]" : ""}`}
    >
      {/* Info section */}
      {!hasFiles && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-2 max-w-lg mx-auto"
        >
          <h2 className="text-lg font-semibold tracking-tight">
            Why remove metadata?
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your images contain hidden data — location, device info, software
            settings, and AI generation parameters. Cleaning metadata protects
            your privacy before sharing online.
          </p>
        </motion.div>
      )}

      {/* Upload Zone */}
      <motion.div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        animate={{ scale: isDragging ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        className={`relative flex flex-col items-center justify-center overflow-hidden transition-all hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
          isDragging
            ? "ring-2 ring-primary/50 bg-primary/5 shadow-lg"
            : "bg-card ring-1 ring-primary/15 shadow-sm hover:ring-primary/30 hover:shadow-md"
        } ${hasFiles ? "rounded-2xl min-h-[140px]" : "rounded-2xl min-h-[320px] py-8 w-full max-w-3xl"}`}
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload files"
        />

        {hasFiles ? (
          <>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="mb-2 flex shrink-0 items-center justify-center rounded-full size-14 bg-primary/10 border border-primary/30"
            >
              <ArrowUpTrayIcon className="size-6 text-primary/70" />
            </motion.div>
            <h3 className="font-semibold text-base">Add more images</h3>
          </>
        ) : (
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
              <ArchiveBoxXMarkIcon className="size-10 text-primary/70" />
            </motion.div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              Clean Metadata
            </h1>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-1 mb-5">
              Strip metadata from multiple images at once
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
                  <ArchiveBoxXMarkIcon className="size-5 text-primary/60" />
                </div>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Clean
                </span>
              </div>
              <div className="w-10 sm:w-14 h-px border-t border-dashed border-primary/25 -mt-4" />
              <div className="flex flex-col items-center gap-1.5">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowDownTrayIcon className="size-5 text-primary/60" />
                </div>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Download
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
              or drop images anywhere on this card
            </p>

            {/* Privacy footer */}
            <div className="flex items-center gap-1.5 mt-4 text-muted-foreground/40">
              <ShieldCheckIcon className="size-3.5" />
              <span className="text-[11px]">
                Everything stays in your browser
              </span>
            </div>
          </>
        )}
      </motion.div>

      {/* Error display */}
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

      {/* Image Grid */}
      <AnimatePresence>
        {hasFiles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Progress bar */}
            {(isProcessing || completedCount > 0) && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {allDone
                      ? "All images cleaned!"
                      : `${completedCount} / ${totalCount} cleaned`}
                  </span>
                  <span className="text-muted-foreground font-mono text-xs">
                    {Math.round((completedCount / totalCount) * 100)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(completedCount / totalCount) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {cleanFiles.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`group relative rounded-xl border overflow-hidden bg-card transition-colors ${
                    file.status === "done"
                      ? "border-green-500/30"
                      : file.status === "error"
                        ? "border-destructive/30"
                        : file.status === "processing"
                          ? "border-primary/40"
                          : "border-border"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="h-full w-full object-cover"
                    />

                    {/* Status overlay */}
                    <AnimatePresence mode="wait">
                      {file.status === "processing" && (
                        <motion.div
                          key="processing"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <ArrowPathIcon className="size-8 text-primary" />
                          </motion.div>
                        </motion.div>
                      )}
                      {file.status === "done" && (
                        <motion.div
                          key="done"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 bg-green-500/10 flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 15,
                            }}
                          >
                            <CheckCircleIcon className="size-10 text-green-500" />
                          </motion.div>
                        </motion.div>
                      )}
                      {file.status === "error" && (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-destructive/10 flex items-center justify-center"
                        >
                          <ExclamationCircleIcon className="size-10 text-destructive" />
                        </motion.div>
                      )}
                      {file.status === "queued" && (
                        <motion.div
                          key="queued"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-background/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ClockIcon className="size-6 text-muted-foreground" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Remove button */}
                    {!isProcessing && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(file.id);
                        }}
                        className="absolute top-2 right-2 z-10 flex size-7 cursor-pointer items-center justify-center rounded-full bg-primary/80 text-primary-foreground transition-colors hover:bg-primary"
                        aria-label="Remove image"
                      >
                        <XMarkIcon className="size-3.5" />
                      </motion.button>
                    )}

                    {/* Individual download button */}
                    {file.status === "done" && (
                      <motion.button
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(file);
                        }}
                        className="absolute bottom-2 right-2 size-7 rounded-full bg-green-500/90 flex items-center justify-center hover:bg-green-500 transition-colors"
                        aria-label="Download cleaned image"
                      >
                        <ArrowDownTrayIcon className="size-3.5 text-white" />
                      </motion.button>
                    )}
                  </div>

                  {/* Filename */}
                  <div className="px-2.5 py-2 flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground truncate">
                      {truncateName(file.file.name)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>
                  {totalCount} image{totalCount !== 1 ? "s" : ""}
                </span>
                {completedCount > 0 && (
                  <span className="text-green-500 font-medium">
                    · {completedCount} cleaned
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <label
                    htmlFor="suffix-input"
                    className="text-xs text-muted-foreground whitespace-nowrap"
                  >
                    Suffix
                  </label>
                  <Input
                    id="suffix-input"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                    placeholder="_clean"
                    className="h-8 w-28 text-xs"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  disabled={isProcessing}
                  className="hover:cursor-pointer"
                >
                  Clear all
                </Button>

                {allDone ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                  >
                    <Button
                      size="sm"
                      onClick={downloadAll}
                      className="gap-1.5 hover:cursor-pointer bg-green-600 hover:bg-green-700 text-white"
                    >
                      <ArrowDownTrayIcon className="size-4" />
                      Download all
                    </Button>
                  </motion.div>
                ) : (
                  <Button
                    size="sm"
                    onClick={processAll}
                    disabled={isProcessing || !hasQueued}
                    className="gap-1.5 hover:cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <ArrowPathIcon className="size-4" />
                        </motion.div>
                        Cleaning...
                      </>
                    ) : (
                      <>
                        <ArchiveBoxXMarkIcon className="size-4" />
                        Clean all
                      </>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
