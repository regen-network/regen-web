<<<<<<< HEAD
import React from 'react';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/material';
=======
import React, { Suspense, useEffect, useState } from 'react';
import { useTheme } from '@mui/styles';
import { Box, SxProps } from '@mui/material';
import { uniq } from 'lodash';
>>>>>>> 7755e82f (Feat: Create credit class UI + absolute paths, storybook in registry (#1044))

import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';
import Section from 'web-components/lib/components/section';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { CreditClassIcon } from 'web-components/lib/components/icons/CreditClassIcon';
import { Spinner } from 'web-components/lib/components/icons/Spinner';
import { Center, Flex } from 'web-components/lib/components/box';

<<<<<<< HEAD
import { MyProjects } from '../../components/organisms';
import MyEcocredits from '../MyEcocredits';
import useQueryIfIssuer from '../../hooks/useQueryIfIssuer';
=======
import { useQueryListClasses } from 'hooks';
import { useWallet } from 'lib/wallet';
>>>>>>> 7755e82f (Feat: Create credit class UI + absolute paths, storybook in registry (#1044))

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
  const theme = useTheme();
<<<<<<< HEAD
  const isIssuer = useQueryIfIssuer();
=======
  const [isIssuer, setIsIssuer] = useState(false);
  const onChainClasses = useQueryListClasses();
  const { wallet } = useWallet();

  useEffect(() => {
    const issuers = uniq(onChainClasses?.classes?.map(cc => cc.issuers).flat());
    const isAnIssuer =
      !!wallet?.address && issuers.indexOf(wallet.address) > -1;
    setIsIssuer(isAnIssuer);
  }, [onChainClasses, wallet]);
>>>>>>> 7755e82f (Feat: Create credit class UI + absolute paths, storybook in registry (#1044))

  // TODO: We should handle these as nested routes, converting this to an
  // <Outlet> layout component if we think we'll need to route to a page
  // directly. See:
  // https://reactrouter.com/docs/en/v6/getting-started/overview#nested-routes
  const tabs: IconTabProps[] = [
    {
      label: 'Portfolio',
      icon: (
        <CreditsIcon color={theme.palette.secondary.main} fontSize="small" />
      ),
      content: (
        <LazyLoad>
          <MyEcocredits />
        </LazyLoad>
      ),
    },
    {
      label: 'Projects',
      icon: <ProjectPageIcon />,
      hidden: !isIssuer,
      content: (
        <LazyLoad>
          <Flex sx={sxs.padTop}>
            <MyProjects />
          </Flex>
        </LazyLoad>
      ),
    },
    {
      label: 'Credit Classes',
      icon: <CreditClassIcon sx={{ opacity: '70%' }} />,
      hidden: !isIssuer,
      content: (
        <LazyLoad>
          <Flex sx={sxs.padTop}>
            <MyCreditClasses />
          </Flex>
        </LazyLoad>
      ),
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
