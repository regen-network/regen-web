import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Box, styled, SxProps } from '@mui/material';
import Tabs, { TabsProps } from '@mui/material/Tabs';

import type { Theme } from '../../theme/muiTheme';
import { ColorScheme } from '../../theme/theme.types';
import { LinkItem } from '../footer/footer-new';
import { TextSize } from '../typography/sizing';
import { a11yProps } from './';
import { IconTab, IconTabProps } from './IconTab';
import { TabPanel } from './TabPanel';

export interface LinkProps extends LinkItem, PropsWithChildren {
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
      innerContainer?: SxProps<Theme>;
      inner?: SxProps<Theme>;
    };
    panel?: {
      inner?: SxProps<Theme>;
    };
  };
  colorScheme?: ColorScheme;
  hideIndicator?: boolean;
  mobileFullWidth?: boolean;
  className?: string;
}

const StyledTabs = styled(Tabs, {
  shouldForwardProp: prop =>
    prop !== 'hideIndicator' && prop !== 'mobileFullWidth',
})<
  TabsProps & {
    mobileFullWidth: boolean;
    hideIndicator: boolean;
    colorScheme: ColorScheme;
  }
>(({ mobileFullWidth, colorScheme, theme, hideIndicator }) => ({
  '& .MuiTabs-flexContainer': {
    display: 'block',
  },
  '& .MuiTabs-scroller': {
    [theme.breakpoints.up('md')]: {
      marginLeft: mobileFullWidth ? theme.spacing(-3) : 0,
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: mobileFullWidth ? theme.spacing(7) : 0,
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: mobileFullWidth ? theme.spacing(1) : 0,
    },
  },
  '& .MuiTabs-indicator': {
    display: hideIndicator && 'none',
    backgroundColor:
      colorScheme === 'terrasos'
        ? theme.palette.warning.main
        : theme.palette.primary.main,
    height: '3px',
  },
}));

const IconTabs: React.FC<React.PropsWithChildren<IconTabsProps>> = ({
  activeTab = 0,
  tabs,
  size,
  sxs,
  linkComponent,
  colorScheme = 'regen',
  hideIndicator = false,
  mobileFullWidth = false,
  className,
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

  const filteredTabs = useMemo(() => tabs.filter(tab => !tab.hidden), [tabs]);

  return (
    <div className={className}>
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
          colorScheme={colorScheme}
        >
          {filteredTabs.map((tab, index) => (
            <IconTab
              key={`tab-${index}`}
              label={tab.label}
              icon={tab?.icon}
              size={size}
              href={tab.href}
              linkComponent={linkComponent}
              sxs={{
                innerContainer: sxs?.tab?.innerContainer,
                inner: sxs?.tab?.inner,
              }}
              {...a11yProps(index)}
            />
          ))}
        </StyledTabs>
      </Box>
      {hasContent &&
        filteredTabs.map((tab, index) => (
          <TabPanel
            key={index}
            value={value}
            index={index}
            hidden={value !== index}
            sxs={{ ...sxs?.panel }}
          >
            {tab.content}
          </TabPanel>
        ))}
    </div>
  );
};

export { IconTabs };
