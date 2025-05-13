"use client";
import { Metadata } from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface ImageContextType {
  imageUrl: string | null;
  metadata: Metadata | null;
  fileName: string | null;
  setImageUrl: (url: string | null) => void;
  setMetadata: (metadata: Metadata | null) => void;
  setFileName: (fileName: string | null) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageContextProvider = ({ children }: { children: ReactNode }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <ImageContext.Provider
      value={{
        imageUrl,
        metadata,
        fileName,
        setImageUrl,
        setMetadata,
        setFileName,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
