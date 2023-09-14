import { Maybe, PartyFieldsFragment } from '../../generated/graphql';
import { DEFAULT_NAME } from '../ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from '../ProfileEdit/ProfileEdit.utils';

export const getProjectStakeholderInitialValues = (
  party?: Maybe<PartyFieldsFragment>,
) => {
  return party
    ? {
        id: party.id,
        accountId: party.accountId,
        creatorId: party.creatorId,
        name: party.name || DEFAULT_NAME,
        profileImage: party?.image || getDefaultAvatar(party),
        profileType: party.type,
        address: party.walletByWalletId?.addr,
      }
    : null;
};
