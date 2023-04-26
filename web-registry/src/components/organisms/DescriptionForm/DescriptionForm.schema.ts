import { z } from 'zod';

import {
  EMPTY_STORY_ERROR_MSG,
  EMPTY_STORY_TITLE_ERROR_MSG,
  STORY_CHAR_LIMIT,
  STORY_TITLE_CHAR_LIMIT,
  SUMMARY_CHAR_LIMIT,
} from './DescriptionForm.constants';

export const descriptionFormSchema = z
  .object({
    'schema:description': z.string().max(SUMMARY_CHAR_LIMIT).optional(),
    'regen:story': z.string().max(STORY_CHAR_LIMIT).optional(),
    'regen:storyTitle': z.string().max(STORY_TITLE_CHAR_LIMIT).optional(),
  })
  .refine(schema => !(!!schema['regen:story'] && !schema['regen:storyTitle']), {
    message: EMPTY_STORY_TITLE_ERROR_MSG,
    path: ['regen:storyTitle'],
  })
  .refine(schema => !(!!schema['regen:storyTitle'] && !schema['regen:story']), {
    message: EMPTY_STORY_ERROR_MSG,
    path: ['regen:story'],
  });

export type DescriptionSchemaType = z.infer<typeof descriptionFormSchema>;
