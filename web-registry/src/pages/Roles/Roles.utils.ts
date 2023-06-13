import { Maybe, PartyFieldsFragment } from '../../generated/graphql';
import { getDefaultAvatar } from '../ProfileEdit/ProfileEdit.utils';

export const getProjectStakeholderInitialValues = (
  party?: Maybe<PartyFieldsFragment>,
) => {
  return party
    ? {
        id: party.id,
        accountId: party.accountId,
        name: party.name,
        profileImage: party?.image || getDefaultAvatar(party),
        profileType: party.type,
        address: party.walletByWalletId?.addr,
      }
    : null;
};
