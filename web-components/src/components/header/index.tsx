import React, { useMemo } from 'react';
import { makeStyles, Theme, MenuItem, MenuList, Link, useTheme, useMediaQuery } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import cx from 'clsx';
import Box from '@material-ui/core/Box';

import MobileMenu from '../mobile-menu';
import ContainedButton from '../buttons/ContainedButton';
import { HeaderMenuHover, HeaderMenuItem } from './HeaderMenuHover';

import { NavLink, NavLinkProps } from './NavLink';
import { HeaderLogoLink } from './HeaderLogoLink';

export interface node {
  [key: number]: React.ReactNode;
}

export interface HeaderColors {
  [key: string]: string;
}

interface StyleProps {
  color: string;
  borderBottom?: boolean;
}

interface HeaderProps {
  absolute?: boolean;
  borderBottom?: boolean;
  color: string;
  fullWidth?: boolean;
  isAuthenticated?: boolean;
  menuItems?: HeaderMenuItem[];
  linkComponent?: React.FC<NavLinkProps>;
  homeLink?: React.FC<{ color: string }>;
  isRegistry?: boolean;
  onSignup?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
  pathName?: string;
  transparent?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => {
  const {
    typography: { pxToRem },
  } = theme;

  return {
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
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '110px',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2.5, 3.75),
        height: theme.spacing(15),
        color: theme.palette.primary.light,
        background: theme.palette.primary.main,
      },
      '& .MuiMenuItem-root > a, .MuiMenuItem-root > div > span': {
        fontSize: theme.spacing(3.25),
        letterSpacing: '1px',
      },
      '& ul > li > a, & ul > li > div > span': {
        color: props.color,
        textDecoration: 'none',
        fontFamily: 'Muli',
        textTransform: 'uppercase',
        '&:link, &:visited, &:hover, &:active': {
          textDecoration: 'none',
        },
      },
    }),
    menuList: {
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
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
    signUpBtn: {
      padding: theme.spacing(2, 7),
      fontSize: pxToRem(12),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2, 4),
        fontSize: pxToRem(9),
      },
    },
    loginBtn: props => ({
      textTransform: 'none',
      color: props.color,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    }),
  };
});

export default function Header({
  transparent,
  color,
  menuItems,
  isAuthenticated,
  onSignup,
  onLogin,
  onLogout,
  linkComponent = NavLink,
  homeLink: HomeLink = HeaderLogoLink,
  isRegistry = false,
  borderBottom = true,
  absolute = true,
  fullWidth = false,
  pathName = '/',
}: HeaderProps): JSX.Element {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const RegistryLoginBtns: React.FC = () => (
    <li>
      {isAuthenticated ? (
        <Button variant="text" className={styles.loginBtn} onClick={onLogout}>
          Logout
        </Button>
      ) : (
        <Box display="flex" flexWrap="nowrap" alignItems="center">
          <Button variant="text" className={styles.loginBtn} onClick={onLogin}>
            Login
          </Button>
          <ContainedButton size="small" className={styles.signUpBtn} onClick={onSignup}>
            Sign Up
          </ContainedButton>
        </Box>
      )}
    </li>
  );

  // useStyles seems to cache prop values, so this is to force re-render on prop
  // change (route change) - otherwise the border will render on pages it
  // shouldnt
  const styles = useMemo(() => useStyles({ color, borderBottom }), [color, borderBottom]);
  return (
    <div
      className={cx(
        styles.borderBottom,
        absolute && styles.absolute,
        transparent ? styles.transparent : styles.background,
      )}
    >
      <Container disableGutters={isTablet} maxWidth={fullWidth ? false : 'xl'}>
        <Box className={styles.header} px={[4, 5, 6]}>
          <HomeLink color={isTablet ? theme.palette.primary.contrastText : color} />
          {!isTablet && !!menuItems ? (
            <MenuList className={styles.menuList}>
              {menuItems.map((item, index) => {
                return (
                  <HeaderMenuHover
                    key={index}
                    linkComponent={linkComponent}
                    item={item}
                    color={color}
                    pathName={pathName}
                  />
                );
              })}
              {isRegistry && <RegistryLoginBtns />}
            </MenuList>
          ) : (
            <MobileMenu
              linkComponent={linkComponent}
              isRegistry={isRegistry}
              pathName={pathName}
              menuItems={menuItems}
              isAuthenticated={isAuthenticated}
              onLogin={onLogin}
              onLogout={onLogout}
              onSignup={onSignup}
            />
          )}
        </Box>
      </Container>
    </div>
  );
}
