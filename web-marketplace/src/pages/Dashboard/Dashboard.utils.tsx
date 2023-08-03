import TwitterIcon2 from 'web-components/lib/components/icons/social/TwitterIcon2';
import WebsiteLinkIcon from 'web-components/lib/components/icons/social/WebsiteLinkIcon';
import { SocialLink } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader.types';

import { PartyByAddrQuery } from 'generated/graphql';

type GetSocialsLinksParams = {
  partyByAddr?: PartyByAddrQuery | null;
};

export const getSocialsLinks = ({
  partyByAddr,
}: GetSocialsLinksParams): SocialLink[] => {
  const party = partyByAddr?.walletByAddr?.partyByWalletId;

  return [
    {
      href: party?.twitterLink,
      icon: <TwitterIcon2 />,
    },
    {
      href: party?.websiteLink,
      icon: <WebsiteLinkIcon />,
    },
  ].filter((link): link is SocialLink => {
    return !!link.href;
  });
};
