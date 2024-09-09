"use client";
import { MAX_FILENAME_LENGTH } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useImageContext } from "./ImageContext";
import ParametersDetails from "./ParametersDetails";

type ImageDetailsProps = {
  fileName: string | null;
};

export default function ImageDetails({ fileName }: ImageDetailsProps) {
  const [shortFileName, setShortFileName] = useState<string | null>(null);
  const [kindOfPrompt, setKindOfPrompt] = useState<string | null>(null);
  const { imageUrl, metadata } = useImageContext();

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
    <>
      {imageUrl !== null && (
        <div className="flex flex-col md:flex-row w-full gap-4">
          {imageUrl && (
            <div className="w-full md:w-1/2 flex flex-col">
              <img
                src={imageUrl}
                alt="uploaded"
                className="w-full object-contain rounded-md"
              />
              <p className="text-sm font-light">
                <span className="text-md font-semibold">Filename:</span>{" "}
                {shortFileName}
              </p>
            </div>
          )}
          {metadata !== null && (
            <div className="w-full md:w-1/2">
              <ParametersDetails
                metadata={metadata}
                parametersSections={parametersSections}
                kindOfPrompt={kindOfPrompt}
              />
            </div>
          )}
        </div>
      )}
      {metadata === null && imageUrl === null && (
        <div className="flex justify-center w-full">
          <p className="text-2xl font-medium mt-8">
            Upload an image to read its metadata.
          </p>
        </div>
      )}
    </>
  );
}
