import { z } from 'zod';

import { GALLERY_PHOTOS_MAX, GALLERY_PHOTOS_MIN } from './MediaForm.constants';

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
        'schema:caption': z.string().optional(),
      }),
    )
    .min(GALLERY_PHOTOS_MIN)
    .max(GALLERY_PHOTOS_MAX)
    .optional(),
});

export type MediaFormSchemaType = z.infer<typeof mediaFormSchema>;
