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
import { Option, OptionType } from './RoleField.types';

export const isProfile = (option: OptionType): option is Option =>
  !isValidElement(option);

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
  options: Option[],
  setProfileAdd: UseStateSetter<ProfileModalSchemaType | null>,
) => [
  ...options.sort((a, b) => -b.group.localeCompare(a.group)),
  <AddNewProfile setProfileAdd={setProfileAdd} />,
];

export const getIsOptionEqualToValue = (
  option: OptionType,
  value: OptionType,
) => isProfile(option) && isProfile(value) && option.id === value.id;

export const getOptionLabel = (option: OptionType) =>
  isProfile(option) ? option.name || DEFAULT_NAME : '';

export const groupOptions = (
  options: ProfileModalSchemaType[],
  accountId?: string,
) =>
  options.map(option => ({
    group: group(option, accountId),
    ...option,
  }));
