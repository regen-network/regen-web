import { z } from 'zod';

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
    .optional(),
});

export type MediaFormSchemaType = z.infer<typeof mediaFormSchema>;
