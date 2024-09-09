import { isValidElement } from 'react';

import { UseStateSetter } from 'web-components/src/types/react/useState';

import { AccountFieldsFragment, AccountType, Maybe } from 'generated/graphql';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';
import { AddNewProfile } from './RoleField.AddNewProfile';
import { ALL_PROFILES, YOUR_PROFILES } from './RoleField.constants';
import { Option, OptionType } from './RoleField.types';

export const isProfile = (option: OptionType): option is Option =>
  !isValidElement(option);

export const group = (
  _: TranslatorType,
  value: ProfileModalSchemaType,
  authenticatedAccountIds?: string[],
) =>
  value.id && authenticatedAccountIds?.includes(value.id)
    ? _(YOUR_PROFILES)
    : _(ALL_PROFILES);

export const getAccounts = (
  _: TranslatorType,
  accounts?: Maybe<AccountFieldsFragment | undefined>[],
) =>
  accounts?.map(account => ({
    creatorId: account?.creatorId,
    id: account?.id as string,
    name: account?.name || _(DEFAULT_NAME),
    profileType: account?.type as AccountType,
    profileImage: account?.image || getDefaultAvatar(account),
    description: account?.description || undefined,
    address: account?.addr || undefined,
  })) || [];

export const getValue = (
  _: TranslatorType,
  value?: ProfileModalSchemaType | null,
  authenticatedAccountIds?: string[],
) =>
  value
    ? {
        group: group(_, value, authenticatedAccountIds),
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
  isProfile(option) ? option.name || 'Unnamed' : '';

export const groupOptions = (
  _: TranslatorType,
  options: ProfileModalSchemaType[],
  authenticatedAccountIds?: string[],
) =>
  options.map(option => ({
    group: group(_, option, authenticatedAccountIds),
    ...option,
  }));
