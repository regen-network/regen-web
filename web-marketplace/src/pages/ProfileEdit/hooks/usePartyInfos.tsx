import { PartyByAddrQuery } from 'generated/graphql';

import { getDefaultAvatar } from '../ProfileEdit.utils';

type Params = {
  partyByAddr?: PartyByAddrQuery | null;
};

export const usePartyInfos = ({ partyByAddr }: Params) => {
  const party = partyByAddr?.walletByAddr?.partyByWalletId;
  return { party, defaultAvatar: getDefaultAvatar(party) };
};
