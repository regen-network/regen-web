import { z } from 'zod';

import { isValidAddress } from 'web-components/src/components/inputs/validation';

import { TranslatorType } from 'lib/i18n/i18n.types';

import {
  ROLE_ADMIN,
  ROLE_EDITOR,
  ROLE_OWNER,
  ROLE_VIEWER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';

import {
  INVALID_EMAIL_OR_REGEN_ADDRESS_ERROR,
  INVALID_REGEN_ADDRESS_ERROR,
  REGEN_ADDRESS_REQUIRED_ERROR,
} from '../OrganizationMembers.constants';

export const getInviteSchema = (_: TranslatorType) =>
  z
    .object({
      role: z.enum([ROLE_OWNER, ROLE_ADMIN, ROLE_EDITOR, ROLE_VIEWER]),
      addressOrEmail: z.string().trim().min(1),
      visible: z.boolean().default(true),
    })
    .refine(
      schema =>
        schema.role !== 'viewer' &&
        z.string().email().safeParse(schema.addressOrEmail).success
          ? false
          : true,
      {
        message: _(REGEN_ADDRESS_REQUIRED_ERROR),
        path: ['addressOrEmail'],
      },
    )
    .refine(
      schema =>
        schema.role !== 'viewer' &&
        !z.string().email().safeParse(schema.addressOrEmail).success
          ? isValidAddress(schema.addressOrEmail)
          : true,
      {
        message: _(INVALID_REGEN_ADDRESS_ERROR),
        path: ['addressOrEmail'],
      },
    )
    .refine(
      schema =>
        schema.role === 'viewer'
          ? isValidAddress(schema.addressOrEmail) ||
            z.string().email().safeParse(schema.addressOrEmail).success
          : true,
      {
        message: _(INVALID_EMAIL_OR_REGEN_ADDRESS_ERROR),
        path: ['addressOrEmail'],
      },
    );

export const personalProfileSchema = z.object({
  name: z.string().min(1),
  avatar: z.string().optional(),
  title: z.string().optional(),
  description: z.string().max(160).optional(),
});

export type PersonalProfileSchemaType = z.infer<typeof personalProfileSchema>;
