"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type CopyToClipboardProps = {
  parametersSections: string;
  copied: boolean;
  setCopied: (copied: boolean) => void;
  text: string;
};

const iconVariants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.5, opacity: 0 },
};

const CopyToClipboard = ({
  parametersSections,
  copied,
  setCopied,
  text,
}: CopyToClipboardProps) => {
  const copyToClipboard = async () => {
    if (parametersSections !== "") {
      try {
        await navigator.clipboard.writeText(parametersSections);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Error when copying to clipboard", err);
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer"
            disabled={copied}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                >
                  <CheckIcon className="w-4 h-4 text-primary" />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                >
                  <ClipboardDocumentIcon className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyToClipboard;
