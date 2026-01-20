export const getAllDataEventsByIriQueryKey = (iri: string): string[] => [
  'graphql',
  'getAllDataEventsByIriQuery',
  iri,
];
