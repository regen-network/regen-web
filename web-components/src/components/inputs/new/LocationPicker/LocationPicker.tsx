import { forwardRef } from 'react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

type LocationPickerProps = {
  disabled?: boolean;
  value: GeocodeFeature;
};

export const LocationPicker = forwardRef<HTMLDivElement, LocationPickerProps>(
  ({ value, disabled, ...props }, ref) => {
    return <></>;
  },
);
