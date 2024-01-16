import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature } from 'geojson';
import { z } from 'zod';

import { POST_MAX_TITLE_LENGTH } from './PostForm.constants';
import { PostFormPrivacyType } from './PostForm.types';

export const postFormSchema = z.object({
  title: z.string().max(POST_MAX_TITLE_LENGTH),
  comment: z.string(),
  files: z
    .array(
      // TODO use existing edit file form schema once #2257 merged
      z.object({
        url: z.string(),
        name: z.string(),
        description: z.string().optional(),
        credit: z.string().optional(),
        locationType: z.custom<'none' | 'file' | 'custom'>(),
        location: z.custom<Feature | GeocodeFeature>(),
        mimeType: z.string(),
      }),
    )
    .optional(),
  privacyType: z.custom<PostFormPrivacyType>(),
});

export type PostFormSchemaType = z.infer<typeof postFormSchema>;
