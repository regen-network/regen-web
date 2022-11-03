import React, { useState } from 'react';
import { Box, styled, SxProps } from '@mui/material';
import Tabs, { TabsProps } from '@mui/material/Tabs';

import type { Theme } from 'src/theme/muiTheme';

import { TextSize } from '../typography/sizing';
import { a11yProps } from './';
import { IconTab, IconTabProps } from './IconTab';
import { TabPanel } from './TabPanel';

interface IconTabsProps {
  tabs: IconTabProps[];
  size?: TextSize;
  sxs?: {
    tab?: {
      outer?: SxProps<Theme>;
      inner?: SxProps<Theme>;
    };
    panel?: {
      inner?: SxProps<Theme>;
    };
  };
  hideIndicator?: boolean;
}

const StyledTabs = styled(Tabs, {
  shouldForwardProp: prop => prop !== 'hideIndicator',
})<TabsProps & { hideIndicator: boolean }>(({ theme, hideIndicator }) => ({
  '& .MuiTabs-indicator': {
    display: hideIndicator && 'none',
    backgroundColor: theme.palette.secondary.main,
    height: '3px',
  },
}));

const IconTabs: React.FC<IconTabsProps> = ({
  tabs,
  size,
  sxs,
  hideIndicator = false,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ ...sxs?.tab?.outer }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="tabs"
          hideIndicator={hideIndicator}
        >
          {tabs.map((tab, index) => (
            <IconTab
              key={`tab-${index}`}
              label={tab.label}
              icon={tab?.icon}
              hidden={tab?.hidden}
              size={size}
              sxInner={{ ...sxs?.tab?.inner }}
              {...a11yProps(index)}
            />
          ))}
        </StyledTabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel
          key={index}
          value={value}
          index={index}
          hidden={tab.hidden || value !== index}
          sxs={{ ...sxs?.panel }}
        >
          {tab.content}
        </TabPanel>
      ))}
    </div>
  );
};

export { IconTabs };
