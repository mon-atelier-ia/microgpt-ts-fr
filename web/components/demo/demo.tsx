"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { type TrainHandle, trainAsync } from "../../../microgpt/browser";
import {
  buildTokenizer,
  DEFAULT_CONFIG,
  getParams,
  inference,
  initStateDict,
  type ModelConfig,
  type StateDict,
  type Tokenizer,
} from "../../../microgpt/model";
import {
  type AdamConfig,
  type AdamState,
  initAdamState,
} from "../../../microgpt/train";
import { parseDocs } from "../../../microgpt/utils";
import { DatasetSidebar } from "./dataset-sidebar";
import { GenerateSidebar } from "./generate-sidebar";
import { type LiveGenEntry, LiveGenStream } from "./live-gen-stream";
import { LossChart, type LossPoint } from "./loss-chart";
import { CUSTOM_PRESET_ID, PRESETS } from "./presets";
import { type TrainingConfig, TrainSidebar } from "./train-sidebar";

// --- Constants ---

const LIVE_GEN_INTERVAL = 100;
const LIVE_GEN_SAMPLES = 3;
const MAX_LIVE_GEN = 15;
const DEFAULT_NUM_SAMPLES = 10;

// --- Types ---

type Status = "idle" | "training" | "trained";
type TabId = "dataset" | "train" | "generate";

// --- Main Demo ---

