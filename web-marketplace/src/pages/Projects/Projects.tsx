import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import { Flex } from 'web-components/src/components/box';
import { ProfileHeader } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader';
import { SocialLink } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.types';
import { IconTabProps } from 'web-components/src/components/tabs/IconTab';
import { IconTabs } from 'web-components/src/components/tabs/IconTabs';
import { containerStyles } from 'web-components/src/styles/container';
import { truncate } from 'web-components/src/utils/truncate';

import { useAuth } from 'lib/auth/auth';
import { getAccountUrl } from 'lib/block-explorer';
import { isBridgeEnabled } from 'lib/ledger';
import { getProfileLink } from 'lib/profileLink';
import { useWallet } from 'lib/wallet/wallet';

import {
  DEFAULT_NAME,
  profileVariantMapping,
} from 'pages/ProfileEdit/ProfileEdit.constants';
import { Link } from 'components/atoms';

const Projects = (): JSX.Element => {
  const location = useLocation();
  const tabs: IconTabProps[] = useMemo(
    () => [
      { hidden: !isConnected, ...PORTFOLIO },
      { hidden: !showProjects, ...PROJECTS },
    ],
    [isConnected, isIssuer, showCreditClasses, showProjects],
  );

  const activeTab = Math.max(
    tabs
      .filter(tab => !tab.hidden)
      .findIndex(tab => location.pathname.includes(tab.href ?? '')),
    0,
  );

  const profileLink = getProfileLink(wallet?.address || activeAccount?.id);
  const walletAddress = getWalletAddress({ activeAccount, wallet });

  return (
    <>
      <IconTabs
        aria-label="dashboard tabs"
        tabs={tabs}
        activeTab={activeTab}
        linkComponent={Link}
        mobileFullWidth
      />
      <Outlet />
    </>
  );
};

export { Projects };
