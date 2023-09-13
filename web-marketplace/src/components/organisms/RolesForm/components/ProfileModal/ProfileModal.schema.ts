import { z } from 'zod';

import {
  invalidRegenAddress,
  isValidAddress,
} from 'web-components/lib/components/inputs/validation';

import { PartyType } from 'generated/graphql';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

export const profileModalSchema = z.object({
  id: z.string().optional(),
  accountId: z.string().nullable().optional(),
  creatorId: z.string().nullable().optional(),
  profileType: z.custom<PartyType>(),
  name: z.string(),
  profileImage: z.string(),
  description: z.string().max(160).optional(),
  address: z
    .string()
    .refine(
      value =>
        value
          ? isValidAddress(value, chainInfo.bech32Config.bech32PrefixAccAddr)
          : true,
      {
        message: invalidRegenAddress,
      },
    )
    .optional(),
});

export type ProfileModalSchemaType = z.infer<typeof profileModalSchema>;
