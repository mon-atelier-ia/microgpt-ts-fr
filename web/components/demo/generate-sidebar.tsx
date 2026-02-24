import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { strings } from "@/lib/strings";
import { type GenerateMode, sliderVal } from "./types";

type GenerateSidebarProps = {
  mode: GenerateMode;
  temperature: number;
  numSamples: number;
  isGenerating: boolean;
  exploreDone: boolean;
  prefix: string;
  maxPrefixLength: number;
  allowedChars: string[];
  onModeChange: (mode: GenerateMode) => void;
  onTemperatureChange: (t: number) => void;
  onNumSamplesChange: (n: number) => void;
  onPrefixChange: (prefix: string) => void;
  onGenerate: () => void;
  onNextToken: () => void;
  onResetExplore: () => void;
};

function HintIcon({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-help">
        <CircleHelp className="size-3.5 text-muted-foreground/60" />
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}

export function GenerateSidebar({
  mode,
  temperature,
  numSamples,
  isGenerating,
  exploreDone,
  prefix,
  maxPrefixLength,
  allowedChars,
  onModeChange,
  onTemperatureChange,
  onNumSamplesChange,
  onPrefixChange,
  onGenerate,
  onNextToken,
  onResetExplore,
}: GenerateSidebarProps) {
  const isStepByStep = mode === "explore";

  const configFields = (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <Label htmlFor="prefix" className="text-xs">
            {strings.generate.prefix}
          </Label>
          <HintIcon text={strings.generate.prefixHint} />
        </div>
        <Input
          id="prefix"
          value={prefix}
          onChange={(e) => {
            const filtered = [...e.target.value]
              .filter((ch) => allowedChars.includes(ch))
              .slice(0, maxPrefixLength)
              .join("");
            onPrefixChange(filtered);
          }}
          className="h-8 font-mono text-sm"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Label className="text-xs">{strings.generate.temperature}</Label>
            <HintIcon text={strings.generate.temperatureHint} />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {temperature.toFixed(1)}
          </span>
        </div>
        <Slider
          min={0}
          max={10}
          step={1}
          value={[Math.round(temperature * 10)]}
          onValueChange={(vals) => onTemperatureChange(sliderVal(vals) / 10)}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label
            className={`text-xs ${isStepByStep ? "text-muted-foreground" : ""}`}
          >
            {strings.generate.samples}
          </Label>
          <span
            className={`font-mono text-xs ${isStepByStep ? "text-muted-foreground/50" : "text-muted-foreground"}`}
          >
            {numSamples}
          </span>
        </div>
        <Slider
          min={1}
          max={30}
          step={1}
          value={[numSamples]}
          onValueChange={(vals) => onNumSamplesChange(sliderVal(vals))}
          disabled={isStepByStep}
          className="w-full"
        />
      </div>
    </div>
  );

  return (
    <div className="flex w-full md:w-48 shrink-0 flex-col gap-5">
      <div className="flex items-center justify-between">
        <Label htmlFor="step-by-step" className="text-sm cursor-pointer">
          {strings.generate.stepByStep}
        </Label>
        <Switch
          id="step-by-step"
          checked={isStepByStep}
          onCheckedChange={(checked) =>
            onModeChange(checked ? "explore" : "batch")
          }
        />
      </div>

      {/* Desktop: always visible */}
      <div className="hidden md:contents">{configFields}</div>

      {/* Mobile: collapsible */}
      <details className="md:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground [&::-webkit-details-marker]:hidden">
          {strings.generate.settings}
          <svg
            viewBox="0 0 10 6"
            className="h-2.5 w-2.5 transition-transform [[open]>&]:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M1 1l4 4 4-4" />
          </svg>
        </summary>
        <div className="mt-3">{configFields}</div>
      </details>

      <div className="flex flex-col gap-2">
        {isStepByStep ? (
          <>
            <Button
              onClick={onNextToken}
              disabled={exploreDone}
              className="w-full"
            >
              {strings.generate.nextToken}
            </Button>
            <Button
              variant="outline"
              onClick={onResetExplore}
              className="w-full"
            >
              {strings.generate.reset}
            </Button>
          </>
        ) : (
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating
              ? strings.generate.generating
              : strings.generate.generateBtn}
          </Button>
        )}
      </div>
    </div>
  );
}
