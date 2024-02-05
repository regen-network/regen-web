import { z } from 'zod';

import { PostPrivacyType } from 'web-components/src/components/organisms/PostFiles/PostFiles.types';

import { editFileFormSchema } from '../EditFileForm/EditFileForm.schema';
import { POST_MAX_TITLE_LENGTH } from './PostForm.constants';

export const postFormSchema = z.object({
  title: z.string().max(POST_MAX_TITLE_LENGTH),
  comment: z.string(),
  files: z.array(editFileFormSchema).optional(),
  privacyType: z.custom<PostPrivacyType>(),
});

export type PostFormSchemaType = z.infer<typeof postFormSchema>;
