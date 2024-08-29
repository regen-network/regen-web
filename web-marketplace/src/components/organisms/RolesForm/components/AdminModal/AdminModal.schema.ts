import { z } from 'zod';

import {
  invalidRegenAddress,
  isValidAddress,
} from 'web-components/src/components/inputs/validation';

import { TranslatorType } from 'lib/i18n/i18n.types';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

import { DIFFERENT_ADDRESSES_ERROR_MSG } from './AdminModal.constants';

export const addressSchema = z
  .string()
  .refine(
    value => isValidAddress(value, chainInfo.bech32Config.bech32PrefixAccAddr),
    {
      message: invalidRegenAddress,
    },
  );

export const optionalAddressSchema = z
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
  .optional()
  .nullable();

export const getAdminModalSchema = (_: TranslatorType) =>
  z
    .object({
      currentAddress: addressSchema,
      newAddress: addressSchema,
    })
    .refine(schema => schema.currentAddress !== schema.newAddress, {
      message: _(DIFFERENT_ADDRESSES_ERROR_MSG),
      path: ['newAddress'],
    });

export type AdminModalSchemaType = z.infer<
  ReturnType<typeof getAdminModalSchema>
>;
