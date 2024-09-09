"use client";
import { Metadata } from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface ImageContextType {
  imageUrl: string | null;
  metadata: Metadata | null;
  setImageUrl: (url: string | null) => void;
  setMetadata: (metadata: Metadata | null) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  return (
    <ImageContext.Provider
      value={{ imageUrl, metadata, setImageUrl, setMetadata }}
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
