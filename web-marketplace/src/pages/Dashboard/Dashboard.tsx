import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import { Flex } from 'web-components/lib/components/box';
import { ProfileHeader } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader';
import { SocialLink } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader.types';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { containerStyles } from 'web-components/lib/styles/container';
import { truncate } from 'web-components/lib/utils/truncate';

import { getAccountUrl } from 'lib/block-explorer';
import { isBridgeEnabled } from 'lib/ledger';
import { getProfileLink } from 'lib/profileLink';
import { useWallet } from 'lib/wallet/wallet';

import { useAccountInfo } from 'pages/ProfileEdit/hooks/useAccountInfo';
import {
  DEFAULT_NAME,
  profileVariantMapping,
} from 'pages/ProfileEdit/ProfileEdit.constants';
import { Link } from 'components/atoms';
import { useFetchCreditClassesWithOrder } from 'hooks/classes/useFetchCreditClassesWithOrder';

import {
  BRIDGE,
  CREDIT_BATCHES,
  CREDIT_CLASSES,
  PORTFOLIO,
  PROJECTS,
} from './Dashboard.constants';
import { dashBoardStyles } from './Dashboard.styles';
import { getSocialsLinks, getUserImages } from './Dashboard.utils';
import { useProfileItems } from './hooks/useProfileItems';

const Dashboard = (): JSX.Element => {
  const {
    showProjects,
    showCreditClasses,
    isCreditClassCreator,
    isProjectAdmin,
    isIssuer,
  } = useProfileItems({});
  const { wallet, accountId, partyByAddr } = useWallet();
  const location = useLocation();

  const { party } = useAccountInfo({ partyByAddr });
  const { avatarImage, backgroundImage } = getUserImages({ party });
  const { creditClasses } = useFetchCreditClassesWithOrder({
    admin: wallet?.address,
  });

  const socialsLinks: SocialLink[] = useMemo(
    () =>
      getSocialsLinks({ party: partyByAddr?.walletByAddr?.partyByWalletId }),
    [partyByAddr],
  );

  const tabs: IconTabProps[] = useMemo(
    () => [
      PORTFOLIO,
      {
        hidden: !showProjects,
        ...PROJECTS,
      },
      {
        hidden: !showCreditClasses || creditClasses.length === 0,
        ...CREDIT_CLASSES,
      },
      {
        hidden: !isIssuer,
        ...CREDIT_BATCHES,
      },
      {
        hidden: !isBridgeEnabled,
        ...BRIDGE,
      },
    ],
    [isIssuer, showCreditClasses, showProjects, creditClasses.length],
  );

  const activeTab = Math.max(
    tabs
      .filter(tab => !tab.hidden)
      .findIndex(tab => location.pathname.includes(tab.href ?? '')),
    0,
  );

  const profileLink = getProfileLink(wallet?.address || party?.id);

  return (
    <>
      <ProfileHeader
        name={party?.name ? party.name : DEFAULT_NAME}
        backgroundImage={backgroundImage}
        avatar={avatarImage}
        infos={{
          addressLink: {
            href: getAccountUrl(wallet?.address, true),
            text: truncate(wallet?.address),
          },
          description: party?.description?.trimEnd() ?? '',
          socialsLinks,
        }}
        editLink={accountId ? '/profile/edit' : ''}
        profileLink={profileLink}
        variant={party?.type ? profileVariantMapping[party.type] : 'individual'}
        LinkComponent={Link}
      />
      <Box sx={{ bgcolor: 'grey.50' }}>
        <Box sx={{ pt: 15, ...containerStyles, px: { xs: 5, sm: 10 } }}>
          <IconTabs
            aria-label="dashboard tabs"
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
