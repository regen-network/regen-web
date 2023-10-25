import { Account } from 'web-components/lib/components/user/UserInfo';
import { truncate } from 'web-components/lib/utils/truncate';

import { AccountFieldsFragment, Maybe } from 'generated/graphql';

import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

export const getDisplayAccountOrAddress = (
  address?: string,
  account?: Maybe<AccountFieldsFragment>,
): Account | undefined => {
  if (!address) return;
  const defaultAvatar = getDefaultAvatar(account);
  if (!!account) {
    const name = account.name;
    const type = account.type;
    return {
      name: name ? name : truncate(address),
      type: type ? type : 'USER',
      image: account.image ? account.image : defaultAvatar,
      description: account.description?.trim(),
      link: `/profiles/${address}/portfolio`,
      address,
    };
  }
  return {
    name: truncate(address),
    type: 'USER',
    image: defaultAvatar,
    link: `/profiles/${address}/portfolio`,
    address,
  };
};
