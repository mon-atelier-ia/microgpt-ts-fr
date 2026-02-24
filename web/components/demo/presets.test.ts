import { describe, expect, it } from "vitest";
import { CUSTOM_PRESET, CUSTOM_PRESET_ID, PRESETS } from "./presets";

describe("PRESETS", () => {
  it("contains exactly 4 French presets", () => {
    expect(PRESETS).toHaveLength(4);
  });

  it("has unique ids", () => {
    const ids = PRESETS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each preset has all required fields", () => {
    for (const preset of PRESETS) {
      expect(preset.id).toBeTruthy();
      expect(preset.title).toBeTruthy();
      expect(preset.description).toBeTruthy();
      expect(preset.icon).toBeTruthy();
      expect(preset.words.length).toBeGreaterThan(0);
    }
  });

  it.each([
    ["prenoms-simple", 50],
    ["prenoms", 1000],
    ["pokemon-fr", 1022],
    ["dinosaures", 1522],
  ] as const)("preset %s has %d words", (id, count) => {
    const preset = PRESETS.find((p) => p.id === id);
    expect(preset).toBeDefined();
    expect(preset?.words.split("\n")).toHaveLength(count);
  });

  it("words contain only lowercase a-z", () => {
    for (const preset of PRESETS) {
      for (const word of preset.words.split("\n")) {
        expect(word).toMatch(/^[a-z]+$/);
      }
    }
  });

  it("ids match dataset file names (kebab-case)", () => {
    for (const preset of PRESETS) {
      expect(preset.id).toMatch(/^[a-z]+(-[a-z]+)*$/);
    }
  });

  it("first preset is a valid default for consumers", () => {
    expect(PRESETS[0]).toBeDefined();
    expect(PRESETS[0].words.length).toBeGreaterThan(0);
  });
});

describe("CUSTOM_PRESET", () => {
  it("has id matching CUSTOM_PRESET_ID", () => {
    expect(CUSTOM_PRESET.id).toBe(CUSTOM_PRESET_ID);
    expect(CUSTOM_PRESET_ID).toBe("custom");
  });

  it("has empty words", () => {
    expect(CUSTOM_PRESET.words).toBe("");
  });

  it("has French labels", () => {
    expect(CUSTOM_PRESET.title).toBe("Personnalis\u00e9");
    expect(CUSTOM_PRESET.description).toBe("Collez votre propre liste de mots");
  });
});
