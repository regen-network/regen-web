import { AccountByAddrQuery } from 'generated/graphql';

import { getDefaultAvatar } from '../ProfileEdit.utils';

type Params = {
  accountByAddr?: AccountByAddrQuery | null;
};

export const useAccountInfo = ({ accountByAddr }: Params) => {
  const account = accountByAddr?.accountByAddr;
  return { account, defaultAvatar: getDefaultAvatar(account) };
};