export function TrainDemo() {
  const [tab, setTab] = useState<TabId>("dataset");
  const [selectedPresetId, setSelectedPresetId] = useState("baby-names");
  const [customText, setCustomText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);
  const [loss, setLoss] = useState(0);
  const [lossHistory, setLossHistory] = useState<LossPoint[]>([]);
  const [liveGenEntries, setLiveGenEntries] = useState<LiveGenEntry[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState(0);

  const [modelConfig, setModelConfig] = useState<ModelConfig>(DEFAULT_CONFIG);
  const [trainingConfig, setTrainingConfig] = useState<TrainingConfig>({
    learningRate: 0.01,
    numSteps: 1000,
  });
  const [temperature, setTemperature] = useState(0.5);
  const [numSamples, setNumSamples] = useState(DEFAULT_NUM_SAMPLES);
  const temperatureRef = useRef(temperature);
  useEffect(() => {
    temperatureRef.current = temperature;
  }, [temperature]);

  const namesText =
    selectedPresetId === CUSTOM_PRESET_ID
      ? customText
      : (PRESETS.find((p) => p.id === selectedPresetId)?.words ?? "");

  const wordCount = namesText
    .split("\n")
    .filter((l) => l.trim().length > 0).length;

  const handleRef = useRef<TrainHandle | null>(null);
  const modelRef = useRef<{
    stateDict: StateDict;
    adamState: AdamState;
    tokenizer: Tokenizer;
    modelConfig: ModelConfig;
  } | null>(null);

  useEffect(() => {
    if (status !== "training") return;
    const id = setInterval(() => {
      setElapsed((prev) => prev + 100);
    }, 100);
    return () => clearInterval(id);
  }, [status]);

  const lossBufferRef = useRef<LossPoint[]>([]);

  const handleTrain = useCallback(async () => {
    setTab("train");
    setStatus("training");
    setStep(0);
    setLoss(0);
    setLossHistory([]);
    setLiveGenEntries([]);
    setOutput([]);
    setElapsed(0);
    lossBufferRef.current = [];

    const docs = parseDocs(namesText);
    const tokenizer = buildTokenizer(docs);
    const stateDict = initStateDict(tokenizer.vocabSize, modelConfig);
    const adamState = initAdamState(getParams(stateDict).length);

    const adamConfig: AdamConfig = {
      learningRate: trainingConfig.learningRate,
      beta1: 0.85,
      beta2: 0.99,
      eps: 1e-8,
    };

    modelRef.current = { stateDict, adamState, tokenizer, modelConfig };

    const handle = trainAsync(
      stateDict,
      adamState,
      docs,
      tokenizer,
      trainingConfig.numSteps,
      adamConfig,
      modelConfig,
      (info) => {
        const s = info.step + 1;
        setStep(s);
        setLoss(info.smoothLoss);
        lossBufferRef.current.push({ step: s, loss: info.smoothLoss });
        if (s % 10 === 0 || s === info.numSteps) {
          setLossHistory([...lossBufferRef.current]);
        }
        if (s % LIVE_GEN_INTERVAL === 0) {
          const words = Array.from({ length: LIVE_GEN_SAMPLES }, () =>
            inference(
              stateDict,
              tokenizer,
              temperatureRef.current,
              modelConfig,
            ),
          );
          setLiveGenEntries((prev) => {
            const next = [...prev, { step: s, words }];
            return next.length > MAX_LIVE_GEN
              ? next.slice(next.length - MAX_LIVE_GEN)
              : next;
          });
        }
      },
    );
    handleRef.current = handle;

    await handle.promise;
    handleRef.current = null;
    setLossHistory([...lossBufferRef.current]);
    setStatus((prev) => (prev === "training" ? "trained" : prev));
  }, [namesText, modelConfig, trainingConfig]);

  const handleStop = useCallback(() => {
    handleRef.current?.abort();
    handleRef.current = null;
    setStatus("trained");
  }, []);

  const handleGenerate = useCallback(() => {
    if (!modelRef.current) return;
    const { stateDict, tokenizer, modelConfig: mc } = modelRef.current;
    const names: string[] = [];
    for (let i = 0; i < numSamples; i++) {
      names.push(inference(stateDict, tokenizer, temperature, mc));
    }
    setOutput(names);
  }, [temperature, numSamples]);

  const isTraining = status === "training";
  const isTrained = status === "trained";

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => setTab(v as TabId)}
      className="flex w-full max-w-5xl flex-col"
    >
      <TabsList className="mb-6 w-fit self-start">
        <TabsTrigger value="dataset">Dataset</TabsTrigger>
        <TabsTrigger value="train">Train</TabsTrigger>
        <TabsTrigger value="generate" disabled={!isTrained && !isTraining}>
          Generate
        </TabsTrigger>
      </TabsList>

      <div className="flex gap-8">
        {/* Adaptive sidebar */}
        {tab === "dataset" && (
          <DatasetSidebar
            selectedId={selectedPresetId}
            disabled={isTraining}
            onSelect={setSelectedPresetId}
          />
        )}
        {tab === "train" && (
          <TrainSidebar
            modelConfig={modelConfig}
            trainingConfig={trainingConfig}
            disabled={isTraining}
            onModelChange={setModelConfig}
            onTrainingChange={setTrainingConfig}
          />
        )}
        {tab === "generate" && (
          <GenerateSidebar
            temperature={temperature}
            numSamples={numSamples}
            onTemperatureChange={setTemperature}
            onNumSamplesChange={setNumSamples}
          />
        )}

        <Separator orientation="vertical" className="h-auto" />

        {/* Main content area */}
        <div className="min-w-0 flex-1">
          <TabsContent value="dataset" className="mt-0">
            <DatasetTab
              namesText={namesText}
              customText={customText}
              selectedPresetId={selectedPresetId}
              wordCount={wordCount}
              disabled={isTraining}
              onCustomTextChange={setCustomText}
              onTrain={handleTrain}
            />
          </TabsContent>

          <TabsContent value="train" className="mt-0">
            <TrainTab
              status={status}
              step={step}
              loss={loss}
              elapsed={elapsed}
              trainingConfig={trainingConfig}
              lossHistory={lossHistory}
              liveGenEntries={liveGenEntries}
              onTrain={handleTrain}
              onStop={handleStop}
              onSwitchToGenerate={() => setTab("generate")}
            />
          </TabsContent>

          <TabsContent value="generate" className="mt-0">
            <GenerateTab
              status={status}
              output={output}
              onGenerate={handleGenerate}
              onSwitchToTrain={() => setTab("train")}
            />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}

