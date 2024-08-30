import { Clipboard, ClipboardCheck } from "lucide-react";
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
};
const CopyToClipboard = ({
  parametersSections,
  copied,
  setCopied,
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
        <TooltipTrigger>
          {copied ? (
            <ClipboardCheck size={22} className="text-green-500" />
          ) : (
            <Clipboard
              size={22}
              onClick={copyToClipboard}
              className="hover:cursor-pointer hover:text-green-500"
            />
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
