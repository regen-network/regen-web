export const getCreditClassByOnChainIdKey = (onChainId: string): string[] => [
  'graphql',
  'creditClassByOnChainIdKey',
  onChainId,
];
