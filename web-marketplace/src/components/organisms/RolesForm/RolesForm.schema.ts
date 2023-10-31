import { z } from 'zod';

import {
  addressSchema,
  optionalAddressSchema,
} from './components/AdminModal/AdminModal.schema';
import { profileModalSchema } from './components/ProfileModal/ProfileModal.schema';

export const rolesFormSchema = (isOnChain: boolean) => {
  const baseRolesSchema = z.object({
    projectDeveloper: profileModalSchema.nullable().optional(),
    verifier: profileModalSchema.nullable().optional(),
    admin: isOnChain ? addressSchema : optionalAddressSchema,
  });
  return isOnChain
    ? baseRolesSchema.required({ admin: true })
    : baseRolesSchema;
};
export type RolesFormSchemaType = z.infer<ReturnType<typeof rolesFormSchema>>;
