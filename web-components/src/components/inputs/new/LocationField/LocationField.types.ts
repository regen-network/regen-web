import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature } from 'geojson';

export function isGeocodingFeature(
  input: string | GeocodeFeature | Feature,
): input is GeocodeFeature {
  return typeof input !== 'string' && 'place_name' in input;
}
