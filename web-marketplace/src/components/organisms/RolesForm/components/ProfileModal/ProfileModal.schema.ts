import { z } from 'zod';

import { AccountType } from 'generated/graphql';

import { OptionalAddressSchemaType } from '../AdminModal/AdminModal.schema';

type GetProfileModalSchemaParams = {
  optionalAddressSchema: OptionalAddressSchemaType;
};

export const getProfileModalSchema = ({
  optionalAddressSchema,
}: GetProfileModalSchemaParams) =>
  z.object({
    id: z.string().optional(),
    creatorId: z.string().nullable().optional(),
    profileType: z.custom<AccountType>(),
    name: z.string().min(1),
    profileImage: z.string(),
    description: z.string().max(160).optional(),
    address: optionalAddressSchema,
  });

export type ProfileModalSchemaType = z.infer<
  ReturnType<typeof getProfileModalSchema>
>;

export type ProfileModalRawSchemaType = ReturnType<
  typeof getProfileModalSchema
>;
