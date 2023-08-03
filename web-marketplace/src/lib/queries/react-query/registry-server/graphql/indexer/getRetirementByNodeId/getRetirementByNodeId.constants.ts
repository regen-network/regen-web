export const getRetirementByNodeIdKey = (nodeId: string): string[] => [
  'graphql',
  'getRetirementByNodeIdQuery',
  nodeId,
];
