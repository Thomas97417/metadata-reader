"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  AdjustmentsHorizontalIcon,
  BeakerIcon,
  ChatBubbleLeftIcon,
  CheckIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  Cog6ToothIcon,
  CubeIcon,
  FingerPrintIcon,
  PaintBrushIcon,
  PhotoIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  Square3Stack3DIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import CopyToClipboard from "../ui/copy-to-clipboard";
import MetadataDisplay from "./metadata-display";

type ParametersDetailsProps = {
  metadata: any;
  parametersSections: string;
  kindOfPrompt: string | null;
  embedded?: boolean;
};

type ParsedParam = { key: string; value: string };
type ParsedLora = { name: string; weight: number };
type ParsedComfyUI = {
  positive: string;
  negative: string;
  params: ParsedParam[];
  loras: ParsedLora[];
  modelParams: ParsedParam[];
};

const PARAM_ICON_MAP: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Steps: AdjustmentsHorizontalIcon,
  Sampler: BeakerIcon,
  "CFG scale": AdjustmentsHorizontalIcon,
  CFG: AdjustmentsHorizontalIcon,
  Seed: FingerPrintIcon,
  Size: PhotoIcon,
  Model: CubeIcon,
  Checkpoint: CubeIcon,
  "Clip skip": Cog6ToothIcon,
  Scheduler: ClockIcon,
  Denoise: PaintBrushIcon,
  LoRA: PuzzlePieceIcon,
  VAE: Square3Stack3DIcon,
};

function parseA1111Loras(prompt: string): {
  cleaned: string;
  loras: ParsedLora[];
} {
  const loras: ParsedLora[] = [];
  const loraRegex = /<lora:([^:>]+):([\d.]+)>/g;
  let match;
  while ((match = loraRegex.exec(prompt)) !== null) {
    loras.push({ name: match[1], weight: parseFloat(match[2]) });
  }
  const cleaned = prompt
    .replace(loraRegex, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return { cleaned, loras };
}

function parseA1111Settings(raw: string): ParsedParam[] {
  const pairs: ParsedParam[] = [];
  const regex =
    /([A-Za-z][A-Za-z0-9 ]*?):\s*(.*?)(?=,\s*[A-Za-z][A-Za-z0-9 ]*?:|$)/g;
  let match;
  while ((match = regex.exec(raw)) !== null) {
    pairs.push({ key: match[1].trim(), value: match[2].trim() });
  }
  return pairs;
}

function parseComfyUIData(promptJson: string): ParsedComfyUI {
  const sanitized = promptJson.replace(/\bNaN\b/g, "null");
  const nodes: Record<string, any> = JSON.parse(sanitized);
  const params: ParsedParam[] = [];
  const loras: ParsedLora[] = [];
  const modelParams: ParsedParam[] = [];
  let positive = "";
  let negative = "";

  const nodeEntries = Object.entries(nodes);

  // KSampler: extract sampler params and trace prompt connections
  for (const [, node] of nodeEntries) {
    if (
      node.class_type === "KSampler" ||
      node.class_type === "KSamplerAdvanced"
    ) {
      const inp = node.inputs;
      if (inp.seed !== undefined)
        params.push({ key: "Seed", value: String(inp.seed) });
      if (inp.steps !== undefined)
        params.push({ key: "Steps", value: String(inp.steps) });
      if (inp.cfg !== undefined)
        params.push({ key: "CFG", value: String(inp.cfg) });
      if (inp.sampler_name)
        params.push({ key: "Sampler", value: inp.sampler_name });
      if (inp.scheduler)
        params.push({ key: "Scheduler", value: inp.scheduler });
      if (inp.denoise !== undefined && inp.denoise !== 1)
        params.push({ key: "Denoise", value: String(inp.denoise) });

      // Trace positive/negative prompt references
      if (Array.isArray(inp.positive)) {
        const ref = nodes[inp.positive[0]];
        if (ref?.inputs?.text) positive = ref.inputs.text;
      }
      if (Array.isArray(inp.negative)) {
        const ref = nodes[inp.negative[0]];
        if (ref?.inputs?.text) negative = ref.inputs.text;
      }
    }
  }

  // Checkpoint
  for (const [, node] of nodeEntries) {
    if (
      node.class_type === "CheckpointLoaderSimple" ||
      node.class_type === "CheckpointLoader"
    ) {
      if (node.inputs.ckpt_name)
        modelParams.push({
          key: "Checkpoint",
          value: node.inputs.ckpt_name,
        });
    }
  }

  // VAE
  for (const [, node] of nodeEntries) {
    if (node.class_type === "VAELoader") {
      if (node.inputs.vae_name)
        modelParams.push({ key: "VAE", value: node.inputs.vae_name });
    }
  }

  // Size from EmptyLatentImage
  for (const [, node] of nodeEntries) {
    if (node.class_type === "EmptyLatentImage") {
      const w = node.inputs.width;
      const h = node.inputs.height;
      if (w && h) params.push({ key: "Size", value: `${w}x${h}` });
    }
  }

  // LoRAs
  for (const [, node] of nodeEntries) {
    if (node.class_type === "LoraLoader") {
      const name = node.inputs.lora_name;
      const weight = node.inputs.strength_model;
      if (name) loras.push({ name, weight: weight ?? 1 });
    }

    // CR LoRA Stack (numbered slots: lora_name_1, switch_1, model_weight_1, ...)
    if (node.class_type === "CR LoRA Stack") {
      for (let i = 1; ; i++) {
        const name = node.inputs[`lora_name_${i}`];
        if (name === undefined) break;
        const switchVal = node.inputs[`switch_${i}`];
        if (switchVal === "Off" || name === "None") continue;
        const weight = node.inputs[`model_weight_${i}`];
        loras.push({ name, weight: weight ?? 1 });
      }
    }
  }

  return { positive, negative, params, loras, modelParams };
}

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

const gridItemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function ParamCard({ param }: { param: ParsedParam }) {
  const [copied, setCopied] = useState(false);
  const Icon = PARAM_ICON_MAP[param.key] || Cog6ToothIcon;

  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(param.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Error when copying to clipboard", err);
    }
  };

  return (
    <motion.div
      variants={gridItemVariants}
      onClick={copyValue}
      className="group/card relative rounded-xl border bg-muted/30 p-3.5 hover:bg-muted/60 hover:border-primary/30 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover/card:text-primary transition-colors" />
          <span className="text-xs font-medium text-muted-foreground group-hover/card:text-foreground transition-colors truncate">
            {param.key}
          </span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <CheckIcon className="w-3 h-3 text-primary" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="opacity-0 group-hover/card:opacity-50 transition-opacity"
            >
              <ClipboardDocumentIcon className="w-3 h-3 text-muted-foreground" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <p
        className="text-sm font-mono font-semibold text-foreground truncate"
        title={param.value}
      >
        {param.value}
      </p>
    </motion.div>
  );
}

