import { z } from 'zod';

import {
  invalidRegenAddress,
  isValidAddress,
} from 'web-components/lib/components/inputs/validation';

import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

import { profileModalSchema } from './components/ProfileModal/ProfileModal.schema';

export const rolesFormSchema = z
  .object({
    projectDeveloper: profileModalSchema.nullable(),
    verifier: profileModalSchema.nullable(),
    admin: z
      .string()
      .refine(
        value =>
          isValidAddress(value, chainInfo.bech32Config.bech32PrefixAccAddr),
        {
          message: invalidRegenAddress,
        },
      ),
  })
  .required({ admin: true });

export type RolesFormSchemaType = z.infer<typeof rolesFormSchema>;
