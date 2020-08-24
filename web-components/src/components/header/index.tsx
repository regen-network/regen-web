import React from 'react';
import { makeStyles, Theme, MenuItem, MenuList, Link, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';

import RegenIcon from '../icons/RegenIcon';
import MenuHover from '../menu-hover';
import MobileMenu from '../mobile-menu';

export interface node {
  [key: number]: React.ReactNode;
}

interface StyleProps {
  color: string;
  borderBottom?: boolean;
}

interface HeaderProps {
  children?: any;
  transparent?: boolean;
  absolute?: boolean;
  color: string;
  menuItems?: HeaderMenuItem[];
  borderBottom?: boolean;
  pathname?: string;
}

export interface HeaderMenuItem {
  title: string;
  href?: string;
  dropdownItems?: { title: string; href: string }[];
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  absolute: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      width: '100%',
    },
  },
  borderBottom: props => ({
    borderBottom: props.borderBottom ? `1px ${theme.palette.grey[100]} solid` : 'none',
  }),
  header: props => ({
    color: props.color,
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    position: 'relative',
    zIndex: 10,
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(2.5)} 0 ${theme.spacing(2.5)} ${theme.spacing(12)}`,
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(27.5),
      '& a > svg': {
        fontSize: '12rem',
        height: theme.spacing(20.75),
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(2.5)} ${theme.spacing(10)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(2.5)} ${theme.spacing(3.75)}`,
      height: theme.spacing(15),
      color: theme.palette.primary.light,
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    '& .MuiMenuItem-root > a, .MuiMenuItem-root > div > span': {
      fontSize: theme.spacing(3.25),
      letterSpacing: '1px',
    },
    '& ul > li > a, & ul > li > div > span': {
      color: props.color,
      [theme.breakpoints.down('xs')]: {
        color: theme.palette.primary.light,
      },
      textDecoration: 'none',
      fontFamily: 'Muli',
      textTransform: 'uppercase',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  }),
  mobile: {
    [theme.breakpoints.down('xs')]: {
      display: 'inline-block',
      padding: theme.spacing(1),
      'align-items': 'unset',
    },
  },
  logoItem: {
    [theme.breakpoints.down('xs')]: {},
  },
  menuList: props => ({
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      paddingTop: theme.spacing(6.5),
    },
    '& li.MuiListItem-button, li.MuiListItem-button > div': {
      '& span:hover, svg:hover, path:hover': {
        borderBottom: 'none',
      },
      'background-color': 'inherit',
      'text-decoration': 'none',
    },
    position: 'unset',
    width: 'unset',
    zIndex: 0,
  }),
  background: {
    backgroundColor: theme.palette.primary.main,
  },
  transparent: {
    backgroundColor: `rgba(0,0,0,0)`,
  },
  searchIcon: {
    color: theme.palette.grey[100],
    marginRight: theme.spacing(6.25),
    marginBottom: theme.spacing(1),
  },
  menuIcon: {
    color: theme.palette.primary.contrastText,
  },
  regenIcon: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(20.75),
      width: theme.spacing(46.5),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(10.25),
      width: theme.spacing(23),
    },
  },
  menuItem: {
    boxSizing: 'border-box',
    height: '100%',
    lineHeight: theme.spacing(6),
    paddingRight: theme.spacing(7.375),
    paddingLeft: theme.spacing(7.375),
    'background-color': 'inherit',
    '&:not(:last-child) > a:hover': {
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
  menu: {
    height: '100%',
    lineHeight: theme.spacing(6),
  },
}));

export default function Header({
  children,
  transparent,
  color,
  menuItems,
  borderBottom = true,
  absolute = true,
  pathname = '/',
}: HeaderProps): JSX.Element {
  const classes = useStyles({ color, borderBottom });

  const rootClass = [classes.borderBottom];
  rootClass.push(transparent ? classes.transparent : classes.background);
  rootClass.push(absolute ? classes.absolute : '');

  const theme = useTheme();

  return (
    <div className={clsx(rootClass)}>
      <Grid
        className={clsx(classes.header)}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid className={classes.logoItem} item>
          <a href="/">
            <Box display={{ xs: 'none', sm: 'block' }}>
              <RegenIcon className={classes.regenIcon} color={color} />
            </Box>
            <Box display={{ xs: 'block', sm: 'none' }}>
              <RegenIcon className={classes.regenIcon} color={theme.palette.primary.contrastText} />
            </Box>
          </a>
        </Grid>
        <Grid className={classes.menu} item>
          <Box display={{ xs: 'none', sm: 'block' }}>
            <MenuList className={classes.menuList}>
              {menuItems?.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    className={
                      pathname === item.href
                        ? clsx(classes.menuItem, classes.currentMenuItem)
                        : classes.menuItem
                    }
                  >
                    {item.dropdownItems ? (
                      <MenuHover
                        dropdownColor={
                          color === theme.palette.primary.light
                            ? theme.palette.secondary.main
                            : theme.palette.secondary.contrastText
                        }
                        text={item.title}
                      >
                        {item.dropdownItems.map((dropdownItem, index) => {
                          return (
                            <MenuItem key={index}>
                              <Link href={dropdownItem.href}>{dropdownItem.title}</Link>
                            </MenuItem>
                          );
                        })}
                      </MenuHover>
                    ) : (
                      <Link href={item.href}>{item.title}</Link>
                    )}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Box>
          <Box display={{ xs: 'block', sm: 'none' }}>
            <MobileMenu menuItems={menuItems} className={classes.mobile} />
          </Box>
        </Grid>
        {children}
        {/*<Grid item alignItems="center">
          <SearchIcon className={classes.searchIcon} />
          <MenuIcon className={classes.menuIcon} fontSize="large" />
        </Grid>*/}
      </Grid>
    </div>
  );
}
