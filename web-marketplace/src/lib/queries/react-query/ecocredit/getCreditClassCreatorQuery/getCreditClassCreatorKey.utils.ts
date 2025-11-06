export const getCreditClassCreatorKey = (address?: string): string[] => [
  'creditClassCreator',
  address ?? '',
];
