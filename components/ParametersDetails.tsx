"use client";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Settings2, Sparkles, XCircle } from "lucide-react";
import { useState } from "react";
import CopyToClipboard from "./CopyToClipboard";
import MetadataDisplay from "./MetadataDisplay";

type ParametersDetailsProps = {
  metadata: any;
  parametersSections: string;
  kindOfPrompt: string | null;
  embedded?: boolean;
};

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: "easeOut" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function ParametersDetails({
  metadata,
  parametersSections,
  kindOfPrompt,
  embedded = false,
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

  const sections = [
    {
      title: "Positive Prompt",
      icon: Sparkles,
      content: part1,
      copied: copiedPositive,
      setCopied: setCopiedPositive,
      copyText: "Copy Positive Prompt",
    },
    {
      title: "Negative Prompt",
      icon: XCircle,
      content: part2,
      copied: copiedNegative,
      setCopied: setCopiedNegative,
      copyText: "Copy Negative Prompt",
    },
    {
      title: "Generation Settings",
      icon: Settings2,
      content: part3,
      copied: copiedDetails,
      setCopied: setCopiedDetails,
      copyText: "Copy Settings",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {parametersSections !== "" && (
          <motion.div
            {...fadeInUp}
            className={embedded ? "space-y-4" : "rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow space-y-4"}
          >
            {!embedded && (
              <div className="flex justify-between items-center pb-2 border-b">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-lg">Generation Parameters</h2>
                </div>
                <CopyToClipboard
                  parametersSections={parametersSections}
                  copied={copiedAll}
                  setCopied={setCopiedAll}
                  text="Copy All"
                />
              </div>
            )}

            {embedded && (
              <div className="flex justify-end">
                <CopyToClipboard
                  parametersSections={parametersSections}
                  copied={copiedAll}
                  setCopied={setCopiedAll}
                  text="Copy All"
                />
              </div>
            )}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-6"
            >
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  variants={itemVariants}
                  className="space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <section.icon className="w-4 h-4" />
                      <h3 className="font-medium">{section.title}</h3>
                    </div>
                    <CopyToClipboard
                      parametersSections={section.content}
                      copied={section.copied}
                      setCopied={section.setCopied}
                      text={section.copyText}
                    />
                  </div>
                  <div className="relative">
                    <pre className="text-sm font-mono bg-muted/50 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all group-hover:bg-muted/70 transition-colors">
                      {section.content || (
                        <span className="text-muted-foreground italic">
                          None
                        </span>
                      )}
                    </pre>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
