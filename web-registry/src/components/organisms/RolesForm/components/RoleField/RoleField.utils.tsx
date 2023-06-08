import { isValidElement } from 'react';

import { UseStateSetter } from 'web-components/src/types/react/useState';

import {
  Maybe,
  PartyType,
  PartyWithAccountFieldsFragment,
} from 'generated/graphql';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';
import { AddNewProfile } from './RoleField.AddNewProfile';
import { ALL_PROFILES, YOUR_PROFILES } from './RoleField.constants';
import { OptionType } from './RoleField.types';

export const isProfile = (
  option: OptionType,
): option is ProfileModalSchemaType => !isValidElement(option);

export const group = (value: ProfileModalSchemaType, accountId?: string) =>
  value.accountId === accountId ? YOUR_PROFILES : ALL_PROFILES;

export const getParties = (parties?: Maybe<PartyWithAccountFieldsFragment>[]) =>
  parties?.map(party => ({
    accountId: party?.accountId as string,
    id: party?.id as string,
    name: party?.name || DEFAULT_NAME,
    profileType: party?.type as PartyType,
    profileImage: party?.image || getDefaultAvatar(party),
    description: party?.description || undefined,
    address: party?.walletByWalletId?.addr || undefined,
  })) || [];

export const getValue = (
  value?: ProfileModalSchemaType | null,
  accountId?: string,
) =>
  value
    ? {
        group: group(value, accountId),
        ...value,
      }
    : null;

export const getOptions = (
  options: readonly ProfileModalSchemaType[],
  setProfileAdd: UseStateSetter<ProfileModalSchemaType | null>,
  accountId?: string,
) => [
  ...options
    .map(option => ({
      group: group(option, accountId),
      ...option,
    }))
    .sort((a, b) => -b.group.localeCompare(a.group)),
  <AddNewProfile setProfileAdd={setProfileAdd} />,
];

export const getIsOptionEqualToValue = (
  option: OptionType,
  value: OptionType,
) => isProfile(option) && isProfile(value) && option.id === value.id;

export const getOptionLabel = (option: OptionType) =>
  isProfile(option) ? option.name || DEFAULT_NAME : '';
