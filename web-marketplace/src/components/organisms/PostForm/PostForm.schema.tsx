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
      z.object({
        url: z.string(),
        name: z.string(),
        description: z.string().optional(),
        // TODO add once #2257 merged
        // .max(FILE_MAX_DESCRIPTION_LENGTH),
        credit: z.string().optional(),
        // TODO add once #2257 merged
        // locationType: z.custom<EditFileFormLocationType>(),
        location: z.custom<Feature | GeocodeFeature>(),
      }),
    )
    .optional(),
  privacyType: z.custom<PostFormPrivacyType>(),
});

export type PostFormSchemaType = z.infer<typeof postFormSchema>;
