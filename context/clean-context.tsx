"use client";

import { cleanImage } from "@/lib/clean-image";
import JSZip from "jszip";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

export type FileStatus = "queued" | "processing" | "done" | "error";

export interface CleanableFile {
  id: string;
  file: File;
  preview: string;
  status: FileStatus;
  cleanedBlob: Blob | null;
  error: string | null;
}

interface CleanContextType {
  cleanFiles: CleanableFile[];
  isProcessing: boolean;
  suffix: string;
  setSuffix: (value: string) => void;
  addFiles: (fileList: FileList) => void;
  removeFile: (id: string) => void;
  clearAll: () => void;
  processAll: () => Promise<void>;
  downloadFile: (file: CleanableFile) => void;
  downloadAll: () => Promise<void>;
}

const CleanContext = createContext<CleanContextType | undefined>(undefined);

export const CleanContextProvider = ({ children }: { children: ReactNode }) => {
  const [cleanFiles, setCleanFiles] = useState<CleanableFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suffix, setSuffix] = useState("_clean");
  const processingRef = useRef(false);

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

  const removeFile = useCallback((id: string) => {
    setCleanFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setCleanFiles((prev) => {
      prev.forEach((f) => URL.revokeObjectURL(f.preview));
      return [];
    });
  }, []);

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

  return (
    <CleanContext.Provider
      value={{
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
      }}
    >
      {children}
    </CleanContext.Provider>
  );
};

export const useCleanContext = () => {
  const context = useContext(CleanContext);
  if (!context) {
    throw new Error("useCleanContext must be used within a CleanContextProvider");
  }
  return context;
};
