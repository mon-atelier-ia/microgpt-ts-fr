// Bigram language model: state_dict[i][j] = how many times token j follows token i

export type StateDict = number[][];

// Initialize a vocabSize x vocabSize state dictionary with empty counts
export function initStateDict(vocabSize: number): StateDict {
  return Array.from({ length: vocabSize }, () => new Array(vocabSize).fill(0));
}

// Given a token_id, return the probability distribution over the next token
// Uses add-one (Laplace) smoothing
export function bigram(stateDict: StateDict, tokenId: number): number[] {
  const row = stateDict[tokenId];
  // Add-one smoothing: add 1 to each count and divide by total + vocabSize
  const total = row.reduce((a, b) => a + b, 0) + row.length;
  return row.map((c) => (c + 1) / total);
}
