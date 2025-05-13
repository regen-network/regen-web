export const getCreditClassCreatorKey = (address?: string): string[] => [
  'CreditClassCreator',
  address ?? '',
];
