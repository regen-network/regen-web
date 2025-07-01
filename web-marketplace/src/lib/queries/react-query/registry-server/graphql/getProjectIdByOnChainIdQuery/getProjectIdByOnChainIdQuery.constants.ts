export const getProjectIdByOnChainIdKey = (onChainId: string): string[] => [
  'graphql',
  'projectIdByOnChainIdKey',
  onChainId,
];
