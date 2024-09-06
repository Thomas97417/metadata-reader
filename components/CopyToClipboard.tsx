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
          console.log("Texte copié dans le presse-papiers");
        })
        .catch((err) => {
          console.error("Erreur lors de la copie dans le presse-papiers", err);
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
          <p>Copier dans le presse-papiers</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyToClipboard;
