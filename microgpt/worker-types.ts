import type { InferenceStep, ModelConfig } from "./model";
import type { NumericStateDict } from "./browser";

// Main --> Training Worker
export type TrainWorkerIn =
  | {
      type: "init";
      datasetText: string;
      modelConfig: ModelConfig;
      numSteps: number;
      learningRate: number;
      temperature: number;
    }
  | { type: "abort" }
  | {
      type: "generate";
      temperature: number;
      prefixTokens: number[];
      numSamples: number;
    }
  | {
      type: "explore-start";
      temperature: number;
      prefixTokens: number[];
    }
  | { type: "explore-next" }
  | { type: "explore-reset" };

// Training Worker --> Main
export type TrainWorkerOut =
  | {
      type: "ready";
      tokenizer: { chars: string[]; BOS: number; vocabSize: number; blockSize: number };
    }
  | { type: "steps"; batch: { step: number; smoothLoss: number }[] }
  | { type: "live-gen"; step: number; words: string[] }
  | {
      type: "eval-snapshot";
      id: number;
      weights: NumericStateDict;
      encodedEvalDocs: number[][];
      modelConfig: ModelConfig;
      step: number;
    }
  | { type: "done"; weights: NumericStateDict }
  | { type: "gen-word"; word: string }
  | { type: "gen-done" }
  | { type: "explore-step"; step: InferenceStep };
