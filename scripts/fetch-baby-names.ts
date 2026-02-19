import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { shuffle } from "../microgpt/utils";

const URL =
  "https://raw.githubusercontent.com/karpathy/makemore/988aa59/names.txt";
const OUTPUT_PATH = "./datasets/baby-names.ts";
const SAMPLE_SIZE = 500;

function toTsArrayFile(varName: string, items: string[]): string {
  const body = items.map((t) => `  ${JSON.stringify(t)},`).join("\n");
  return `export const ${varName}: string[] = [\n${body}\n];\n`;
}

const res = await fetch(URL);
if (!res.ok) {
  throw new Error(`Download failed: ${res.status} ${res.statusText}`);
}

const text = await res.text();
const allNames = text
  .split("\n")
  .map((n) => n.trim().toLowerCase())
  .filter((n) => n.length > 0);

console.log(`Fetched ${allNames.length} names total`);

const sampled = shuffle(allNames.slice()).slice(0, SAMPLE_SIZE);

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, toTsArrayFile("babyNames", sampled), "utf-8");

console.log(`Wrote ${sampled.length} names to ${OUTPUT_PATH}`);
