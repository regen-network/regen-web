import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { z } from 'zod';

import { requiredMessage } from 'web-components/src/components/inputs/validation';

export const locationFormSchema = z.object({
  'schema:location': z
    .union([z.string(), z.custom<GeocodeFeature>()])
    .refine(value => !!value, {
      message: requiredMessage,
    }),
});

export type LocationFormSchemaType = z.infer<typeof locationFormSchema>;

export type SimplifiedLocationFormSchemaType = {
  'schema:location': GeocodeFeature;
};
