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
    <div className="max-w-7xl mx-auto">
      <div className="m-4">
        <h1 className="font-bold text-3xl">Metadata Reader</h1>
        <p className="text-lg">Upload an image to read its metadata.</p>
      </div>
      <div className="w-full px-4 mt-8">
        <ImageUploader
          setMetadata={setMetadata}
          setImageUrl={setImageUrl}
          setFileName={setFileName}
        />
      </div>
      <div className="mt-12 px-4 flex">
        <ImageDetails
          metadata={metadata}
          imageUrl={imageUrl}
          fileName={fileName}
        />
      </div>
    </div>
  );
}
