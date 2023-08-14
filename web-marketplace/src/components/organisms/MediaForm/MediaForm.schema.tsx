import { z } from 'zod';

import { ProjectStoryMediaType } from 'lib/db/types/json-ld';

import {
  CAPTION_CHART_LIMIT,
  CAPTION_LIMIT_ERROR_MESSAGE,
  GALLERY_PHOTOS_MAX,
  MAX_PHOTOS_ERROR_MESSAGE,
  MIN_PHOTOS_ERROR_MESSAGE,
} from './MediaForm.constants';

export const mediaFormSchema = z.object({
  'regen:previewPhoto': z
    .object({
      'schema:url': z.string(),
      'schema:creditText': z.string().optional(),
    })
    .optional(),
  'regen:galleryPhotos': z
    .array(
      z.object({
        'schema:url': z.string(),
        'schema:creditText': z.string().optional(),
        'schema:caption': z
          .string()
          .max(CAPTION_CHART_LIMIT, CAPTION_LIMIT_ERROR_MESSAGE)
          .optional(),
      }),
    )
    .optional()
    .refine(
      galleryPhotos => (galleryPhotos?.length ?? 0) <= GALLERY_PHOTOS_MAX + 1,
      {
        message: MAX_PHOTOS_ERROR_MESSAGE,
      },
    )
    .refine(galleryPhotos => (galleryPhotos?.length ?? 0) !== 2, {
      message: MIN_PHOTOS_ERROR_MESSAGE,
    }),
  'regen:storyMedia': z
    .object({
      '@type': z.custom<ProjectStoryMediaType>(),
      'schema:url': z.union([z.literal(''), z.string().trim().url()]),
      'schema:creditText': z.string().optional(),
    })
    .optional(),
});

export type MediaFormSchemaType = z.infer<typeof mediaFormSchema>;
