import React from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import { MenuList, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import cx from 'clsx';
import Box from '@mui/material/Box';

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
  fullWidth: boolean;
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
  extras?: JSX.Element;
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
        width: '100vw',
      },
    },
    borderBottom: props => ({
      [theme.breakpoints.up('sm')]: {
        borderBottom: props.borderBottom
          ? `1px ${theme.palette.grey[100]} solid`
          : 'none',
      },
      [theme.breakpoints.down('sm')]: {
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
      [theme.breakpoints.up('md')]: {
        paddingRight: theme.spacing(6),
        paddingLeft: theme.spacing(6),
      },
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2.5, 3.75),
        height: theme.spacing(15),
        color: theme.palette.primary.light,
        background: theme.palette.primary.main,
      },
      '& ul > li > a, & ul > li > div > span': {
        color: props.color,
        textDecoration: 'none',
        paddingTop: theme.spacing(0.25),
        '&:link, &:visited, &:hover, &:active': {
          textDecoration: 'none',
        },
      },
    }),
    menuList: {
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
      '& li.MuiMenuItem-root': {
        // BEGIN HACK setting jss styles (duplicated from emotion style)
        // so it's initially rendered on gatsby build
        // Remove once migrations from mui jss to emotion and to latest gatsby done
        listStyle: 'none',
        // END HACK
      },
      '& li.MuiMenuItem-root, li.MuiMenuItem-root > div': {
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
      [theme.breakpoints.down('md')]: {
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
    // BEGIN HACK setting jss styles (duplicated from mui components built-in emotion styles)
    // so it's initially rendered on gatsby build
    // Remove once migrations from mui jss to emotion and to latest gatsby done
    desktop: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    mobile: {
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
      [theme.breakpoints.up('xl')]: {
        maxWidth: theme.breakpoints.values['xl'],
      },
    },
    // END HACK
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
  extras,
}: HeaderProps): JSX.Element {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
          <ContainedButton
            size="small"
            className={styles.signUpBtn}
            onClick={onSignup}
          >
            Sign Up
          </ContainedButton>
        </Box>
      )}
    </li>
  );

  const styles = useStyles({ color, borderBottom, fullWidth });
  return (
    <div
      className={cx(
        styles.borderBottom,
        absolute && styles.absolute,
        transparent ? styles.transparent : styles.background,
      )}
    >
      <Container
        disableGutters
        className={styles.container}
        maxWidth={fullWidth ? false : 'xl'}
      >
        <Box className={styles.header}>
          <HomeLink
            color={isTablet ? theme.palette.primary.contrastText : color}
          />
          <Box className={styles.desktop} display={{ xs: 'none', md: 'block' }}>
            <MenuList className={styles.menuList}>
              {menuItems?.map((item, index) => {
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
              {/* {isRegistry && <RegistryLoginBtns />} */}
              {isRegistry && extras}
            </MenuList>
          </Box>

          <Box className={styles.mobile} display={{ xs: 'block', md: 'none' }}>
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
          </Box>
        </Box>
      </Container>
    </div>
  );
}
