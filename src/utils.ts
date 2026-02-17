// sum of an array
export const sum = (arr: number[]): number => arr.reduce((a, b) => a + b, 0);

// mean of an array
export const mean = (arr: number[]): number => sum(arr) / arr.length;

// Sample from a probability distribution using cumulative weights
// Assumes weights are normalized to sum to 1
export function sample(weights: number[]): number {
  const r = Math.random();
  let cum = 0;
  for (let i = 0; i < weights.length; i++) {
    cum += weights[i];
    if (r < cum) return i;
  }
  return weights.length - 1;
}

// Fisher-Yates shuffle (in-place)
export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}