"use client";
import { useState } from "react";
import ModelToggle from "./AIModelToggle";
import CopyToClipboard from "./CopyToClipboard";
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
  const [copied, setCopied] = useState(false);
  const [isComfyUI, setIsComfyUI] = useState(false);
  const parametersSections = metadata?.parameters || "";
  console.log(parametersSections);

  // Split parametersSections into three parts
  const negativePromptIndex = parametersSections.indexOf("Negative prompt");
  const stepsIndex = parametersSections.indexOf("Steps");

  const part1 = parametersSections.substring(0, negativePromptIndex).trim();
  const part2 = parametersSections
    .substring(negativePromptIndex, stepsIndex)
    .trim();
  const part3 = parametersSections.substring(stepsIndex).trim();

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
            <span className="text-md font-semibold">Filename:</span> {fileName}
          </p>
        </div>
      )}
      {metadata !== null && (
        <div className="w-1/2 ">
          <ModelToggle isComfyUI={isComfyUI} setIsComfyUI={setIsComfyUI} />
          <p className="font-bold text-lg">Metadata:</p>
          <pre className="max-w-full overflow-x-auto whitespace-pre-wrap">
            {metadata !== undefined
              ? JSON.stringify(metadata, null, 2)
              : "This image has no metadata."}
          </pre>
          {parametersSections !== "" && (
            <div className="flex flex-col gap-3">
              <div className="mt-2 flex justify-between">
                <p className="font-bold text-lg">Parameters:</p>
                <CopyToClipboard
                  parametersSections={parametersSections}
                  copied={copied}
                  setCopied={setCopied}
                />
              </div>
              {/* <p className="max-w-full overflow-x-auto">
                {parametersSections !== undefined
                  ? JSON.stringify(parametersSections, null, 2).replace(
                      /\n/g,
                      " "
                    )
                  : "This image has no parameters."}
              </p> */}
              <p className="max-w-full overflow-x-auto whitespace-pre-wrap">
                {part1}
              </p>
              <p className="max-w-full overflow-x-auto whitespace-pre-wrap">
                {part2}
              </p>
              <p className="max-w-full overflow-x-auto whitespace-pre-wrap">
                {part3}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
