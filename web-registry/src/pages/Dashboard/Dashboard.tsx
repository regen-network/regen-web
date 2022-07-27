<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/material';
=======
import React, { Suspense, useEffect, useState } from 'react';
import { Box, SxProps } from '@mui/material';
import { useTheme } from '@mui/styles';
>>>>>>> 92528156 (David/eslint simple import sort (#1075))
import { uniq } from 'lodash';

import { Center, Flex } from 'web-components/lib/components/box';
import { CreditClassIcon } from 'web-components/lib/components/icons/CreditClassIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';
import { Spinner } from 'web-components/lib/components/icons/Spinner';
import Section from 'web-components/lib/components/section';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
<<<<<<< HEAD

import { MyProjects } from '../../components/organisms';
import useQueryListClasses from '../../hooks/useQueryListClasses';
import { useWallet } from '../../lib/wallet';
import MyEcocredits from '../MyEcocredits';

const Dashboard: React.FC = () => {
=======
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';

import { useWallet } from 'lib/wallet';

import { useQueryListClasses } from 'hooks';

const MyEcocredits = React.lazy(() => import('./MyEcocredits'));
const MyProjects = React.lazy(() => import('./MyProjects'));
const MyCreditClasses = React.lazy(() => import('./MyCreditClasses'));

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

const sxs = {
  padTop: { pt: 10, pb: [21.25, 28.28] } as SxProps,
};

const Dashboard = (): JSX.Element => {
>>>>>>> 92528156 (David/eslint simple import sort (#1075))
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
      content: <MyEcocredits />,
    },
    {
      label: 'Projects',
      icon: <ProjectPageIcon />,
      content: <MyProjects />,
      hidden: !isIssuer,
    },
  ];

  return (
    <Box sx={{ bgcolor: 'grey.50' }}>
      <Section>
        <IconTabs aria-label="dashboard tabs" tabs={tabs} />
      </Section>
    </Box>
  );
};

export { Dashboard };
