import { Account } from 'web-components/src/components/user/UserInfo';
import { truncate } from 'web-components/src/utils/truncate';

import { AccountFieldsFragment, Maybe } from 'generated/graphql';
import { LINK_PREFIX } from 'lib/env';

import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

export const getDisplayAccountOrAddress = (
  address?: string,
  account?: Maybe<AccountFieldsFragment>,
  customerName?: string | null,
): Account | undefined => {
  if (!address) return;
  const defaultAvatar = getDefaultAvatar(account);
  if (!!account) {
    const name = account.name;
    const type = account.type;
    return {
      name: name || customerName || truncate(address),
      type: type ? type : 'USER',
      image: account.image ? account.image : defaultAvatar,
      description: account.description?.trim(),
      link: `${LINK_PREFIX}/profiles/${address}/portfolio`,
      address,
    };
  }
  return {
    name: truncate(address),
    type: 'USER',
    image: defaultAvatar,
    link: `${LINK_PREFIX}/profiles/${address}/portfolio`,
    address,
  };
};
