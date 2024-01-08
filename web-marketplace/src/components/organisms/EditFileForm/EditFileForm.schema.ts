import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature, Point } from 'geojson';
import { z } from 'zod';

import { FILE_MAX_DESCRIPTION_LENGTH } from './EditFileForm.constants';
import { EditFileFormLocationType } from './EditFileForm.types';

export const editFileFormSchema = z.object({
  name: z.string(),
  description: z.string().max(FILE_MAX_DESCRIPTION_LENGTH).optional(),
  credit: z.string().optional(),
  locationType: z.custom<EditFileFormLocationType>(),
  location: z.custom<Feature>(),
});

export type EditFileFormSchemaType = z.infer<typeof editFileFormSchema>;
