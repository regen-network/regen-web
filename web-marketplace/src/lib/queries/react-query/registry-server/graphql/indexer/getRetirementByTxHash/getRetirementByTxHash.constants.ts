export const getRetirementByTxHashKey = (txHash: string): string[] => [
  'graphql',
  'getRetirementByTxHashQuery',
  txHash,
];
