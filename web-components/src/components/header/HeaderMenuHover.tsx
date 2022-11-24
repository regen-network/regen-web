import React from 'react';
import { MenuItem, useTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import MenuHover, { MenuTitle } from '../menu-hover';
import {
  HeaderDropdownColumn,
  HeaderDropdownItemProps,
} from './components/HeaderDropdownItems';
import { NavLinkProps } from './components/NavLink';

const useStyles = makeStyles()(theme => ({
  menuItem: {
    boxSizing: 'border-box',
    height: '100%',
    lineHeight: theme.spacing(6),
    paddingRight: theme.spacing(7.375),
    paddingLeft: theme.spacing(7.375),
    backgroundColor: 'inherit',
    '& > a': {
      borderBottom: '2px solid transparent',
      '&:hover': {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(1.25),
      paddingLeft: theme.spacing(1.25),
    },
  },
  currentMenuItem: {
    '& > a': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  title: {
    fontSize: theme.spacing(3.25),
    letterSpacing: '1px',
    fontFamily: 'Muli',
    textTransform: 'uppercase',
  },
}));

export interface HeaderMenuItem extends MenuTitle {
  href?: string;
  renderDropdownItems?: () => JSX.Element;
  dropdownItems?: HeaderDropdownItemProps[];
  extras?: JSX.Element;
}

export interface HeaderMenuHoverBase {
  pathname: string;
  linkComponent: React.FC<React.PropsWithChildren<NavLinkProps>>;
}

interface HeaderMenuHoverProps extends HeaderMenuHoverBase {
  item: HeaderMenuItem;
}

const HeaderMenuHover: React.FC<React.PropsWithChildren<HeaderMenuHoverProps>> =
  ({ item, pathname, linkComponent: LinkComponent }) => {
    const theme = useTheme();
    const { classes: styles, cx } = useStyles();

    const Content: React.FC<React.PropsWithChildren<unknown>> = () => {
      if (item.href && !item.dropdownItems && !item.renderDropdownItems) {
        return (
          <LinkComponent
            overrideClassname={styles.title}
            pathname={pathname}
            href={item.href}
          >
            {item.title}
          </LinkComponent>
        );
      }
      return (
        <MenuHover
          dropdownColor={theme.palette.secondary.contrastText}
          title={item.title}
          renderTitle={item.renderTitle}
          classes={{ title: styles.title }}
        >
          {/* `render` overrides default dropdown */}
          {item.dropdownItems && !item.renderDropdownItems && (
            <HeaderDropdownColumn
              items={item.dropdownItems}
              linkComponent={LinkComponent}
            />
          )}
          {item.renderDropdownItems && item.renderDropdownItems()}
          {item.extras}
        </MenuHover>
      );
    };

    return (
      <MenuItem
        className={cx(
          styles.menuItem,
          pathname === item.href && styles.currentMenuItem,
        )}
      >
        <Content />
      </MenuItem>
    );
  };

export { HeaderMenuHover };
