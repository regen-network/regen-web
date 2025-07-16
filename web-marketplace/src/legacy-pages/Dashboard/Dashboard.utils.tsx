import { getResizedImageUrl } from 'utils/image/getResizedImageUrl';

import BridgeIcon from 'web-components/src/components/icons/BridgeIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import TwitterIcon from 'web-components/src/components/icons/social/TwitterIcon';
import WebsiteLinkIcon from 'web-components/src/components/icons/social/WebsiteLinkIcon';
import { SocialLink } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.types';
import { IconTabProps } from 'web-components/src/components/tabs/IconTab';

import {
  Account,
  AccountByIdQuery,
  AccountType,
  Maybe,
} from 'generated/graphql';
import { Wallet } from 'lib/wallet/wallet';

import {
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from './Dashboard.constants';

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
      icon: <TwitterIcon />,
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

export const getDefaultAvatar = (account?: Maybe<Pick<Account, 'type'>>) => {
  const isOrganization = account?.type === AccountType.Organization;
  const defaultAvatar = isOrganization
    ? DEFAULT_PROFILE_COMPANY_AVATAR
    : DEFAULT_PROFILE_USER_AVATAR;

  return defaultAvatar;
};
export const getProfileUrl = (account: {
  addr?: string | null;
  id?: string | null;
}) => {
  const identifier = account.addr || account.id;
  return `/profiles/${identifier}`;
};

type GetPortfolioTabsParams = {
  portfolioLabel: string;
  bridgeLabel: string;
};

export const getPortfolioTabs = ({
  portfolioLabel,
  bridgeLabel,
}: GetPortfolioTabsParams): IconTabProps[] => [
  {
    label: portfolioLabel,
    href: '/dashboard/portfolio',
    icon: <CreditsIcon fontSize="small" linearGradient />,
  },
  {
    label: bridgeLabel,
    href: '/dashboard/portfolio/bridge',
    icon: <BridgeIcon linearGradient />,
  },
];

export const getActivePortfolioTab = (
  tabs: IconTabProps[],
  pathname: string,
): number => {
  return Math.max(
    tabs.findIndex(tab => {
      if (tab.href === '/dashboard/portfolio/bridge') {
        return pathname.includes('/dashboard/portfolio/bridge');
      }
      if (tab.href === '/dashboard/portfolio') {
        return pathname === '/dashboard/portfolio';
      }
      return false;
    }),
    0,
  );
};
