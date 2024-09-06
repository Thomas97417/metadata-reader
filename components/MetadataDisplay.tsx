"use client";

import { MAX_METADATA_LINES } from "@/lib/constants";
import { useState } from "react";
import { Button } from "./ui/button";

type MetadataDisplayProps = {
  metadata: any;
};

export default function MetadataDisplay({ metadata }: MetadataDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const metadataString =
    metadata !== undefined
      ? JSON.stringify(metadata, null, 2).replace(/�/g, " ")
      : "This image has no metadata.";

  const lineCount = metadataString.split("\n").length;

  return (
    <>
      <p className="font-bold text-lg">Metadata:</p>
      <pre
        className={`max-w-full overflow-x-hidden whitespace-pre-wrap ${
          !isExpanded && lineCount > MAX_METADATA_LINES ? "max-h-60" : ""
        }`}
        style={{
          maxHeight:
            !isExpanded && lineCount > MAX_METADATA_LINES ? "15em" : "none",
        }}
      >
        {metadataString}
      </pre>
      {lineCount > MAX_METADATA_LINES && (
        <Button onClick={() => setIsExpanded(!isExpanded)} variant="link">
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      )}
    </>
  );
}
