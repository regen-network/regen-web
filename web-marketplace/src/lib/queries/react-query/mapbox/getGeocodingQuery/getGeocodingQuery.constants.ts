import { ReactQueryGeocodingRequest } from './getGeocodingQuery.types';

export const getGeocodingKey = ({
  reverse,
  query,
  types,
}: ReactQueryGeocodingRequest): string[] => [
  'geocoding',
  reverse ? 'reverse' : '',
  typeof query === 'string' ? query : query?.toString() || '',
  types ? types?.toString() : '',
];
