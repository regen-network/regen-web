import { z } from 'zod';

import { PartyType } from 'generated/graphql';

export const editProfileFormSchema = z.object({
  profileType: z.custom<PartyType>(),
  name: z.string(),
  profileImage: z.string(),
  backgroundImage: z.string(),
  description: z.string().max(160).optional(),
  websiteLink: z.string().optional(),
  twitterLink: z.string().optional(),
});

export type EditProfileFormSchemaType = z.infer<typeof editProfileFormSchema>;
