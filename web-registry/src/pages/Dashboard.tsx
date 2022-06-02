import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/material';
import { uniq } from 'lodash';

import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';
import Section from 'web-components/lib/components/section';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';

import { MyEcocredits } from './';
import { MyProjects } from '../components/organisms';
import useQueryListClasses from '../hooks/useQueryListClasses';
import { useWallet } from '../../src/lib/wallet';

const Dashboard: React.FC = () => {
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
      children: <MyEcocredits />,
    },
    {
      label: 'Projects',
      icon: <ProjectPageIcon />,
      children: <MyProjects />,
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
