import { Party } from 'web-components/lib/components/user/UserInfo';
import { truncate } from 'web-components/lib/utils/truncate';

import { Maybe, PartyFieldsFragment } from 'generated/graphql';

import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

export const getDisplayPartyOrAddress = (
  address?: string,
  party?: Maybe<PartyFieldsFragment>,
): Party | undefined => {
  if (!address) return;
  const defaultAvatar = getDefaultAvatar(party);
  if (!!party) {
    const name = party.name;
    const type = party.type;
    return {
      name: name ? name : truncate(address),
      type: type ? type : 'USER',
      image: party.image ? party.image : defaultAvatar,
      description: party.description?.trim(),
      link: `/ecocredits/accounts/${address}/portfolio`,
      address,
    };
  }
  return {
    name: truncate(address),
    type: 'USER',
    image: defaultAvatar,
    link: `/ecocredits/accounts/${address}/portfolio`,
    address,
  };
};
