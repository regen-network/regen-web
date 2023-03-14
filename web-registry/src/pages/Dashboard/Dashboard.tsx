import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTheme } from '@mui/styles';

import { Flex } from 'web-components/lib/components/box';
import BridgeIcon from 'web-components/lib/components/icons/BridgeIcon';
import { CreditBatchIcon } from 'web-components/lib/components/icons/CreditBatchIcon';
import { CreditClassIcon } from 'web-components/lib/components/icons/CreditClassIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';
import { ProfileHeader } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader';
import Section from 'web-components/lib/components/section';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { truncate } from 'web-components/lib/utils/truncate';

import { isBridgeEnabled } from 'lib/ledger';
import { useWallet } from 'lib/wallet/wallet';

import { Link } from 'components/atoms';
import { useQueryIfCreditClassAdmin } from 'hooks/useQueryIfCreditClassAdmin';
import { useQueryIfCreditClassCreator } from 'hooks/useQueryIfCreditClassCreator';
import { useQueryIfIssuer } from 'hooks/useQueryIfIssuer';
import { useQueryIfProjectAdmin } from 'hooks/useQueryIfProjectAdmin';

import { dashBoardStyles } from './Dashboard.styles';

const Dashboard = (): JSX.Element => {
  const theme = useTheme();
  const isIssuer = useQueryIfIssuer();
  const isCreditClassCreator = useQueryIfCreditClassCreator();
  const isCreditClassAdmin = useQueryIfCreditClassAdmin();
  const isProjectAdmin = useQueryIfProjectAdmin();
  const showProjectTab = isIssuer || isProjectAdmin;
  const showCreditClassTab = isCreditClassCreator || isCreditClassAdmin;
  const { wallet } = useWallet();
  const location = useLocation();

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: 'Portfolio',
        icon: (
          <CreditsIcon color={theme.palette.secondary.main} fontSize="small" />
        ),
        href: '/ecocredits/portfolio',
      },
      {
        label: 'Projects',
        icon: <ProjectPageIcon />,
        href: '/ecocredits/projects',
        hidden: !showProjectTab,
      },
      {
        label: 'Credit Classes',
        icon: <CreditClassIcon sx={{ opacity: '70%' }} />,
        href: '/ecocredits/credit-classes',
        hidden: !showCreditClassTab,
      },
      {
        label: 'Credit Batches',
        icon: (
          <CreditBatchIcon sx={{ color: 'secondary.dark', opacity: '70%' }} />
        ),
        href: '/ecocredits/credit-batches',
        hidden: !isIssuer,
      },
      {
        label: 'Bridge',
        icon: <BridgeIcon />,
        href: '/ecocredits/bridge',
        hidden: !isBridgeEnabled,
      },
    ],
    [
      isIssuer,
      showCreditClassTab,
      showProjectTab,
      theme.palette.secondary.main,
    ],
  );

  const activeTab = Math.max(
    tabs
      .filter(tab => !tab.hidden)
      .findIndex(tab => location.pathname.includes(tab.href ?? '')),
    0,
  );

  return (
    <>
      <ProfileHeader
        name="Impact Ag"
        backgroundImage="/jpg/profile-default-bg.jpg"
        avatar="/jpg/profile-default-avatar.jpg"
        infos={{
          address: truncate(wallet?.address),
          description:
            'Impact Ag Partners is a specialist agricultural asset management firm and advisory service.',
        }}
        editLink="/profile/edit"
        variant="organization"
        LinkComponent={Link}
      />
      <Box sx={{ bgcolor: 'grey.50' }}>
        <Section>
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
                  isCreditClassAdmin,
                  isProjectAdmin,
                  isIssuer,
                }}
              />
            </Box>
          </Flex>
        </Section>
      </Box>
    </>
  );
};

export { Dashboard };
