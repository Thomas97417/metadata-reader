import { Clipboard, ClipboardCheck } from "lucide-react";
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
const CopyToClipboard = ({
  parametersSections,
  copied,
  setCopied,
  text,
}: CopyToClipboardProps) => {
  const copyToClipboard = () => {
    if (parametersSections !== "") {
      navigator.clipboard
        .writeText(parametersSections)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Error when copying to clipboard", err);
        });

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {copied ? (
            <Button className="flex justify-between gap-4" variant="ghost">
              <p>{text}</p>
              <ClipboardCheck size={20} className="text-green-500" />
            </Button>
          ) : (
            <Button
              className="flex justify-between gap-4"
              onClick={copyToClipboard}
              variant="ghost"
            >
              <p>{text}</p>
              <Clipboard
                size={20}
                className="hover:cursor-pointer hover:text-green-500"
              />
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyToClipboard;
