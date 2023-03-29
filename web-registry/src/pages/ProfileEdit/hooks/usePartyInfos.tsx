import { PartyByAddrQuery, PartyType } from 'generated/graphql';

import {
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from '../ProfileEdit.constants';

type Params = {
  partyByAddr?: PartyByAddrQuery | null;
  accountId?: string;
};

export const usePartyInfos = ({ partyByAddr, accountId }: Params) => {
  const partyData = partyByAddr?.walletByAddr?.partyByWalletId;
  const party = accountId === partyData?.accountId ? partyData : undefined;
  const isOrganization = party?.type === PartyType.Organization;
  const defaultAvatar = isOrganization
    ? DEFAULT_PROFILE_COMPANY_AVATAR
    : DEFAULT_PROFILE_USER_AVATAR;

  return { party, defaultAvatar };
};
