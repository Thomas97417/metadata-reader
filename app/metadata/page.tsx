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
      <div className="w-full px-4 my-16">
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
    </>
  );
}
