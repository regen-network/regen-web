import { z } from 'zod';

export const editProfileFormSchema = z.object({
  profileType: z.union([z.string(), z.null()]).refine(val => val !== null),
  name: z.string(),
  profileImage: z.string(),
  backgroundImage: z.string(),
  description: z.string().max(160).optional(),
});

export type EditProfileFormSchemaType = z.infer<typeof editProfileFormSchema>;
