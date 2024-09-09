"use client";
import ImageDetails from "@/components/ImageDetails";
import ImageUploader from "@/components/ImageUploader";
import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState<string | null>(null);
  return (
    <>
      <div className="w-full px-4 my-16">
        <ImageUploader setFileName={setFileName} />
      </div>
      <div className="mt-12 px-4 flex">
        <ImageDetails fileName={fileName} />
      </div>
    </>
  );
}
