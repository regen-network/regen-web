import React from 'react';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/material';

import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';
import Section from 'web-components/lib/components/section';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';

import { MyProjects } from '../../components/organisms';
import MyEcocredits from '../MyEcocredits';
import useQueryIfIssuer from '../../hooks/useQueryIfIssuer';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isIssuer = useQueryIfIssuer();

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

  console.log('isIssuer ', isIssuer);

  return (
    <Box sx={{ bgcolor: 'grey.50' }}>
      <Section>
        <IconTabs aria-label="dashboard tabs" tabs={tabs} />
      </Section>
    </Box>
  );
};

export { Dashboard };
