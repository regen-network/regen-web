import { z } from 'zod';

import { isValidAddress } from 'web-components/src/components/inputs/validation';

import { TranslatorType } from 'lib/i18n/i18n.types';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

import { DIFFERENT_ADDRESSES_ERROR_MSG } from './AdminModal.constants';

type GetAddressSchemaParams = {
  invalidRegenAddress: string;
  requiredMessage: string;
  differentAddressesErrorMessage: string;
};

export const getAddressSchema = ({
  invalidRegenAddress,
}: GetAddressSchemaParams) =>
  z
    .string()
    .refine(
      value =>
        isValidAddress(value, chainInfo.bech32Config.bech32PrefixAccAddr),
      {
        message: invalidRegenAddress,
      },
    );

export type AddressSchemaType = ReturnType<typeof getAddressSchema>;

type GetOptionalAddressSchemaParams = {
  invalidRegenAddress: string;
};

export const getOptionalAddressSchema = ({
  invalidRegenAddress,
}: GetOptionalAddressSchemaParams) =>
  z
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

export type OptionalAddressSchemaType = ReturnType<
  typeof getOptionalAddressSchema
>;

type GetAdminModalSchemaParams = {
  addressSchema: AddressSchemaType;
  _: TranslatorType;
};

export const getAdminModalSchema = ({
  addressSchema,
  _,
}: GetAdminModalSchemaParams) =>
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
