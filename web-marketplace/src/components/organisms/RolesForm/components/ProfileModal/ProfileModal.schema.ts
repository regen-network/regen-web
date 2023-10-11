import { z } from 'zod';

import { PartyType } from 'generated/graphql';

import { optionalAddressSchema } from '../AdminModal/AdminModal.schema';

export const profileModalSchema = z.object({
  id: z.string().optional(),
  accountId: z.string().nullable().optional(),
  creatorId: z.string().nullable().optional(),
  profileType: z.custom<PartyType>(),
  name: z.string(),
  profileImage: z.string(),
  description: z.string().max(160).optional(),
  address: optionalAddressSchema,
});

export type ProfileModalSchemaType = z.infer<typeof profileModalSchema>;
