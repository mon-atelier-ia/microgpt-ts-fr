import { buildTokenizer, loadDocuments } from './src/data';
import { initStateDict, inference } from './src/model';
import { train } from './src/train';

console.log("microgpt-ts");

const TRAIN_STEPS = 1000;
const NUM_SAMPLES = 20;

const docs = await loadDocuments();
const tokenizer = buildTokenizer(docs);

console.log(`vocab size: ${tokenizer.vocabSize}`);
console.log(`chars: ${tokenizer.chars.join('')}`);

const stateDict = initStateDict(tokenizer.vocabSize);
train(stateDict, docs, tokenizer, TRAIN_STEPS);
inference(stateDict, tokenizer, NUM_SAMPLES);
