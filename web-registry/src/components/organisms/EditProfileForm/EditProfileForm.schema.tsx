import { z } from 'zod';

import { PartyType } from 'generated/graphql';

export const editProfileFormSchema = z.object({
  profileType: z
    .union([z.custom<PartyType>(), z.null()])
    .refine(val => val !== null),
  name: z.string(),
  profileImage: z.string(),
  backgroundImage: z.string(),
  description: z.string().max(160).optional(),
});

export type EditProfileFormSchemaType = z.infer<typeof editProfileFormSchema>;
