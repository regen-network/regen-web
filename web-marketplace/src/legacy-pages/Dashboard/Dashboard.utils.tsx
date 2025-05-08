import { getResizedImageUrl } from 'utils/image/getResizedImageUrl';

import TwitterIcon from 'web-components/src/components/icons/social/TwitterIcon';
import WebsiteLinkIcon from 'web-components/src/components/icons/social/WebsiteLinkIcon';
import { SocialLink } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.types';

import { Account, AccountByIdQuery } from 'generated/graphql';
import { Wallet } from 'lib/wallet/wallet';

import { DEFAULT_PROFILE_BG } from 'legacy-pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'legacy-pages/ProfileEdit/ProfileEdit.utils';

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
      icon: <TwitterIcon color="currentColor" />,
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

type GetWalletAddressParams = {
  activeAccount?: AccountByIdQuery['accountById'];
  wallet?: Wallet;
};

export const getWalletAddress = ({
  activeAccount,
  wallet,
}: GetWalletAddressParams) => {
  return activeAccount ? activeAccount.addr : wallet?.address;
};
