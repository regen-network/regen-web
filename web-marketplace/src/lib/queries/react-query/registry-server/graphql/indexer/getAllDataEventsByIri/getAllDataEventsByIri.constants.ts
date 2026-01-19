export const getAllDataEventsByIriQueryKey = (
  iri: string,
  eventTypeIncludes: string,
): string[] => [
  'graphql',
  'getAllDataEventsByIriQuery',
  iri,
  eventTypeIncludes,
];
