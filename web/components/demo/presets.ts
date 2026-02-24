import type { LucideIcon } from "lucide-react";
import { Baby, Bone, Clapperboard, Martini, PenLine, Zap } from "lucide-react";
import { strings } from "@/lib/strings";

import { babyNames } from "../../../datasets/baby-names";
import { babyNamesSimple } from "../../../datasets/baby-names-simple";
import { cocktails } from "../../../datasets/cocktails";
import { dinosaures } from "../../../datasets/dinosaures";
import { movieTitles } from "../../../datasets/movie-titles";
import { pokemon } from "../../../datasets/pokemon";
import { pokemonFr } from "../../../datasets/pokemon-fr";
import { prenoms } from "../../../datasets/prenoms";
import { prenomsSimple } from "../../../datasets/prenoms-simple";

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
  {
    id: "prenoms-simple",
    title: strings.presets.prenoms.title,
    description: strings.presets.prenoms.description,
    icon: Baby,
    words: lines(prenomsSimple),
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
