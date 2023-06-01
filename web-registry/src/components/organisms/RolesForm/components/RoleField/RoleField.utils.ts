import { isValidElement } from 'react';

import {
  Maybe,
  PartyType,
  PartyWithAccountFieldsFragment,
} from 'generated/graphql';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';

export const isProfile = (
  option: ProfileModalSchemaType | JSX.Element,
): option is ProfileModalSchemaType => !isValidElement(option);

export const group = (value: ProfileModalSchemaType, accountId?: string) =>
  value.accountId === accountId ? 'your profiles' : 'all profiles';

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
