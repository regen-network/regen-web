export const getGeocodingKey = (search?: string): string[] => [
  'geocoding',
  search ?? '',
];
