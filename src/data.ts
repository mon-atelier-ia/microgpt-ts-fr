import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import shuffle from 'lodash/shuffle';

const DATASET_URL = 'https://raw.githubusercontent.com/karpathy/makemore/refs/heads/master/names.txt';
const INPUT_PATH = './tmp/input.txt';

export async function loadDocuments(): Promise<string[]> {
  if (!existsSync(INPUT_PATH)) {
    const response = await fetch(DATASET_URL);
    const text = await response.text();
    mkdirSync(dirname(INPUT_PATH), { recursive: true });
    writeFileSync(INPUT_PATH, text);
  }

  const text = readFileSync(INPUT_PATH, 'utf-8');
  const docs = text
    .trim()
    .split('\n')
    .map((l: string) => l.trim())
    .filter((l: string) => l.length > 0);

  const shuffled = shuffle(docs);

  console.log(`num docs: ${shuffled.length}`);
  return shuffled;
}
