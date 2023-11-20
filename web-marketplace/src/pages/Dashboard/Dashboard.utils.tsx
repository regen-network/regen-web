import { getResizedImageUrl } from 'utils/image/getResizedImageUrl';

import TwitterIcon2 from 'web-components/lib/components/icons/social/TwitterIcon2';
import WebsiteLinkIcon from 'web-components/lib/components/icons/social/WebsiteLinkIcon';
import { SocialLink } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader.types';

import { Account } from 'generated/graphql';

import { DEFAULT_PROFILE_BG } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

/* getSocialsLinks */

type GetSocialsLinksParams = {
  account?: Pick<
    Account,
    | 'id'
    | 'name'
    | 'type'
    | 'image'
    | 'bgImage'
    | 'description'
    | 'websiteLink'
    | 'twitterLink'
  > | null;
};

export const getSocialsLinks = ({
  account,
}: GetSocialsLinksParams): SocialLink[] => {
  return [
    {
      href: account?.twitterLink,
      icon: <TwitterIcon2 />,
    },
    {
      href: account?.websiteLink,
      icon: <WebsiteLinkIcon />,
    },
  ].filter((link): link is SocialLink => {
    return !!link.href;
  });
};

/* getSocialsLinks */

type GetUserImagesParams = {
  account?: Pick<Account, 'type' | 'image' | 'bgImage'> | null;
};

export const getUserImages = ({ account }: GetUserImagesParams) => {
  const backgroundImage = account?.bgImage
    ? getResizedImageUrl({
        url: account?.bgImage,
        width: 1400,
      })
    : DEFAULT_PROFILE_BG;

  const avatarImage = account?.image
    ? getResizedImageUrl({
        url: account?.image,
        width: 190,
      })
    : getDefaultAvatar(account);

  return { backgroundImage, avatarImage };
};
