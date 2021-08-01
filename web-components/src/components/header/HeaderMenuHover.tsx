import React from 'react';
import cx from 'clsx';
import { makeStyles, MenuItem, useTheme } from '@material-ui/core';

import MenuHover from '../menu-hover';
import { NavLink, NavLinkProps } from './NavLink';
// import { HeaderMenuHover as HeaderMenuHover } from '.';
import { HeaderDropdownColumn, HeaderDropdownItemProps } from './HeaderDropdownItems';

const useStyles = makeStyles(theme => ({
  menuItem: {
    boxSizing: 'border-box',
    height: '100%',
    lineHeight: theme.spacing(6),
    paddingRight: theme.spacing(7.375),
    paddingLeft: theme.spacing(7.375),
    'background-color': 'inherit',
    '& a:hover': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
    '&:last-child': {
      paddingTop: theme.spacing(1.25),
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
}));

export interface HeaderMenuItem {
  title: string;
  href?: string;
  render?: () => JSX.Element;
  dropdownItems?: HeaderDropdownItemProps[];
}

const HeaderMenuHover: React.FC<{
  item: HeaderMenuItem;
  pathName: string;
  color: string;
  linkComponent?: React.FC<NavLinkProps>;
}> = ({ item, pathName, color, linkComponent: LinkComponent = NavLink }) => {
  const theme = useTheme();
  const styles = useStyles();

  const Content: React.FC = () => {
    if (item.href && !item.dropdownItems && !item.render) {
      return <LinkComponent href={item.href}>{item.title}</LinkComponent>;
    }
    return (
      <MenuHover
        dropdownColor={
          color === theme.palette.primary.light
            ? theme.palette.secondary.main
            : theme.palette.secondary.contrastText
        }
        text={item.title}
      >
        {/* `render` overrides default dropdown */}
        {item.dropdownItems && !item.render && (
          <HeaderDropdownColumn items={item.dropdownItems} linkComponent={LinkComponent} />
        )}
        {item.render && item.render()}
      </MenuHover>
    );
  };

  return (
    <MenuItem className={cx(styles.menuItem, pathName === item.href && styles.currentMenuItem)}>
      <Content />
    </MenuItem>
  );
};

export { HeaderMenuHover };
