"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
          <Button
            onClick={copyToClipboard}
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground transition-colors hover:cursor-pointer"
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
                  transition={{ duration: 0.2 }}
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
                  transition={{ duration: 0.2 }}
                >
                  <CopyIcon className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
            <span>{copied && "Copied!"}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p>{`${text} to clipboard`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyToClipboard;
