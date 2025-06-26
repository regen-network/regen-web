export const getCreditClassCreatorKey = (address?: string): string[] => [
  // eslint-disable-next-line lingui/no-unlocalized-strings
  'CreditClassCreator',
  address ?? '',
];
