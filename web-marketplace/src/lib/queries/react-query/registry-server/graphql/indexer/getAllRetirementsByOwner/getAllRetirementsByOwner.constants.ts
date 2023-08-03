export const getAllRetirementsByOwnerQueryKey = (owner: string): string[] => [
  'graphql',
  'getAllRetirementsByOwnerQuery',
  owner,
];
