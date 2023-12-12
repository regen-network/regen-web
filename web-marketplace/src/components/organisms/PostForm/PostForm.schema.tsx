import { z } from 'zod';
import { POST_MAX_TITLE_LENGTH } from './PostForm.constants';

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
  privatePost: z.boolean().optional(),
  privateFiles: z.boolean().optional(),
  privateLocation: z.boolean().optional(),
});

export type PostFormSchemaType = z.infer<typeof postFormSchema>;
