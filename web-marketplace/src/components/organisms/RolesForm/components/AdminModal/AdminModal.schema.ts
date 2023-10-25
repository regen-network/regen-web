import { z } from 'zod';

import {
  invalidRegenAddress,
  isValidAddress,
} from 'web-components/lib/components/inputs/validation';

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

export const adminModalSchema = z
  .object({
    currentAddress: addressSchema,
    newAddress: addressSchema,
  })
  .refine(schema => schema.currentAddress !== schema.newAddress, {
    message: DIFFERENT_ADDRESSES_ERROR_MSG,
    path: ['newAddress'],
  });

export type AdminModalSchemaType = z.infer<typeof adminModalSchema>;
