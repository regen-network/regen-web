import { z } from 'zod';

import { POST_MAX_TITLE_LENGTH } from './PostForm.constants';
import { PostFormPrivacyType } from './PostForm.types';

export const postFormSchema = z.object({
  title: z.string().max(POST_MAX_TITLE_LENGTH),
  comment: z.string(),
  files: z
    .array(
      z.object({
        'schema:url': z.string(),
      }),
    )
    .optional(),
  privacyType: z.custom<PostFormPrivacyType>(),
});

export type PostFormSchemaType = z.infer<typeof postFormSchema>;
