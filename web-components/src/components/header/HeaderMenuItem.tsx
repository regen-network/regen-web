import React from 'react';
import clsx from 'clsx';
import { makeStyles, MenuItem, useTheme } from '@material-ui/core';

import MenuHover from '../menu-hover';
import { NavLink } from './NavLink';
import { HeaderMenuItem } from '.';
import { HeaderDropdownColumn } from './HeaderDropdownItems';

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

const HeaderMenuItem: React.FC<{
  item: HeaderMenuItem;
  pathName: string;
  color: string;
  linkComponent?: React.ReactNode;
}> = ({ item, pathName, color }) => {
  const theme = useTheme();
  const styles = useStyles();

  const Content: React.FC = () => {
    if (item.href && !item.dropdownItems && !item.render) {
      return <NavLink href={item.href}>{item.title}</NavLink>;
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
        {item.dropdownItems && !item.render && <HeaderDropdownColumn items={item.dropdownItems} />}
        {item.render && item.render()}
      </MenuHover>
    );
  };

  return (
    <MenuItem
      className={pathName === item.href ? clsx(styles.menuItem, styles.currentMenuItem) : styles.menuItem}
    >
      <Content />
    </MenuItem>
  );
};

export { HeaderMenuItem };
