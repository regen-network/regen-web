import { z } from 'zod';

import { addressSchema } from './components/AdminModal/AdminModal.schema';
import { profileModalSchema } from './components/ProfileModal/ProfileModal.schema';

export const rolesFormSchema = z
  .object({
    projectDeveloper: profileModalSchema.nullable(),
    verifier: profileModalSchema.nullable(),
    admin: addressSchema,
  })
  .required({ admin: true });

export type RolesFormSchemaType = z.infer<typeof rolesFormSchema>;
