import { PartyFieldsFragment } from '../../generated/graphql';
import { getDefaultAvatar } from '../ProfileEdit/ProfileEdit.utils';

export const getProjectStakholderInitialValues = (
  party: PartyFieldsFragment,
) => {
  return party
    ? {
        id: party.id,
        name: party.name,
        profileImage: party?.image || getDefaultAvatar(party),
        profileType: party.type,
        address: party.walletByWalletId?.addr,
      }
    : null;
};
