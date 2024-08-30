"use client";
import ImageDetails from "@/components/ImageDetails";
import ImageUploader from "@/components/ImageUploader";
import { Metadata } from "@/lib/types";
import { useState } from "react";

export default function Home() {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  return (
    <>
      <h1 className="font-bold text-3xl m-4">Metadata Reader</h1>
      <div className="w-full flex gap-4">
        <div className="w-1/2">
          <div className="mx-4">
            <p className="text-lg">Upload an image to read its metadata.</p>
            <ImageUploader
              setMetadata={setMetadata}
              setImageUrl={setImageUrl}
              setFileName={setFileName}
            />
          </div>
        </div>
        <div className="w-1/2">
          <ImageDetails
            metadata={metadata}
            imageUrl={imageUrl}
            fileName={fileName}
          />
        </div>
      </div>
    </>
  );
}
