import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { z } from 'zod';

type LocationFormSchemaParams = {
  requiredMessage: string;
};

export const getLocationFormSchema = ({
  requiredMessage,
}: LocationFormSchemaParams) =>
  z.object({
    'schema:location': z
      .union([z.string(), z.custom<GeocodeFeature>()])
      .refine(value => !!value, {
        message: requiredMessage,
      }),
  });

export const locationFormDraftSchema = z.object({
  'schema:location': z
    .union([z.string(), z.custom<GeocodeFeature>()])
    .optional(),
});

export type LocationFormSchemaType = z.infer<
  ReturnType<typeof getLocationFormSchema>
>;
