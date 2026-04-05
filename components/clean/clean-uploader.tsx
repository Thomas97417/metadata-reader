"use client";

import { useFileUpload } from "@/hooks/use-file-upload";
import { useCleanContext } from "@/context/clean-context";
import { AnimatePresence, motion } from "framer-motion";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useCallback, useRef } from "react";
import CleanDropzone from "./clean-dropzone";
import CleanImageCard from "./clean-image-card";
import CleanAddCard from "./clean-add-card";
import CleanActionBar from "./clean-action-bar";

export default function CleanUploader() {
  const {
    cleanFiles,
    isProcessing,
    suffix,
    setSuffix,
    addFiles,
    removeFile,
    clearAll,
    processAll,
    downloadFile,
    downloadAll,
  } = useCleanContext();

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
    [originalHandleDrop, addFiles],
  );

  const getInputProps = useCallback(() => {
    const { ref, ...props } = originalGetInputProps() as ReturnType<
      typeof originalGetInputProps
    > & { ref?: unknown };
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
    if (dotIndex === -1) return name.slice(0, max - 4) + "...";
    const ext = name.slice(dotIndex);
    const baseName = name.slice(0, dotIndex);
    const tailLen = 4;
    const availStart = max - ext.length - tailLen - 4; // 4 for "..."
    if (availStart <= 0) return "..." + baseName.slice(-tailLen) + ext;
    return (
      baseName.slice(0, availStart) + "..." + baseName.slice(-tailLen) + ext
    );
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

            <div className="sticky bottom-4 z-50">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
