import { TranslatorType } from 'lib/i18n/i18n.types';

import { AccountFieldsFragment, Maybe } from '../../generated/graphql';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_USER_AVATAR,
} from '../Dashboard/Dashboard.constants';

export const getProjectStakeholderInitialValues = (
  _: TranslatorType,
  account?: Maybe<AccountFieldsFragment>,
) => {
  return account
    ? {
        id: account.id,
        creatorId: account.creatorId,
        name: account.name || _(DEFAULT_NAME),
        profileImage: account?.image || DEFAULT_PROFILE_USER_AVATAR,
        profileType: account.type,
        address: account.addr,
      }
    : null;
};
