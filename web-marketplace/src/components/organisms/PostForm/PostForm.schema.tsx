import { z } from 'zod';

import { requiredMessage } from 'web-components/src/components/inputs/validation';
import { PostPrivacyType } from 'web-components/src/components/organisms/PostFiles/PostFiles.types';

import { editFileFormSchema } from '../EditFileForm/EditFileForm.schema';
import { POST_MAX_TITLE_LENGTH } from './PostForm.constants';

export const postFormSchema = z.object({
  title: z.string().max(POST_MAX_TITLE_LENGTH).min(1),
  comment: z.string().min(1),
  files: z.array(editFileFormSchema).optional(),
  privacyType: z.custom<PostPrivacyType>(val => !!val, requiredMessage),
  published: z.boolean(),
});

export type PostFormSchemaType = z.infer<typeof postFormSchema>;
