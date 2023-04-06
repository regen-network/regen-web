import { PartyByAddrQuery, PartyType } from 'generated/graphql';

import {
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from '../ProfileEdit.constants';

type Params = {
  partyByAddr?: PartyByAddrQuery | null;
};

export const usePartyInfos = ({ partyByAddr }: Params) => {
  const party = partyByAddr?.walletByAddr?.partyByWalletId;
  const isOrganization = party?.type === PartyType.Organization;
  const defaultAvatar = isOrganization
    ? DEFAULT_PROFILE_COMPANY_AVATAR
    : DEFAULT_PROFILE_USER_AVATAR;

  return { party, defaultAvatar };
};
