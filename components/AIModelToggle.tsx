import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type ModelToggleProps = {
  isComfyUI: boolean;
  setIsComfyUI: (isComfyUI: boolean) => void;
};

export default function ModelToggle({
  isComfyUI,
  setIsComfyUI,
}: ModelToggleProps) {
  return (
    <div className="flex flex-col items-center pb-1">
      <div className="flex items-center space-x-2">
        <Label
          htmlFor="model-toggle"
          className={`w-16 text-right ${
            !isComfyUI ? "text-primary font-medium" : "text-muted-foreground"
          }`}
        >
          A1111
        </Label>
        <Switch
          id="model-toggle"
          checked={isComfyUI}
          onCheckedChange={setIsComfyUI}
        />
        <Label
          htmlFor="model-toggle"
          className={`w-16 ${
            isComfyUI ? "text-primary font-medium" : "text-muted-foreground"
          }`}
        >
          ComfyUI
        </Label>
      </div>
    </div>
  );
}
