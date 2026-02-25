import type { LucideIcon } from "lucide-react";
import { Baby, Bone, PenLine, Zap } from "lucide-react";
import { strings } from "@/lib/strings";
import { dinosaures } from "../../../datasets/dinosaures";
import { pokemonFr } from "../../../datasets/pokemon-fr";
import { prenoms } from "../../../datasets/prenoms";
import { prenomsSimple } from "../../../datasets/prenoms-simple";
import type { ModelConfig } from "../../../microgpt/model";

export type PresetTrainingConfig = {
  learningRate?: number;
  numSteps?: number;
};

export type Preset = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  words: string;
  modelConfig?: Partial<ModelConfig>;
  trainingConfig?: PresetTrainingConfig;
};

export const CUSTOM_PRESET_ID = "custom";

const lines = (arr: string[]) => arr.join("\n");

export const PRESETS: Preset[] = [
  {
    id: "prenoms-simple",
    title: strings.presets.prenoms.title,
    description: strings.presets.prenoms.description,
    icon: Baby,
    words: lines(prenomsSimple),
    trainingConfig: { learningRate: 0.001 },
  },
  {
    id: "prenoms",
    title: strings.presets.prenoms1k.title,
    description: strings.presets.prenoms1k.description,
    icon: Baby,
    words: lines(prenoms),
  },
  {
    id: "pokemon-fr",
    title: strings.presets.pokemonFr.title,
    description: strings.presets.pokemonFr.description,
    icon: Zap,
    words: lines(pokemonFr),
  },
  {
    id: "dinosaures",
    title: strings.presets.dinosaures.title,
    description: strings.presets.dinosaures.description,
    icon: Bone,
    words: lines(dinosaures),
  },
];

export const CUSTOM_PRESET: Preset = {
  id: CUSTOM_PRESET_ID,
  title: strings.presets.custom.title,
  description: strings.presets.custom.description,
  icon: PenLine,
  words: "",
};
