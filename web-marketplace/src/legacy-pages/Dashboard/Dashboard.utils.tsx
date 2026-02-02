import { WasmExecuteAction } from 'utils/cosmwasm';
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
  Organization,
} from 'generated/graphql';
import { Wallet } from 'lib/wallet/wallet';

import {
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from './Dashboard.constants';

/* getSocialsLinks */

type GetSocialsLinksParams = {
  profile?: Pick<Account | Organization, 'websiteLink' | 'twitterLink'> | null;
};

export const getSocialsLinks = ({
  profile,
}: GetSocialsLinksParams): SocialLink[] => {
  return [
    {
      href: profile?.twitterLink,
      icon: <TwitterIcon />,
    },
    {
      href: profile?.websiteLink,
      icon: <WebsiteLinkIcon />,
    },
  ].filter((link): link is SocialLink => {
    return !!link.href;
  });
};

/* getSocialsLinks */

type GetProfileImagesParams = {
  profile?: Pick<Account | Organization, 'image' | 'bgImage'> | null;
};

export const getProfileImages = ({ profile }: GetProfileImagesParams) => {
  const fetchedBgImage = profile?.bgImage;
  const fetchedAvatarImage = profile?.image;
  const backgroundImage = fetchedBgImage
    ? getResizedImageUrl({
        url: fetchedBgImage,
        width: 1400,
      })
    : DEFAULT_PROFILE_BG;

  // Avatar image next/image optimized so no need to use getResizedImageUrl
  const avatarImage = fetchedAvatarImage || DEFAULT_PROFILE_USER_AVATAR;

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
  basePath: string;
};

export const getPortfolioTabs = ({
  portfolioLabel,
  bridgeLabel,
  basePath,
}: GetPortfolioTabsParams): IconTabProps[] => [
  {
    label: portfolioLabel,
    href: `${basePath}/portfolio`,
    icon: <CreditsIcon fontSize="small" linearGradient />,
  },
  {
    label: bridgeLabel,
    href: `${basePath}/portfolio/bridge`,
    icon: <BridgeIcon linearGradient />,
  },
];

export const getActivePortfolioTab = (
  tabs: IconTabProps[],
  pathname: string,
): number => {
  const normalizedPath = pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;

  return Math.max(
    tabs.findIndex(tab => {
      const normalizedHref = tab.href?.endsWith('/')
        ? tab.href.slice(0, -1)
        : tab.href;

      if (normalizedHref?.endsWith('/bridge')) {
        return normalizedPath.startsWith(normalizedHref);
      }

      return normalizedPath === normalizedHref;
    }),
    0,
  );
};

type MetadataKey = 'banner' | 'website_link' | 'twitter_link';

type GetMetadataActionParams = {
  key: MetadataKey;
  nextValue?: string | null;
  previousValue?: string | null;
  authorizationId: number;
  roleId: number;
  daoAddress: string;
};

export const getMetadataAction = ({
  key,
  nextValue,
  previousValue,
  authorizationId,
  roleId,
  daoAddress,
}: GetMetadataActionParams): WasmExecuteAction | undefined => {
  const normalizedNext = nextValue ?? null;
  let normalizedPrevious = previousValue ?? null;

  if (key === 'banner') {
    if (normalizedNext === DEFAULT_PROFILE_BG) {
      normalizedPrevious = DEFAULT_PROFILE_BG;
    }
    if (normalizedPrevious === DEFAULT_PROFILE_BG) {
      normalizedPrevious = null;
    }
  }

  if (normalizedNext === normalizedPrevious) return undefined;

  if (normalizedNext) {
    return {
      authorizationId,
      roleId,
      contract: daoAddress,
      msg: {
        set_item: {
          key,
          value: normalizedNext,
        },
      },
    };
  }

  if (normalizedPrevious) {
    return {
      authorizationId,
      roleId,
      contract: daoAddress,
      msg: {
        remove_item: {
          key,
        },
      },
    };
  }

  return undefined;
};

type DashboardProfileItems = {
  isIssuer: boolean;
  showCreditClasses: boolean;
  isLoadingIsIssuer: boolean;
  isLoadingCreditClasses: boolean;
};

type GetSwitchDashboardPathParams = {
  pathname: string;
  isOrganizationDashboard: boolean;
  targetIsOrg: boolean;
  orgDashboardBasePath: string;
  personalDashboardBasePath: string;
  organizationProfileItems: DashboardProfileItems;
  personalProfileItems: DashboardProfileItems;
  organizationHasCreditBatches: boolean;
  personalHasCreditBatches: boolean;
  organizationBatchesLoading: boolean;
  personalBatchesLoading: boolean;
  hasOrders: boolean;
  ordersLoading: boolean;
  targetHasWalletAddress: boolean;
};

/**
 * Determines the path to navigate to when switching between personal and organization dashboards.
 * Attempts to preserve the current section (e.g., projects, credit-batches) when switching,
 * but falls back to /portfolio if the section is not available in the target dashboard.
 *
 * @param params - Configuration for path calculation
 * @returns The full path to navigate to in the target dashboard
 */
export const getSwitchDashboardPath = ({
  pathname,
  isOrganizationDashboard,
  targetIsOrg,
  orgDashboardBasePath,
  personalDashboardBasePath,
  organizationProfileItems,
  personalProfileItems,
  organizationHasCreditBatches,
  personalHasCreditBatches,
  organizationBatchesLoading,
  personalBatchesLoading,
  hasOrders,
  ordersLoading,
  targetHasWalletAddress,
}: GetSwitchDashboardPathParams): string => {
  // Determine source and target base paths
  const fromBase = isOrganizationDashboard
    ? orgDashboardBasePath
    : personalDashboardBasePath;
  const toBase = targetIsOrg ? orgDashboardBasePath : personalDashboardBasePath;

  // Extract the current section from the pathname
  const rawSuffix = pathname.startsWith(fromBase)
    ? pathname.slice(fromBase.length)
    : '';
  const suffix = rawSuffix.replace(/^\/+/, '').replace(/\/+$/, '');

  // If no section, just return the base path
  if (!suffix) return toBase;

  const section = suffix.split('/')[0];

  // Get target dashboard's profile items and capabilities
  const targetProfileItems = targetIsOrg
    ? organizationProfileItems
    : personalProfileItems;
  const targetHasCreditBatches =
    targetProfileItems.isIssuer ||
    (targetIsOrg ? organizationHasCreditBatches : personalHasCreditBatches);
  const targetCreditBatchesLoading =
    (targetIsOrg ? organizationBatchesLoading : personalBatchesLoading) ||
    targetProfileItems.isLoadingIsIssuer;
  const targetHasCreditClasses = targetProfileItems.showCreditClasses;
  const targetCreditClassesLoading = targetProfileItems.isLoadingCreditClasses;

  // Check if the section is not supported in the target dashboard
  const isUnsupported = targetIsOrg
    ? section === 'settings' || section === 'my-orders' // Not available in org dashboard
    : section === 'members'; // Not available in personal dashboard

  // Check if this is a project-specific route (e.g., /projects/[id]/...)
  const isProjectSpecificRoute =
    section === 'projects' && suffix.split('/').length > 1;

  // Determine if we should fallback to /portfolio
  const shouldFallback =
    isUnsupported ||
    isProjectSpecificRoute ||
    // Don't navigate to credit-batches if target doesn't have any (and not loading)
    (section === 'credit-batches' &&
      !targetHasCreditBatches &&
      !targetCreditBatchesLoading) ||
    // Don't navigate to credit-classes if target doesn't have any (and not loading)
    (section === 'credit-classes' &&
      !targetHasCreditClasses &&
      !targetCreditClassesLoading) ||
    // Don't navigate to sell-orders if switching to personal dashboard without wallet
    // (sell-orders requires a wallet to view/manage)
    (section === 'sell-orders' && !targetIsOrg && !targetHasWalletAddress) ||
    // Don't navigate to portfolio if switching to personal dashboard without wallet
    // (portfolio requires a wallet)
    (section === 'portfolio' && !targetIsOrg && !targetHasWalletAddress);

  // Determine the fallback path based on wallet availability
  // Web2 users without wallet should go to projects instead of portfolio
  const fallbackSection =
    !targetIsOrg && !targetHasWalletAddress ? 'projects' : 'portfolio';

  if (shouldFallback) return `${toBase}/${fallbackSection}`;

  return `${toBase}/${suffix}`;
};
