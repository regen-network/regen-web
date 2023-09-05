import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

export function isGeocodingFeature(
  input: string | GeocodeFeature,
): input is GeocodeFeature {
  return typeof input !== 'string' && 'place_name' in input;
}
