import { z } from 'zod';

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
    .max(GALLERY_PHOTOS_MAX, MAX_PHOTOS_ERROR_MESSAGE)
    .optional()
    .refine(galleryPhotos => galleryPhotos?.length !== 2, {
      message: MIN_PHOTOS_ERROR_MESSAGE,
    }),
});

export type MediaFormSchemaType = z.infer<typeof mediaFormSchema>;
