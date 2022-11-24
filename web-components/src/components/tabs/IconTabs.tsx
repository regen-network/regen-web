import React, { useEffect, useState } from 'react';
import { Box, styled, SxProps } from '@mui/material';
import Tabs, { TabsProps } from '@mui/material/Tabs';

import type { Theme } from 'src/theme/muiTheme';

import { LinkItem } from '../footer/footer-new';
import { TextSize } from '../typography/sizing';
import { a11yProps } from './';
import { IconTab, IconTabProps } from './IconTab';
import { TabPanel } from './TabPanel';

interface LinkProps extends LinkItem {
  sx?: SxProps<Theme>;
}

export type LinkComponentProp = React.FC<LinkProps>;

interface IconTabsProps {
  activeTab?: number;
  tabs: IconTabProps[];
  size?: TextSize;
  linkComponent?: LinkComponentProp;
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
  mobileFullWidth?: boolean;
}

const StyledTabs = styled(Tabs, {
  shouldForwardProp: prop =>
    prop !== 'hideIndicator' && prop !== 'mobileFullWidth',
})<TabsProps & { mobileFullWidth: boolean; hideIndicator: boolean }>(
  ({ mobileFullWidth, theme, hideIndicator }) => ({
    '& .MuiTabs-flexContainer': {
      display: 'block',
    },
    '& .MuiTabs-scroller': {
      [theme.breakpoints.down('md')]: {
        paddingLeft: mobileFullWidth ? theme.spacing(10) : 0,
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: mobileFullWidth ? theme.spacing(4) : 0,
      },
    },
    '& .MuiTabs-indicator': {
      display: hideIndicator && 'none',
      backgroundColor: theme.palette.secondary.main,
      height: '3px',
    },
  }),
);

const IconTabs: React.FC<React.PropsWithChildren<IconTabsProps>> = ({
  activeTab = 0,
  tabs,
  size,
  sxs,
  linkComponent,
  hideIndicator = false,
  mobileFullWidth = false,
}) => {
  const [value, setValue] = useState(activeTab);
  const hasContent = tabs.some(tab => tab.content !== undefined);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(activeTab);
  }, [activeTab]);

  return (
    <div>
      <Box
        sx={{
          ...sxs?.tab?.outer,
          mx: mobileFullWidth ? { xs: -4, sm: -10, md: 0 } : 0,
        }}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="tabs"
          hideIndicator={hideIndicator}
          mobileFullWidth={mobileFullWidth}
        >
          {tabs.map((tab, index) => (
            <IconTab
              key={`tab-${index}`}
              label={tab.label}
              icon={tab?.icon}
              hidden={tab?.hidden}
              size={size}
              href={tab.href}
              linkComponent={linkComponent}
              sxInner={{ ...sxs?.tab?.inner }}
              {...a11yProps(index)}
            />
          ))}
        </StyledTabs>
      </Box>
      {hasContent &&
        tabs.map((tab, index) => (
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
