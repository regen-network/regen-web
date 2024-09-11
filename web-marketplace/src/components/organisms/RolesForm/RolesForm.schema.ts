import { z } from 'zod';

import {
  AddressSchemaType,
  OptionalAddressSchemaType,
} from './components/AdminModal/AdminModal.schema';
import { ProfileModalRawSchemaType } from './components/ProfileModal/ProfileModal.schema';

type GetRolesFormSchemaParams = {
  isOnChain: boolean;
  addressSchema: AddressSchemaType;
  optionalAddressSchema: OptionalAddressSchemaType;
  profileModalSchema: ProfileModalRawSchemaType;
};

export const getRolesFormSchema = ({
  isOnChain,
  addressSchema,
  optionalAddressSchema,
  profileModalSchema,
}: GetRolesFormSchemaParams) => {
  const baseRolesSchema = z.object({
    projectDeveloper: profileModalSchema.nullable().optional(),
    verifier: profileModalSchema.nullable().optional(),
    admin: isOnChain ? addressSchema : optionalAddressSchema,
  });
  return isOnChain
    ? baseRolesSchema.required({ admin: true })
    : baseRolesSchema;
};
export type RolesFormSchemaType = z.infer<
  ReturnType<typeof getRolesFormSchema>
>;
