export const getProjectByOnChainIdKey = (
  onChainId: string,
  languageCode: string,
): string[] => ['graphql', 'projectByOnChainIdKey', onChainId, languageCode];
