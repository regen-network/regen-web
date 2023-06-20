import { Party } from 'web-components/lib/components/user/UserInfo';
import { truncate } from 'web-components/lib/utils/truncate';

import { Maybe, PartyFieldsFragment } from 'generated/graphql';

export const getDisplayAdmin = (
  address?: string,
  party?: Maybe<PartyFieldsFragment>,
  defaultAvatar?: string,
): Party | undefined => {
  if (!address) return;
  if (!!party) {
    const name = party.name;
    const type = party.type;
    return {
      name: name ? name : truncate(address),
      type: type ? type : 'USER',
      image: party.image ? party.image : defaultAvatar,
      description: party.description,
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
