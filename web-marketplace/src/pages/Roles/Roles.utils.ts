import { AccountFieldsFragment, Maybe } from '../../generated/graphql';
import { DEFAULT_NAME } from '../ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from '../ProfileEdit/ProfileEdit.utils';

export const getProjectStakeholderInitialValues = (
  party?: Maybe<AccountFieldsFragment>,
) => {
  return party
    ? {
        id: party.id,
        creatorId: party.creatorId,
        name: party.name || DEFAULT_NAME,
        profileImage: party?.image || getDefaultAvatar(party),
        profileType: party.type,
        address: party.addr,
      }
    : null;
};
