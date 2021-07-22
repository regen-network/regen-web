import React from 'react';
import { makeStyles, Theme, MenuItem, MenuList, Link, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';

import RegenIcon from '../icons/RegenIcon';
import RegistryIcon from '../icons/RegistryIcon';
import MenuHover from '../menu-hover';
import MobileMenu from '../mobile-menu';
import ContainedButton from '../buttons/ContainedButton';
import { HeaderMenuItem } from '.';

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
  subMenuHover: {
    '& a:hover': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
    '& a': {
      borderBottom: `2px solid transparent`,
    },
  },
  currentMenuItem: {
    '& > a': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
}));

const HeaderItem: React.FC<{ item: HeaderMenuItem; pathName: string; color: string }> = ({
  item,
  pathName,
  color,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const Content: React.FC = () => {
    if (!item.dropdownItems && !item.render) {
      return <Link href={item.href}>{item.title}</Link>;
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
        {item.dropdownItems &&
          item.dropdownItems.map((dropdownItem, index) => (
            <MenuItem
              className={
                pathName.includes(dropdownItem.href)
                  ? clsx(styles.subMenuHover, styles.currentMenuItem)
                  : styles.subMenuHover
              }
              key={index}
            >
              <Link href={dropdownItem.href}>{dropdownItem.title}</Link>
            </MenuItem>
          ))}
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

export { HeaderItem };
