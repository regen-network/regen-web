import { getResizedImageUrl } from 'utils/image/getResizedImageUrl';

import TwitterIcon2 from 'web-components/lib/components/icons/social/TwitterIcon2';
import WebsiteLinkIcon from 'web-components/lib/components/icons/social/WebsiteLinkIcon';
import { SocialLink } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader.types';

import { Maybe, Party } from 'generated/graphql';

import { DEFAULT_PROFILE_BG } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

/* getSocialsLinks */

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

/* getSocialsLinks */

type GetUserImagesParams = {
  party?: Pick<Party, 'type' | 'image' | 'bgImage'> | null;
};

export const getUserImages = ({ party }: GetUserImagesParams) => {
  const backgroundImage = party?.bgImage
    ? getResizedImageUrl({
        url: party?.bgImage,
        width: 1400,
      })
    : DEFAULT_PROFILE_BG;

  const avatarImage = party?.image
    ? getResizedImageUrl({
        url: party?.image,
        width: 190,
      })
    : getDefaultAvatar(party);

  return { backgroundImage, avatarImage };
};
