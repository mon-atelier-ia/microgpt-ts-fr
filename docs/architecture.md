# Architecture

> **LLM instruction**: Use this document as a reference for project structure, file roles, and data flow. When modifying code, verify your changes are consistent with the architecture described here. If you add files or change responsibilities, update this document.

## Overview

microgpt-ts is a complete GPT built from scratch in TypeScript with zero runtime dependencies. The project has two distinct layers:

1. **`microgpt/`** — Standalone ML library (~400 lines)
2. **`web/`** — Next.js playground that imports the library

The library runs anywhere (Node, browser, workers). The playground is a teaching tool that lets users train and interact with the model in-browser.

## `microgpt/` — ML Library

| File | Role |
|------|------|
| `value.ts` | Autograd engine — `Value` class with forward/backward ops |
| `model.ts` | GPT-2 architecture — embeddings, multi-head attention, MLP, residual connections, rmsnorm. Exports `buildTokenizer`, `initStateDict`, `forward`, `inference`, `inferenceStepwise` |
| `train.ts` | Adam optimizer with linear LR decay. Exports `trainStep`, `initAdamState` |
| `utils.ts` | Math helpers (`softmax`, `multinomial`, `emaSmooth`, `parseDocs`, `splitDocs`) |
| `browser.ts` | Web Worker serialization — `snapshotWeights`/`restoreStateDict` + message types (`TrainWorkerIn`, `TrainWorkerOut`) |

Key design: the tokenizer is **dynamic** — it extracts unique characters from the dataset at training time. Vocab is not hardcoded to a-z; any Unicode works.

## `web/` — Next.js Playground

### App Router pages

| Path | File | Description |
|------|------|-------------|
| `/` | `app/page.tsx` | Landing page with hero CTA |
| `/playground` | `app/playground/page.tsx` | Main demo (wraps `TrainDemo`) |
| `/about` | `app/about/page.tsx` | Project explanation |

### `web/components/demo/` — Playground UI

The playground is a 3-tab interface (Dataset → Train → Generate). Each tab has a **sidebar** (controls) and a **content area** (visualization).

| File | Role |
|------|------|
| `demo.tsx` | Main orchestrator — state, worker lifecycle, tab routing |
| `presets.ts` | Dataset presets with per-preset model/training configs |
| `types.ts` | Shared types (`Status`, `GenerateMode`) and utilities |
| **Dataset tab** | |
| `dataset-sidebar.tsx` | Preset selector + word count + train button |
| `dataset-tab.tsx` | Dataset text preview / custom text editor |
| **Train tab** | |
| `train-sidebar.tsx` | Model config selects + LR/steps sliders + action buttons |
| `train-tab.tsx` | Training stats, loss chart, live generation samples |
| `train-status.tsx` | 4-stat grid (step, time, train loss, eval loss) |
| `loss-chart.tsx` | Recharts loss curve (train + eval) |
| `live-gen-stream.tsx` | Rolling list of generated words during training |
| **Generate tab** | |
| `generate-sidebar.tsx` | Mode toggle, temperature, samples, prefix, action buttons |
| `generate-tab.tsx` | Batch output list or step-by-step explore view |
| `explore-view.tsx` | Token probability visualization for step-by-step inference |
| `token-prob-chart.tsx` | Bar chart of per-token probabilities |

### `web/workers/` — Bridge between UI and library

| File | Role |
|------|------|
| `train-worker.ts` | Training loop — receives `init` message, runs chunked training (10 steps/chunk via `setTimeout`), posts progress, handles generation requests post-training |
| `eval-worker.ts` | Evaluation — receives weight snapshots, computes eval loss on held-out data |

### `web/lib/`

| File | Role |
|------|------|
| `strings.ts` | All French UI strings (single source of truth for i18n) |
| `utils.ts` | Tailwind `cn()` merge helper |

## `datasets/` — Training data

TypeScript files exporting `string[]`. Lowercase a-z only, sorted alphabetically, min 3 chars per entry. See `AGENTS.md` for the full dataset table.

## `scripts/`

| File | Role |
|------|------|
| `demo.ts` | CLI proof that `microgpt/` works standalone (no web dependency) |
| `fetch-baby-names.ts` | Data fetcher for baby names dataset |
| `fetch-movie-titles.ts` | Data fetcher for movie titles dataset |

## Data flow

```
User clicks "Train"
  → demo.tsx creates Web Worker (train-worker.ts)
  → sends { type: "init", datasetText, modelConfig, ... }
  → train-worker.ts: buildTokenizer → initStateDict → runTraining()
    → chunked loop: trainStep() → post("steps") / post("live-gen") / post("eval-snapshot")
    → eval-worker.ts receives snapshots, returns avgLoss
  → post("done")
  → demo.tsx sets status = "trained"

User clicks "Generate"
  → demo.tsx sends { type: "generate" | "explore-start" }
  → train-worker.ts: inference() → post("gen-word") or inferenceStepwise() → post("explore-step")
```
