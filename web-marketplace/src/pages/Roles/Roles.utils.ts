import { TranslatorType } from 'lib/i18n/i18n.types';

import { AccountFieldsFragment, Maybe } from '../../generated/graphql';
import { DEFAULT_NAME } from '../ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from '../ProfileEdit/ProfileEdit.utils';

export const getProjectStakeholderInitialValues = (
  _: TranslatorType,
  party?: Maybe<AccountFieldsFragment>,
) => {
  return party
    ? {
        id: party.id,
        creatorId: party.creatorId,
        name: party.name || _(DEFAULT_NAME),
        profileImage: party?.image || getDefaultAvatar(party),
        profileType: party.type,
        address: party.addr,
      }
    : null;
};
