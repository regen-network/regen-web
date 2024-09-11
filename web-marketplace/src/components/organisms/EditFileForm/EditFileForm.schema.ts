import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature, Point } from 'geojson';
import { z } from 'zod';

import { FileLocationType } from 'web-components/src/components/organisms/PostFiles/PostFiles';

import { FILE_MAX_DESCRIPTION_LENGTH } from './EditFileForm.constants';

export const editFileFormSchema = z.object({
  iri: z.string(),
  url: z.string().min(1),
  name: z.string().min(1),
  description: z.string().max(FILE_MAX_DESCRIPTION_LENGTH).optional(),
  credit: z.string().optional(),
  locationType: z.custom<FileLocationType>(),
  location: z.custom<Feature<Point> | GeocodeFeature>(),
  mimeType: z.string(),
});

export type EditFileFormSchemaType = z.infer<typeof editFileFormSchema>;
