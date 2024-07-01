import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature, Point } from 'geojson';
import { z } from 'zod';

import { FILE_MAX_DESCRIPTION_LENGTH } from './EditFileForm.constants';
import { EditFileFormLocationType } from './EditFileForm.types';

export const editFileFormSchema = z.object({
  iri: z.string(),
  url: z.string().min(1),
  name: z.string().min(1),
  description: z.string().max(FILE_MAX_DESCRIPTION_LENGTH).optional(),
  credit: z.string().optional(),
  locationType: z.custom<EditFileFormLocationType>(),
  location: z.custom<Feature<Point> | GeocodeFeature>(),
  mimeType: z.string(),
});

export type EditFileFormSchemaType = z.infer<typeof editFileFormSchema>;
