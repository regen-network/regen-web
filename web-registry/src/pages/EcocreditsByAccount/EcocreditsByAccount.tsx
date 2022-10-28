import LazyLoad from 'react-lazyload';
import { useParams } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';

import { Flex } from 'web-components/lib/components/box';
import BridgeIcon from 'web-components/lib/components/icons/BridgeIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import Section from 'web-components/lib/components/section';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';

import { BridgeTab } from './BridgeTab/BridgeTab';
import { PortfolioHeader } from './EcocreditsByAccount.Header';
import { PortfolioTab } from './PortfolioTab/EcocreditsByAccount.PortfolioTab';

// const tabsStyles = {
//   tab: {
//     outer: {
//       // mt: { xs: '10px', sm: '15px', lg: '20px' },
//       mx: { xs: '6px', sm: '8px', lg: '10px' },
//     } as SxProps,
//     // inner: { mb: { xs: '6px', sm: '9px', lg: '12px' }, ml: 0 } as SxProps,
//   },
//   panel: { inner: { p: 0 } as SxProps },
// };

export const EcocreditsByAccount = (): JSX.Element => {
  const { accountAddress } = useParams<{ accountAddress: string }>();
  const theme = useTheme();

  const tabs: IconTabProps[] = [
    {
      label: 'Portfolio',
      icon: (
        <CreditsIcon color={theme.palette.secondary.main} fontSize="small" />
      ),
      content: (
        <LazyLoad>{<PortfolioTab accountAddress={accountAddress} />}</LazyLoad>
      ),
    },
    {
      label: 'Bridge',
      icon: <BridgeIcon />,
      content: (
        <LazyLoad>
          <Flex sx={{ pt: 10, pb: [21.25, 28.28] }}>
            <BridgeTab />
          </Flex>
        </LazyLoad>
      ),
    },
  ];

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
          // sxs={tabsStyles}
        />
      </Section>
    </Box>
  );
};
