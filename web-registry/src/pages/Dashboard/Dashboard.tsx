import React, { Suspense, useEffect, useState } from 'react';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/material';
import { uniq } from 'lodash';

import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';
import Section from 'web-components/lib/components/section';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { CreditsIconWithFolder } from 'web-components/lib/components/icons/CreditsIconWithFolder';
import { Spinner } from 'web-components/lib/components/icons/Spinner';
import { Center } from 'web-components/lib/components/box';

import useQueryListClasses from '../../hooks/useQueryListClasses';
import { useWallet } from '../../lib/wallet';

const MyEcocredits = React.lazy(() => import('./MyEcocredits'));
const MyProjects = React.lazy(() => import('./MyProjects'));

const LazyLoad: React.FC = ({ children }) => (
  <Suspense
    fallback={
      <Center>
        <Spinner />
      </Center>
    }
  >
    {children}
  </Suspense>
);

const Dashboard = (): JSX.Element => {
  const theme = useTheme();
  const [isIssuer, setIsIssuer] = useState(false);
  const onChainClasses = useQueryListClasses();
  const { wallet } = useWallet();

  useEffect(() => {
    const issuers = uniq(onChainClasses?.classes?.map(cc => cc.issuers).flat());
    const isAnIssuer =
      !!wallet?.address && issuers.indexOf(wallet.address) > -1;
    setIsIssuer(isAnIssuer);
  }, [onChainClasses?.classes, wallet?.address]);

  const tabs: IconTabProps[] = [
    {
      label: 'Portfolio',
      icon: (
        <CreditsIcon color={theme.palette.secondary.main} fontSize="small" />
      ),
      content: <LazyLoad children={<MyEcocredits />} />,
    },
    {
      label: 'Projects',
      icon: <ProjectPageIcon />,
      content: <LazyLoad children={<MyProjects />} />,
      hidden: !isIssuer,
    },
    {
      label: 'Credit Classes',
      icon: <CreditsIconWithFolder sx={{ opacity: '70%' }} />,
      content: <LazyLoad children={<MyProjects />} />,
      hidden: !isIssuer,
    },
  ];

  return (
    <Box sx={{ bgcolor: 'grey.50' }}>
      <Section sx={{ root: { pb: [21.25, 28.28] } }}>
        <IconTabs aria-label="dashboard tabs" tabs={tabs} />
      </Section>
    </Box>
  );
};

export { Dashboard };
