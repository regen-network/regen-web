import { useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';

import { Flex } from 'web-components/lib/components/box';
import BridgeIcon from 'web-components/lib/components/icons/BridgeIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import Section from 'web-components/lib/components/section';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';

import { Link } from 'components/atoms';

import { PortfolioHeader } from './EcocreditsByAccount.Header';
import { ecocreditsByAccountStyles } from './EcocreditsByAccount.styles';

export const EcocreditsByAccount = (): JSX.Element => {
  const { accountAddress } = useParams<{ accountAddress: string }>();
  const theme = useTheme();
  const location = useLocation();

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: 'Portfolio',
        icon: (
          <CreditsIcon color={theme.palette.secondary.main} fontSize="small" />
        ),
        href: `/ecocredits/accounts/${accountAddress}/portfolio`,
      },
      {
        label: 'Bridge',
        icon: <BridgeIcon />,
        href: `/ecocredits/accounts/${accountAddress}/bridge`,
        hidden: process.env.REACT_APP_LEDGER_CHAIN_ID === 'regen-1', // TODO: Hides in PROD - remove when Bridge is ready
      },
    ],
    [accountAddress, theme.palette.secondary.main],
  );

  const activeTab = Math.max(
    tabs.findIndex(tab => location.pathname.includes(tab.href ?? '')),
    0,
  );

  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section
        title="Profile"
        titleVariant="h2"
        titleAlign="left"
        sx={{ title: { pl: 3 } }}
      >
        <PortfolioHeader accountAddress={accountAddress} />
        <IconTabs
          aria-label="public profile tabs"
          tabs={tabs}
          linkComponent={Link}
          activeTab={activeTab}
          mobileFullWidth
        />
        <Flex sx={{ ...ecocreditsByAccountStyles.padding }}>
          <Box sx={{ width: '100%' }}>
            <Outlet />
          </Box>
        </Flex>
      </Section>
    </Box>
  );
};
