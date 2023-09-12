import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

import { isGeocodingFeature } from 'web-components/lib/components/inputs/new/LocationField/LocationField.types';

export const validateLocation = (
  jurisdiction: string | undefined,
  value: string | GeocodeFeature,
): string | undefined => {
  if (jurisdiction) {
    let invalid = false;
    if (isGeocodingFeature(value)) {
      invalid = value.properties.short_code !== jurisdiction;
    } else if (value) {
      invalid = value !== jurisdiction;
    }
    if (invalid) {
      return `This location must match the on chain jurisdiction (${jurisdiction})`;
    }
  }
};
