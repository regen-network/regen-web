export const getProjectByOnChainIdKey = (onChainId: string): string[] => [
  'graphql',
  'projectByOnChainIdKey',
  onChainId,
];