function ModelRow({ params }: { params: ParsedParam[] }) {
  if (params.length === 0) return null;
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      {params.map((param, i) => (
        <ParamCard key={`${param.key}-${i}`} param={param} />
      ))}
    </motion.div>
  );
}

function LoraCard({ lora }: { lora: ParsedLora }) {
  const [copied, setCopied] = useState(false);

  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(lora.name);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Error when copying to clipboard", err);
    }
  };

  return (
    <motion.div
      variants={gridItemVariants}
      onClick={copyValue}
      className="group/card relative flex items-center justify-between gap-3 rounded-xl border bg-muted/30 px-3.5 py-2.5 hover:bg-muted/60 hover:border-primary/30 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-2 min-w-0">
        <PuzzlePieceIcon className="w-3.5 h-3.5 shrink-0 text-muted-foreground group-hover/card:text-primary transition-colors" />
        <span
          className="text-sm font-mono text-foreground truncate"
          title={lora.name}
        >
          {lora.name}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-medium text-muted-foreground bg-muted/80 rounded-md px-2 py-0.5">
          Weight: {lora.weight}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <CheckIcon className="w-3 h-3 text-primary" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="opacity-0 group-hover/card:opacity-50 transition-opacity"
            >
              <ClipboardDocumentIcon className="w-3 h-3 text-muted-foreground" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function LoraSection({ loras }: { loras: ParsedLora[] }) {
  if (loras.length === 0) return null;
  return (
    <motion.div
      variants={itemVariants}
      className="space-y-2 border-t border-dashed pt-3"
    >
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <PuzzlePieceIcon className="w-3.5 h-3.5" />
        <h4 className="text-xs font-medium uppercase tracking-wide">
          LoRA{loras.length > 1 ? "s" : ""}{" "}
          <span className="font-normal">({loras.length})</span>
        </h4>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-2"
      >
        {loras.map((lora, i) => (
          <LoraCard key={`lora-${i}`} lora={lora} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function GenerationSettingsGrid({
  params,
  loras,
  modelParams,
}: {
  params: ParsedParam[];
  loras: ParsedLora[];
  modelParams: ParsedParam[];
}) {
  return (
    <div className="space-y-4">
      {modelParams.length > 0 && <ModelRow params={modelParams} />}
      {params.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {params.map((param, i) => (
            <ParamCard key={`${param.key}-${i}`} param={param} />
          ))}
        </motion.div>
      )}
      {loras.length > 0 && <LoraSection loras={loras} />}
    </div>
  );
}

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
    const comfyData = parseComfyUIData(metadata.prompt);
    part1 = comfyData.positive;
    part2 = comfyData.negative;
    // Store raw for copy, grid will use parsed params
    part3 = comfyData.params.map((p) => `${p.key}: ${p.value}`).join(", ");
  } else if (kindOfPrompt === "parameters" && metadata?.parameters) {
    part1 = parametersSections.substring(0, negativePromptIndex).trim();
    part2 = parametersSections
      .substring(negativePromptIndex + 16, stepsIndex)
      .trim();
    part3 = parametersSections.substring(stepsIndex).trim();
  }

  const { parsedSettings, loras, modelParams } = useMemo(() => {
    if (kindOfPrompt === "prompt" && metadata?.prompt) {
      const data = parseComfyUIData(metadata.prompt);
      return {
        parsedSettings: data.params,
        loras: data.loras,
        modelParams: data.modelParams,
      };
    }
    if (kindOfPrompt === "parameters" && part3) {
      const rawPositive = parametersSections
        .substring(0, negativePromptIndex)
        .trim();
      const { loras: a1111Loras } = parseA1111Loras(rawPositive);
      const allSettings = parseA1111Settings(part3);
      return {
        parsedSettings: allSettings.filter((p) => p.key in PARAM_ICON_MAP),
        loras: a1111Loras,
        modelParams: [] as ParsedParam[],
      };
    }
    return {
      parsedSettings: [] as ParsedParam[],
      loras: [] as ParsedLora[],
      modelParams: [] as ParsedParam[],
    };
  }, [
    kindOfPrompt,
    part3,
    metadata?.prompt,
    parametersSections,
    negativePromptIndex,
  ]);

  const sections = [
    {
      title: "Positive Prompt",
      icon: SparklesIcon,
      content: part1,
      copied: copiedPositive,
      setCopied: setCopiedPositive,
      copyText: "Copy Positive Prompt",
      useGrid: false,
    },
    {
      title: "Negative Prompt",
      icon: XCircleIcon,
      content: part2,
      copied: copiedNegative,
      setCopied: setCopiedNegative,
      copyText: "Copy Negative Prompt",
      useGrid: false,
    },
    {
      title: "Generation Settings",
      icon: Cog6ToothIcon,
      content: part3,
      copied: copiedDetails,
      setCopied: setCopiedDetails,
      copyText: "Copy Settings",
      useGrid: kindOfPrompt === "parameters" || kindOfPrompt === "prompt",
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
            className={
              embedded
                ? "space-y-4"
                : "rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow space-y-4"
            }
          >
            {!embedded && (
              <div className="flex justify-between items-center pb-2 border-b">
                <div className="flex items-center gap-2">
                  <ChatBubbleLeftIcon className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-lg">
                    Generation Parameters
                  </h2>
                </div>
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
              {sections.map((section) => (
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
                    {section.useGrid &&
                    (parsedSettings.length > 0 ||
                      loras.length > 0 ||
                      modelParams.length > 0) ? (
                      <GenerationSettingsGrid
                        params={parsedSettings}
                        loras={loras}
                        modelParams={modelParams}
                      />
                    ) : (
                      <pre className="text-sm font-mono bg-muted/50 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all group-hover:bg-muted/70 transition-colors">
                        {section.content || (
                          <span className="text-muted-foreground italic">
                            None
                          </span>
                        )}
                      </pre>
                    )}
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
