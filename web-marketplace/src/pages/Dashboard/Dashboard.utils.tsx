import TwitterIcon2 from 'web-components/lib/components/icons/social/TwitterIcon2';
import WebsiteLinkIcon from 'web-components/lib/components/icons/social/WebsiteLinkIcon';
import { SocialLink } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader.types';

import { Party } from 'generated/graphql';

type GetSocialsLinksParams = {
  party?: Pick<
    Party,
    | 'id'
    | 'name'
    | 'type'
    | 'image'
    | 'bgImage'
    | 'description'
    | 'accountId'
    | 'websiteLink'
    | 'twitterLink'
  > | null;
};

export const getSocialsLinks = ({
  party,
}: GetSocialsLinksParams): SocialLink[] => {
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
