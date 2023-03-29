import React from 'react';
import { MenuList, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import MobileMenu from '../mobile-menu';
import { HeaderLogoLink } from './components/HeaderLogoLink';
import {
  HeaderMenuHover,
  HeaderMenuItem,
} from './components/HeaderMenuHover/HeaderMenuHover';
import { NavLink, NavLinkProps } from './components/NavLink';
import { useHeaderStyles } from './Header.styles';
import MarketplaceLaunchBanner from './MarketplaceLaunchBanner';

export interface node {
  [key: number]: React.ReactNode;
}

export interface HeaderColors {
  [key: string]: string;
}

interface HeaderProps {
  absolute?: boolean;
  borderBottom?: boolean;
  color: string;
  fullWidth?: boolean;
  menuItems?: HeaderMenuItem[];
  linkComponent?: React.FC<React.PropsWithChildren<NavLinkProps>>;
  homeLink?: React.FC<React.PropsWithChildren<{ color: string }>>;
  isRegistry?: boolean;
  extras?: JSX.Element;
  websiteExtras?: JSX.Element;
  pathname?: string;
  transparent?: boolean;
}

export default function Header({
  transparent,
  color,
  menuItems,
  linkComponent = NavLink,
  homeLink: HomeLink = HeaderLogoLink,
  isRegistry = false,
  borderBottom = true,
  absolute = true,
  fullWidth = false,
  pathname = '/',
  extras,
  websiteExtras,
}: HeaderProps): JSX.Element {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { classes: styles, cx } = useHeaderStyles({
    color,
    borderBottom,
    fullWidth,
  });

  // if we're in the registry, where we have REACT_APP prefixed
  // keys in the env vars, do not show the banner. in other words,
  // only show the banner on the website.
  const showBanner = Object.keys(process.env).reduce((prev, curr) => {
    if (curr.startsWith('REACT_APP')) {
      return false;
    } else {
      return prev;
    }
  }, true);

  return (
    <>
      {showBanner && <MarketplaceLaunchBanner />}
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
            <Box
              className={styles.desktop}
              display={{ xs: 'none', md: 'block' }}
            >
              <MenuList className={styles.menuList}>
                {menuItems?.map((item, index) => {
                  return (
                    <HeaderMenuHover
                      key={index}
                      linkComponent={linkComponent}
                      item={item}
                      pathname={pathname}
                    />
                  );
                })}
                {isRegistry && extras}
                {websiteExtras}
              </MenuList>
            </Box>
            <Box
              className={styles.mobile}
              display={{ xs: 'block', md: 'none' }}
            >
              <MobileMenu
                linkComponent={linkComponent}
                isRegistry={isRegistry}
                pathname={pathname}
                menuItems={menuItems}
                extras={extras}
                websiteExtras={websiteExtras}
              />
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}
