import type { LucideIcon } from "lucide-react";
import { Baby, Clapperboard, Martini, PenLine, Zap } from "lucide-react";
import { strings } from "@/lib/strings";

import { babyNames } from "../../../datasets/baby-names";
import { babyNamesSimple } from "../../../datasets/baby-names-simple";
import { cocktails } from "../../../datasets/cocktails";
import { movieTitles } from "../../../datasets/movie-titles";
import { pokemon } from "../../../datasets/pokemon";

export type Preset = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  words: string;
};

export const CUSTOM_PRESET_ID = "custom";

const lines = (arr: string[]) => arr.join("\n");

export const PRESETS: Preset[] = [
  {
    id: "baby-names-simple",
    title: strings.presets.babyNames.title,
    description: strings.presets.babyNames.description,
    icon: Baby,
    words: lines(babyNamesSimple),
  },
  {
    id: "baby-names",
    title: strings.presets.babyNames1k.title,
    description: strings.presets.babyNames1k.description,
    icon: Baby,
    words: lines(babyNames),
  },
  {
    id: "pokemon",
    title: strings.presets.pokemon.title,
    description: strings.presets.pokemon.description,
    icon: Zap,
    words: lines(pokemon),
  },
  {
    id: "cocktails",
    title: strings.presets.cocktails.title,
    description: strings.presets.cocktails.description,
    icon: Martini,
    words: lines(cocktails),
  },
  {
    id: "movie-titles",
    title: strings.presets.movieTitles.title,
    description: strings.presets.movieTitles.description,
    icon: Clapperboard,
    words: lines(movieTitles),
  },
  // {
  //   id: "fortunes",
  //   title: "Fortunes",
  //   description: "Short, shareable one-liners",
  //   icon: ScrollText,
  //   words: lines(fortunes),
  // },
];

export const CUSTOM_PRESET: Preset = {
  id: CUSTOM_PRESET_ID,
  title: strings.presets.custom.title,
  description: strings.presets.custom.description,
  icon: PenLine,
  words: "",
};
