"use client";
import { MAX_FILENAME_LENGTH } from "@/lib/constants";
import { useEffect, useState } from "react";
import ParametersDetails from "./ParametersDetails";
type ImageDetailsProps = {
  metadata: any;
  imageUrl: string | null;
  fileName: string | null;
};

export default function ImageDetails({
  metadata,
  imageUrl,
  fileName,
}: ImageDetailsProps) {
  const [shortFileName, setShortFileName] = useState<string | null>(null);
  const [kindOfPrompt, setKindOfPrompt] = useState<string | null>(null);

  useEffect(() => {
    if (fileName) {
      const lastDotIndex = fileName.lastIndexOf(".");
      let baseFileName = fileName;
      let fileExtension = "";

      if (lastDotIndex !== -1) {
        baseFileName = fileName.substring(0, lastDotIndex);
        fileExtension = fileName.substring(lastDotIndex);
      }

      // Shorten the base file name if it's too long
      if (baseFileName.length > MAX_FILENAME_LENGTH) {
        baseFileName = baseFileName.substring(0, MAX_FILENAME_LENGTH) + "...";
      }

      setShortFileName(baseFileName + fileExtension);
    } else {
      setShortFileName(null);
    }
  }, [fileName]);

  let parametersSections = metadata?.parameters || metadata?.prompt || "";
  parametersSections = parametersSections.replace(/�/g, " ");

  useEffect(() => {
    if (metadata?.parameters) {
      setKindOfPrompt("parameters");
    } else if (metadata?.prompt) {
      setKindOfPrompt("prompt");
    } else {
      setKindOfPrompt(null);
    }
  }, [metadata]);

  return (
    <div className="flex flex-col md:flex-row w-full">
      {imageUrl && (
        <div className="w-1/2 flex flex-col">
          <div className="w-96 h-96 md:w-[450px] md:h-[450px] xl:w-[600px] xl:h-[600px] relative">
            <img
              src={imageUrl}
              alt="uploaded"
              className="w-full h-full object-contain rounded-md"
            />
          </div>
          <p className="text-sm font-light ">
            <span className="text-md font-semibold">Filename:</span>{" "}
            {shortFileName}
          </p>
        </div>
      )}
      {metadata !== null && (
        <ParametersDetails
          metadata={metadata}
          parametersSections={parametersSections}
          kindOfPrompt={kindOfPrompt}
        />
      )}
    </div>
  );
}
