"use client";

import { useFileUpload } from "@/hooks/use-file-upload";
import { cleanImage } from "@/lib/clean-image";
import { AnimatePresence, motion } from "framer-motion";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useCallback, useRef, useState } from "react";
import JSZip from "jszip";
import CleanDropzone from "./clean-dropzone";
import CleanImageCard from "./clean-image-card";
import CleanAddCard from "./clean-add-card";
import CleanActionBar from "./clean-action-bar";

export type FileStatus = "queued" | "processing" | "done" | "error";

export interface CleanableFile {
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [
    { isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop: originalHandleDrop,
      getInputProps: originalGetInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    multiple: true,
  });

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

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
    const { ref, ...props } = originalGetInputProps() as ReturnType<typeof originalGetInputProps> & { ref?: unknown };
    return {
      ...props,
      ref: fileInputRef,
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

  const truncateName = (name: string, max: number = 20) => {
    if (name.length <= max) return name;
    const dotIndex = name.lastIndexOf(".");
    if (dotIndex === -1) return name.slice(0, max - 3) + "...";
    const ext = name.slice(dotIndex);
    const baseName = name.slice(0, dotIndex);
    const tailLen = 3;
    const availStart = max - ext.length - tailLen - 3; // 3 for "..."
    if (availStart <= 0) return "..." + baseName.slice(-tailLen) + ext;
    return baseName.slice(0, availStart) + "..." + baseName.slice(-tailLen) + ext;
  };

  return (
    <div
      className={`flex flex-col gap-6 ${!hasFiles ? "items-center justify-center min-h-[calc(100vh-12rem)]" : ""}`}
    >
      {/* Single hidden file input — kept outside conditional blocks to avoid ref loss */}
      <input
        {...getInputProps()}
        className="sr-only"
        aria-label="Upload files"
      />

      {!hasFiles && (
        <CleanDropzone
          isDragging={isDragging}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onBrowse={openFileDialog}
        />
      )}

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
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {cleanFiles.map((file, index) => (
                <CleanImageCard
                  key={file.id}
                  file={file}
                  index={index}
                  isProcessing={isProcessing}
                  onRemove={removeFile}
                  onDownload={downloadFile}
                  truncateName={truncateName}
                />
              ))}
              <CleanAddCard
                isDragging={isDragging}
                animationDelay={cleanFiles.length * 0.05}
                onBrowse={openFileDialog}
              />
            </div>

            <CleanActionBar
              totalCount={totalCount}
              completedCount={completedCount}
              allDone={allDone}
              hasQueued={hasQueued}
              isProcessing={isProcessing}
              suffix={suffix}
              onSuffixChange={setSuffix}
              onClearAll={clearAll}
              onProcessAll={processAll}
              onDownloadAll={downloadAll}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
