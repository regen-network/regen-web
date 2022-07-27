import React, { useState } from 'react';
import { styled } from '@mui/material';
<<<<<<< HEAD
import { TabPanel } from './TabPanel';
import { IconTab, IconTabProps } from './IconTab';
import { a11yProps } from './';
=======
import Tabs, { TabsProps } from '@mui/material/Tabs';

import { a11yProps } from './';
import { IconTab, IconTabProps } from './IconTab';
import { TabPanel } from './TabPanel';
>>>>>>> 92528156 (David/eslint simple import sort (#1075))

interface IconTabsProps {
  tabs: IconTabProps[];
}

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.secondary.main,
    height: '3px',
  },
}));

const IconTabs: React.FC<IconTabsProps> = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <StyledTabs value={value} onChange={handleChange} aria-label="tabs">
          {tabs.map((tab, index) => (
            <IconTab
              key={`tab-${index}`}
              label={tab.label}
              icon={tab?.icon}
              hidden={tab?.hidden}
              {...a11yProps(index)}
            />
          ))}
        </StyledTabs>
      </div>
      {tabs.map(
        (tab, index) =>
          value === index && (
            <TabPanel value={value} index={index} key={tab.label}>
              {tab.content}
            </TabPanel>
          ),
      )}
    </div>
  );
};

export { IconTabs };
