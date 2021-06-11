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

export interface node {
  [key: number]: React.ReactNode;
}

export interface HeaderColors {
  [key: string]: string;
}

interface StyleProps {
  color: string;
  borderBottom?: boolean;
  fullWidth: boolean;
}

interface HeaderProps {
  absolute?: boolean;
  borderBottom?: boolean;
  children?: any;
  color: string;
  fullWidth?: boolean;
  isAuthenticated?: boolean;
  menuItems?: HeaderMenuItem[];
  isRegistry?: boolean; // TODO: We can remove this once we have the login buttons and rest of registry homepage live - can calculate from passed values (see below)
  onSignup?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
  pathName?: string;
  transparent?: boolean;
}

export interface HeaderMenuItem {
  title: string;
  href?: string;
  dropdownItems?: { title: string; href: string; render?: () => JSX.Element }[];
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  absolute: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      width: '100%',
    },
  },
  borderBottom: props => ({
    [theme.breakpoints.up('sm')]: {
      borderBottom: props.borderBottom ? `1px ${theme.palette.grey[100]} solid` : 'none',
    },
    [theme.breakpoints.down('xs')]: {
      borderBottom: `1px ${theme.palette.grey[100]} solid`,
    },
  }),
  header: props => ({
    color: props.color,
    maxWidth: props.fullWidth ? '100%' : theme.breakpoints.values.lg,
    margin: '0 auto',
    position: 'relative',
    zIndex: 10,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2.5, 0, 2.5, 12),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(27.5),
      '& a > svg': {
        fontSize: '12rem',
        height: theme.spacing(20.75),
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2.5, 10),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2.5, 3.75),
      height: theme.spacing(15),
      color: theme.palette.primary.light,
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: props.fullWidth ? theme.spacing(12.5) : theme.spacing(5),
      paddingLeft: props.fullWidth ? theme.spacing(12.5) : theme.spacing(5),
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
  menuList: {
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
    position: 'relative',
    width: 'unset',
    zIndex: 0,
  },
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
  registryIcon: {
    [theme.breakpoints.up('sm')]: {
      height: theme.typography.pxToRem(76),
      width: theme.typography.pxToRem(117),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(10.25),
      width: theme.spacing(23),
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
  menu: {
    height: '100%',
    lineHeight: theme.spacing(6),
  },
  signUpBtn: {
    fontSize: theme.typography.pxToRem(12),
    padding: theme.spacing(2, 7),
  },
  loginBtn: {
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

export default function Header({
  children,
  transparent,
  color,
  menuItems,
  isAuthenticated,
  onSignup,
  onLogin,
  onLogout,
  isRegistry = false,
  borderBottom = true,
  absolute = true,
  fullWidth = false,
  pathName = '/',
}: HeaderProps): JSX.Element {
  const styles = useStyles({ fullWidth, color, borderBottom });
  const rootClass = [styles.borderBottom];
  rootClass.push(transparent ? styles.transparent : styles.background);
  rootClass.push(absolute ? styles.absolute : '');

  const theme = useTheme();

  // const isRegistry = !!onLogin && !!onLogout && !!onSignup;
  const AppIcon = isRegistry ? RegistryIcon : RegenIcon;

  return (
    <div className={clsx(rootClass)}>
      <Grid className={styles.header} container direction="row" alignItems="center" justify="space-between">
        <Grid className={styles.logoItem} item>
          <a href="/">
            <Box display={{ xs: 'none', sm: 'block' }}>
              <AppIcon className={isRegistry ? styles.registryIcon : styles.regenIcon} color={color} />
            </Box>
            <Box display={{ xs: 'block', sm: 'none' }}>
              <AppIcon
                className={isRegistry ? styles.registryIcon : styles.regenIcon}
                color={theme.palette.primary.contrastText}
              />
            </Box>
          </a>
        </Grid>
        <Grid className={styles.menu} item>
          <Box display={{ xs: 'none', sm: 'flex' }}>
            <MenuList className={styles.menuList}>
              {menuItems?.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    className={
                      pathName === item.href ? clsx(styles.menuItem, styles.currentMenuItem) : styles.menuItem
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
                            <MenuItem
                              className={
                                pathName.includes(dropdownItem.href)
                                  ? clsx(styles.subMenuHover, styles.currentMenuItem)
                                  : styles.subMenuHover
                              }
                              key={index}
                            >
                              {dropdownItem.render ? (
                                dropdownItem.render()
                              ) : (
                                <Link href={dropdownItem.href}>{dropdownItem.title}</Link>
                              )}
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
              {/* {isRegistry && ( // TODO: This should be un-commented once registry homepage is live
                <li>
                  {isAuthenticated ? (
                    <Button variant="text" className={styles.loginBtn} onClick={onLogout}>
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Button variant="text" className={styles.loginBtn} onClick={onLogin}>
                        Login
                      </Button>
                      <ContainedButton size="small" className={styles.signUpBtn} onClick={onSignup}>
                        Sign Up
                      </ContainedButton>
                    </>
                  )}
                </li>
              )} */}
            </MenuList>
          </Box>
          <Box display={{ xs: 'block', sm: 'none' }}>
            <MobileMenu
              pathName={pathName}
              menuItems={menuItems}
              className={styles.mobile}
              isAuthenticated={isAuthenticated}
              onLogin={onLogin}
              onLogout={onLogout}
              onSignup={onSignup}
            />
          </Box>
        </Grid>
        {children}
      </Grid>
    </div>
  );
}
