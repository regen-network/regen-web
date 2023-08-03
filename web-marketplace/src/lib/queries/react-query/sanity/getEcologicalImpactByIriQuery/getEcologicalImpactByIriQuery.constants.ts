export const getEcologicalImpactByIriKey = (
  iris: string | string[] | undefined | null,
): string[] => [
  'ecologicalImpactByIri',
  Array.isArray(iris) ? iris.join(',') : iris ?? '',
];
