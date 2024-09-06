"use client";
import { useState } from "react";
import CopyToClipboard from "./CopyToClipboard";
import MetadataDisplay from "./MetadataDisplay";

type ParametersDetailsProps = {
  metadata: any;
  parametersSections: string;
  kindOfPrompt: string | null;
};

export default function ParametersDetails({
  metadata,
  parametersSections,
  kindOfPrompt,
}: ParametersDetailsProps) {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedPositive, setCopiedPositive] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);
  const [copiedDetails, setCopiedDetails] = useState(false);
  // Split parametersSections into three parts
  const negativePromptIndex = parametersSections.indexOf("Negative prompt");
  const stepsIndex = parametersSections.indexOf("Steps");

  let part1 = "";
  let part2 = "";
  let part3 = "";

  if (kindOfPrompt === "prompt" && metadata?.prompt) {
    const promptData = JSON.parse(metadata.prompt);
    part1 = promptData["6"]?.inputs?.text || "";
    part2 = promptData["7"]?.inputs?.text || "";
    part3 = Object.entries(promptData["3"]?.inputs || {})
      .map(([key, value]) => `"${key}": ${JSON.stringify(value)}`)
      .join(", ");
  } else if (kindOfPrompt === "parameters" && metadata?.parameters) {
    part1 = parametersSections.substring(0, negativePromptIndex).trim();
    part2 = parametersSections
      .substring(negativePromptIndex + 16, stepsIndex)
      .trim();
    part3 = parametersSections.substring(stepsIndex).trim();
  }

  return (
    <>
      <MetadataDisplay metadata={metadata} />
      {parametersSections !== "" && (
        <div className="flex flex-col gap-3">
          <div className="mt-2 flex justify-between items-center">
            <p className="font-bold text-lg">Parameters :</p>
            <CopyToClipboard
              parametersSections={parametersSections}
              copied={copiedAll}
              setCopied={setCopiedAll}
              text="All Parameters"
            />
          </div>
          <div>
            <CopyToClipboard
              parametersSections={part1}
              copied={copiedPositive}
              setCopied={setCopiedPositive}
              text="Positive prompt"
            />
            <p className="max-w-full overflow-x-auto whitespace-pre-wrap">
              {part1}
            </p>
          </div>
          <div>
            <CopyToClipboard
              parametersSections={part2}
              copied={copiedNegative}
              setCopied={setCopiedNegative}
              text="Negative prompt"
            />
            <p className="max-w-full overflow-x-auto whitespace-pre-wrap">
              {part2}
            </p>
          </div>
          <div>
            <CopyToClipboard
              parametersSections={part3}
              copied={copiedDetails}
              setCopied={setCopiedDetails}
              text="Parameters Details"
            />
            <p className="max-w-full overflow-x-auto whitespace-pre-wrap">
              {part3}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
