import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { msg, useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import {
  DEFAULT_NAME,
  profileVariantMapping,
} from 'legacy-pages/ProfileEdit/ProfileEdit.constants';

import { Flex } from 'web-components/src/components/box';
import { ProfileHeader } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader';
import { SocialLink } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.types';
import { IconTabProps } from 'web-components/src/components/tabs/IconTab';
import { IconTabs } from 'web-components/src/components/tabs/IconTabs';
import { containerStyles } from 'web-components/src/styles/container';
import { LinkComponentType } from 'web-components/src/types/shared/linkComponentType';
import { truncate } from 'web-components/src/utils/truncate';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { getAccountUrl } from 'lib/block-explorer';
import {
  ALT_PROFILE_AVATAR,
  ALT_PROFILE_BACKGROUND_IMAGE,
  COPY_PROFILE_TEXT,
  COPY_SUCCESS,
  EDIT_PROFILE_TEXT,
} from 'lib/constants/shared.constants';
import { isBridgeEnabled } from 'lib/ledger';
import { getProfileLink } from 'lib/profileLink';
import { getAllProfilePageQuery } from 'lib/queries/react-query/sanity/getAllProfilePageQuery/getAllProfilePageQuery';
import { useWallet } from 'lib/wallet/wallet';

import { Link } from 'components/atoms';

import { client as sanityClient } from '../../lib/clients/sanity';
import { DashboardBannerCard } from './Dashboard.BannerCard';
import {
  BRIDGE,
  CREDIT_BATCHES,
  CREDIT_CLASSES,
  PORTFOLIO,
  PROJECTS,
} from './Dashboard.constants';
import { dashBoardStyles } from './Dashboard.styles';
import {
  getSocialsLinks,
  getUserImages,
  getWalletAddress,
} from './Dashboard.utils';
import { useProfileItems } from './hooks/useProfileItems';

const Dashboard = (): JSX.Element => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { wallet, accountByAddr, isConnected } = useWallet();
  const {
    showCreditClasses,
    isCreditClassCreator,
    isProjectAdmin,
    isIssuer,
    showProjects,
  } = useProfileItems({});
  const location = useLocation();
  const { data: sanityProfilePageData } = useQuery(
    getAllProfilePageQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const { activeAccount } = useAuth();

  const account = activeAccount ?? accountByAddr;

  const { avatarImage, backgroundImage } = getUserImages({
    account,
  });

  const socialsLinks: SocialLink[] = useMemo(
    () => getSocialsLinks({ account }),
    [account],
  );

  const tabs: IconTabProps[] = useMemo(
    () => [
      { hidden: !isConnected, ...PORTFOLIO, label: _(PORTFOLIO.label) },
      { hidden: !showProjects, ...PROJECTS, label: _(PROJECTS.label) },
      {
        hidden: !showCreditClasses,
        ...CREDIT_CLASSES,
        label: _(CREDIT_CLASSES.label),
      },
      {
        hidden: !isIssuer,
        ...CREDIT_BATCHES,
        label: _(CREDIT_BATCHES.label),
      },
      {
        hidden: !isBridgeEnabled || !isConnected,
        ...BRIDGE,
        label: _(BRIDGE.label),
      },
    ],
    [_, isConnected, isIssuer, showCreditClasses, showProjects],
  );

  const activeTab = Math.max(
    tabs
      .filter(tab => !tab.hidden)
      .findIndex(tab => location.pathname.includes(tab.href ?? '')),
    0,
  );

  const profileLink = getProfileLink(
    activeAccount?.addr || activeAccount?.id || wallet?.address,
  );
  const walletAddress = getWalletAddress({ activeAccount, wallet });

  return (
    <>
      <ProfileHeader
        name={account?.name ? account.name : _(DEFAULT_NAME)}
        backgroundImage={backgroundImage}
        avatar={avatarImage}
        infos={{
          addressLink: {
            href: getAccountUrl(walletAddress, true),
            text: walletAddress ? truncate(walletAddress) : '',
          },
          description: account?.description?.trimEnd() ?? '',
          socialsLinks,
        }}
        editLink={activeAccount?.id ? '/dashboard/admin/profile' : ''}
        profileLink={profileLink}
        variant={
          account?.type ? profileVariantMapping[account.type] : 'individual'
        }
        LinkComponent={Link as LinkComponentType}
        copyProfileText={_(COPY_PROFILE_TEXT)}
        editProfileText={_(EDIT_PROFILE_TEXT)}
        copySuccessText={_(COPY_SUCCESS)}
        altBackgroundImage={_(ALT_PROFILE_BACKGROUND_IMAGE)}
        altAvatar={_(ALT_PROFILE_AVATAR)}
      />

      <Box sx={{ bgcolor: 'grey.50' }}>
        <Box sx={{ pt: 15, ...containerStyles, px: { xs: 5, sm: 10 } }}>
          <DashboardBannerCard sanityProfilePageData={sanityProfilePageData} />
          <IconTabs
            aria-label={_(msg`dashboard tabs`)}
            tabs={tabs}
            activeTab={activeTab}
            linkComponent={Link}
            mobileFullWidth
          />
          <Flex sx={{ ...dashBoardStyles.padTop }}>
            <Box sx={{ width: '100%' }}>
              <Outlet
                context={{
                  isCreditClassCreator,
                  isProjectAdmin,
                  isIssuer,
                  sanityProfilePageData,
                }}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export { Dashboard };
