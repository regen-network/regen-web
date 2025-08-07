import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Box, styled, SxProps } from '@mui/material';
import Tabs, { TabsProps } from '@mui/material/Tabs';

import type { Theme } from '../../theme/muiTheme';
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
  /**
   * Index of the currently active tab (0-based).
   * If not provided, the component may manage its own active state.
   */
  activeTab?: number;

  /**
   * Array of tab definitions, each containing properties for an individual tab.
   */
  tabs: IconTabProps[];

  /**
   * Text size to apply to the tab labels (e.g., "sm", "md", "lg").
   */
  size?: TextSize;

  /**
   * Custom component to be used for rendering links inside the tabs,
   * useful for integrating with routing libraries like Next.js or React Router.
   */
  linkComponent?: LinkComponentProp;

  /**
   * Optional style overrides using the `sx` prop for customization.
   */
  sxs?: {
    tab?: {
      /** Styles applied to the outer container of each tab */
      outer?: SxProps<Theme>;

      /** Styles applied to the container inside the outer tab wrapper */
      innerContainer?: SxProps<Theme>;

      /** Styles applied to the actual tab element (e.g., button or link) */
      inner?: SxProps<Theme>;
    };

    panel?: {
      /** Styles applied to the panel content container */
      inner?: SxProps<Theme>;
    };
  };

  /**
   * If true and there's only one tab with hidden set to false, hides the underline for the active tab.
   */
  hideIndicator?: boolean;

  /**
   * If true, makes the tabs span the full width on mobile devices.
   */
  mobileFullWidth?: boolean;

  /**
   * Additional class name to apply to the root component.
   */
  className?: string;

  /**
   * Additional class name to apply specifically to the outer tab container.
   */
  tabOuterClassName?: string;
}

const StyledTabs = styled(Tabs, {
  shouldForwardProp: prop =>
    prop !== 'hideIndicator' && prop !== 'mobileFullWidth',
})<
  TabsProps & {
    mobileFullWidth: boolean;
    hideIndicator: boolean;
  }
>(({ mobileFullWidth, theme, hideIndicator }) => ({
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
    backgroundColor: 'rgba(var(--sc-tabs-tab-underline) / 1)',
    height: '3px',
  },
}));

const IconTabs: React.FC<React.PropsWithChildren<IconTabsProps>> = ({
  activeTab = 0,
  tabs,
  size,
  sxs,
  linkComponent,
  hideIndicator = false,
  mobileFullWidth = false,
  className,
  tabOuterClassName,
}) => {
  const [value, setValue] = useState(activeTab);

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
  const hasContent = useMemo(
    () => filteredTabs.some(tab => tab.content !== undefined),
    [filteredTabs],
  );

  return (
    <div className={className}>
      <Box
        sx={{
          ...sxs?.tab?.outer,
          mx: mobileFullWidth ? { xs: -4, sm: -10, md: 0 } : 0,
        }}
        className={tabOuterClassName}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="tabs"
          hideIndicator={hideIndicator && filteredTabs.length === 1}
          mobileFullWidth={mobileFullWidth}
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
