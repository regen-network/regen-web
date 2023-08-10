export const getGeojsonKey = (mapfile: string | undefined): string[] => [
  'geojson',
  mapfile ?? '',
];
