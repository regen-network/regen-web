import { z } from 'zod';

import { PartyType } from 'generated/graphql';

import { addressSchema } from '../AdminModal/AdminModal.schema';

export const profileModalSchema = z.object({
  id: z.string().optional(),
  accountId: z.string().optional(),
  profileType: z.custom<PartyType>(),
  name: z.string(),
  profileImage: z.string(),
  description: z.string().max(160).optional(),
  address: addressSchema.optional(),
});

export type ProfileModalSchemaType = z.infer<typeof profileModalSchema>;
