import { TranslatorType } from 'lib/i18n/i18n.types';

import { AccountFieldsFragment, Maybe } from '../../generated/graphql';
import { DEFAULT_NAME } from '../Dashboard/Dashboard.constants';
import { getDefaultAvatar } from '../Dashboard/Dashboard.utils';

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
