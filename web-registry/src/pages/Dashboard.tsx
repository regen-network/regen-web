import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/material';
import { uniq } from 'lodash';

import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';
import Section from 'web-components/lib/components/section';

import { IconTab, a11yProps } from '../components/atoms/IconTab'; //TODO: to web-components
import { StyledTabs } from '../components/atoms/StyledTabs'; //TODO: to web-components
import { TabPanel } from '../components/atoms/TabPanel'; //TODO: to web-components
import { MyEcocredits } from './';
import { MyProjects } from '../components/organisms';
import useQueryListClasses from '../hooks/useQueryListClasses';
import { useWallet } from '../../src/lib/wallet';

const Dashboard: React.FC = () => {
  const [value, setValue] = useState(0);
  const [isIssuer, setIsIssuer] = useState(false);
  const theme = useTheme();
  const onChainClasses = useQueryListClasses();
  const { wallet } = useWallet();

  useEffect(() => {
    const issuers = uniq(onChainClasses?.classes?.map(cc => cc.issuers).flat());
    const isAnIssuer =
      !!wallet?.address && issuers.indexOf(wallet.address) > -1;
    setIsIssuer(isAnIssuer);
  }, [onChainClasses?.classes, wallet?.address]);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: 'grey.50' }}>
      <Section>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="dashboard tabs"
        >
          <IconTab
            label="Portfolio"
            icon={
              <CreditsIcon
                color={theme.palette.secondary.main}
                fontSize="small"
              />
            }
            {...a11yProps(0)}
          />
          <IconTab
            label="Projects"
            icon={<ProjectPageIcon />}
            hidden={!isIssuer}
            {...a11yProps(1)}
          />
          {/* <IconTab value="credit-classes" label="Credit Classes" /> */}
          {/* <IconTab value="credit-batches" label="Credit Batches" /> */}
          {/* <IconTab value="history" label="History" /> */}
        </StyledTabs>
        <Box sx={{ minHeight: 370 }}>
          <TabPanel value={value} index={0}>
            <MyEcocredits />
          </TabPanel>
          <TabPanel value={value} index={1} hidden={!isIssuer}>
            <MyProjects />
          </TabPanel>
        </Box>
      </Section>
    </Box>
  );
};

export { Dashboard };
