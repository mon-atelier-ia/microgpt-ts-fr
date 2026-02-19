// Browser-only utilities: async training loop with Web Worker eval support
import {
  DEFAULT_CONFIG,
  type ModelConfig,
  type StateDict,
  type Tokenizer,
} from "./model";
import {
  type AdamConfig,
  type AdamState,
  type StepInfo,
  trainStep,
} from "./train";
import { emaSmooth } from "./utils";
import { Value } from "./value";

const CHUNK_SIZE = 10;

// Serialization helpers ------------------------------------------------------------
type Num<T> = T extends Value ? number : T extends (infer U)[] ? Num<U>[] : T;
export type NumericStateDict = { [K in keyof StateDict]: Num<StateDict[K]> };

function mapLeaves(x: unknown, fn: (leaf: unknown) => unknown): unknown {
  return Array.isArray(x) ? x.map((el) => mapLeaves(el, fn)) : fn(x);
}

export function snapshotWeights(sd: StateDict): NumericStateDict {
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(sd))
    out[k] = mapLeaves(sd[k as keyof StateDict], (v) => (v as Value).data);
  return out as NumericStateDict;
}

export function restoreStateDict(snap: NumericStateDict): StateDict {
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(snap))
    out[k] = mapLeaves(
      snap[k as keyof NumericStateDict],
      (n) => new Value(n as number),
    );
  return out as StateDict;
}

// Async training loop ------------------------------------------------------------

export type TrainHandle = {
  promise: Promise<void>;
  abort: () => void;
};

export type EvalInfo = {
  evalStep: number;
  evalLoss: number;
  smoothEvalLoss: number;
};

export type EvalConfig = {
  docs: string[];
  onEval: (info: EvalInfo) => void;
  createWorker: () => Worker;
};

export function trainAsync(
  stateDict: StateDict,
  adamState: AdamState,
  docs: string[],
  tokenizer: Tokenizer,
  numSteps: number,
  adamConfig: AdamConfig,
  modelConfig: ModelConfig = DEFAULT_CONFIG,
  onStep: (info: StepInfo) => void,
  evalConfig?: EvalConfig,
): TrainHandle {
  const evalInterval = Math.max(1, Math.round(numSteps * 0.05));
  let aborted = false;
  let smoothLoss: number | undefined;
  let smoothEvalLoss: number | undefined;

  const encodedEvalDocs = evalConfig?.docs.map((doc) => tokenizer.encode(doc));
  let worker: Worker | null = null;
  let evalId = 0;
  let latestEvalId = -1;
  let inflight = 0;
  let onDrain: (() => void) | null = null;
  const evalStepMap: Record<number, number> = {};

  if (encodedEvalDocs && encodedEvalDocs.length > 0 && evalConfig) {
    worker = evalConfig.createWorker();
    worker.onmessage = (e: MessageEvent<{ id: number; avgLoss: number }>) => {
      inflight--;
      if (e.data.id <= latestEvalId) {
        if (inflight === 0 && onDrain) onDrain();
        return;
      }
      latestEvalId = e.data.id;
      smoothEvalLoss = emaSmooth(smoothEvalLoss, e.data.avgLoss);
      evalConfig.onEval({
        evalStep: evalStepMap[e.data.id],
        evalLoss: e.data.avgLoss,
        smoothEvalLoss,
      });
      delete evalStepMap[e.data.id];
      if (inflight === 0 && onDrain) onDrain();
    };
  }

  const abort = () => {
    aborted = true;
    worker?.terminate();
    worker = null;
  };

  const promise = new Promise<void>((resolve) => {
    let step = 0;

    function runChunk() {
      const end = Math.min(step + CHUNK_SIZE, numSteps);
      while (step < end) {
        if (aborted) {
          resolve();
          return;
        }
        const doc = docs[step % docs.length];
        const tokens = tokenizer.encode(doc);
        const info = trainStep(
          stateDict,
          adamState,
          tokens,
          step,
          numSteps,
          adamConfig,
          modelConfig,
        );
        smoothLoss = emaSmooth(smoothLoss, info.loss);
        info.smoothLoss = smoothLoss;

        if (
          (step + 1) % evalInterval === 0 ||
          step === 0 ||
          step === numSteps - 1
        ) {
          if (worker && encodedEvalDocs) {
            inflight++;
            evalStepMap[++evalId] = step;
            worker.postMessage({
              id: evalId,
              weights: snapshotWeights(stateDict),
              encodedDocs: encodedEvalDocs,
              config: modelConfig,
            });
          }
        }

        onStep(info);
        step++;
      }
      if (step >= numSteps) {
        if (inflight > 0) {
          onDrain = () => {
            worker?.terminate();
            worker = null;
            resolve();
          };
        } else {
          worker?.terminate();
          worker = null;
          resolve();
        }
        return;
      }
      setTimeout(runChunk, 0);
    }

    setTimeout(runChunk, 0);
  });

  return { promise, abort };
}
