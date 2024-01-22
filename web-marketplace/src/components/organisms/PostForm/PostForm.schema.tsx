import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature } from 'geojson';
import { z } from 'zod';

import { POST_MAX_TITLE_LENGTH } from './PostForm.constants';
import { PostFormPrivacyType } from './PostForm.types';
import { editFileFormSchema } from '../EditFileForm/EditFileForm.schema';

export const postFormSchema = z.object({
  title: z.string().max(POST_MAX_TITLE_LENGTH),
  comment: z.string(),
  files: z
    .array(editFileFormSchema)
    .optional(),
  privacyType: z.custom<PostFormPrivacyType>(),
});

export type PostFormSchemaType = z.infer<typeof postFormSchema>;