// --- Dataset Tab Content ---

function DatasetTab({
  namesText,
  customText,
  selectedPresetId,
  wordCount,
  disabled,
  onCustomTextChange,
  onTrain,
}: {
  namesText: string;
  customText: string;
  selectedPresetId: string;
  wordCount: number;
  disabled: boolean;
  onCustomTextChange: (text: string) => void;
  onTrain: () => void;
}) {
  const isCustom = selectedPresetId === CUSTOM_PRESET_ID;
  return (
    <div className="flex flex-col gap-4">
      <Textarea
        value={isCustom ? customText : namesText}
        onChange={
          isCustom ? (e) => onCustomTextChange(e.target.value) : undefined
        }
        readOnly={!isCustom}
        rows={20}
        className="font-mono text-sm resize-none"
        placeholder={isCustom ? "Enter words, one per line..." : ""}
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </p>
        <Button onClick={onTrain} disabled={disabled || wordCount === 0}>
          Train on this dataset
        </Button>
      </div>
    </div>
  );
}

// --- Train Tab Content ---

function TrainTab({
  status,
  step,
  loss,
  elapsed,
  trainingConfig,
  lossHistory,
  liveGenEntries,
  onTrain,
  onStop,
  onSwitchToGenerate,
}: {
  status: Status;
  step: number;
  loss: number;
  elapsed: number;
  trainingConfig: TrainingConfig;
  lossHistory: LossPoint[];
  liveGenEntries: LiveGenEntry[];
  onTrain: () => void;
  onStop: () => void;
  onSwitchToGenerate: () => void;
}) {
  const isTraining = status === "training";
  const isTrained = status === "trained";

  if (status === "idle") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <p className="text-muted-foreground">
          Configure hyperparameters, then start training.
        </p>
        <Button onClick={onTrain}>Train</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Button onClick={onTrain} disabled={isTraining}>
          {isTrained ? "Re-train" : "Train"}
        </Button>
        {isTraining && (
          <Button variant="outline" onClick={onStop}>
            Stop
          </Button>
        )}
        <p className="font-mono text-sm text-muted-foreground">
          step {step} / {trainingConfig.numSteps} | loss: {loss.toFixed(4)} |{" "}
          {(elapsed / 1000).toFixed(1)}s
        </p>
      </div>

      {lossHistory.length > 1 && (
        <LossChart
          data={lossHistory}
          numSteps={trainingConfig.numSteps}
          currentLoss={loss}
        />
      )}

      <LiveGenStream entries={liveGenEntries} />

      {isTrained && (
        <button
          type="button"
          onClick={onSwitchToGenerate}
          className="self-start text-sm text-primary hover:underline"
        >
          Model ready — switch to Generate &rarr;
        </button>
      )}
    </div>
  );
}

// --- Generate Tab Content ---

function GenerateTab({
  status,
  output,
  onGenerate,
  onSwitchToTrain,
}: {
  status: Status;
  output: string[];
  onGenerate: () => void;
  onSwitchToTrain: () => void;
}) {
  if (status !== "trained") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <p className="text-muted-foreground">
          Train the model first to generate new words.
        </p>
        <Button variant="outline" onClick={onSwitchToTrain}>
          Go to Train
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Button onClick={onGenerate} className="w-fit">
        Generate
      </Button>

      {output.length > 0 && (
        <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 rounded-lg border bg-muted/30 p-6 sm:grid-cols-3">
          {output.map((name, i) => (
            <span
              key={`${i}-${name}`}
              className={cn(
                "font-mono text-base",
                i === 0 && "text-foreground",
              )}
            >
              {name}
            </span>
          ))}
        </div>
      )}

      {output.length === 0 && (
        <div className="flex items-center justify-center rounded-lg border border-dashed py-16">
          <p className="text-sm text-muted-foreground">
            Click Generate to create new words
          </p>
        </div>
      )}
    </div>
  );
}
