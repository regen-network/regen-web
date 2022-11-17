import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useTheme } from '@mui/styles';
import clsx from 'clsx';

import { Center } from '../box';
import { HeaderMenuItem } from '../header/components/HeaderMenuHover/HeaderMenuHover';
import { NavLinkProps } from '../header/components/NavLink';
import CloseIcon from '../icons/CloseIcon';
import HamburgerIcon from '../icons/HamburgerIcon';
import { useMobileMenuStyles } from './MobileMenu.styles';

type Props = {
  menuItems?: HeaderMenuItem[];
  isRegistry?: boolean;
  pathname: string;
  isAuthenticated?: boolean;
  linkComponent: React.FC<NavLinkProps>;
  extras?: JSX.Element;
  onSignup?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
};

const MobileMenu: React.FC<Props> = ({
  menuItems,
  pathname,
  isRegistry,
  extras,
  linkComponent: Link,
  ...props
}) => {
  const styles = useMobileMenuStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  // close drawer if route changes
  useEffect(() => {
    handleClose();
  }, [pathname]);

  return (
    <div className={styles.root}>
      <Center>
        {isRegistry && extras}
        <HamburgerIcon
          className={clsx(styles.hamburger, styles.icon)}
          onClick={handleOpen}
          width="29px"
          height="22px"
          sx={{ ml: 4 }}
        />
      </Center>
      <Drawer
        elevation={0}
        className={styles.drawer}
        anchor="right"
        open={open}
        onClose={handleClose}
      >
        <CloseIcon
          className={clsx(styles.close, styles.icon)}
          onClick={handleClose}
          svgColor={theme.palette.primary.main}
        />
        <MenuList className={styles.menuList}>
          <div>
            {menuItems?.map((item, i) => (
              <MenuItem
                key={i}
                className={
                  pathname === item.href
                    ? clsx(styles.menuItem, styles.currentMenuItem)
                    : styles.menuItem
                }
              >
                {item.dropdownItems ? (
                  <div>
                    <span className={styles.subMenuTitle}>{item.title}</span>
                    <MenuList>
                      {item.dropdownItems.map((dropdownItem, j) => {
                        const { svg: SVG, icon } = dropdownItem;
                        return (
                          <MenuItem
                            className={
                              pathname === dropdownItem.href
                                ? clsx(
                                    styles.subMenuItem,
                                    styles.currentMenuItem,
                                  )
                                : styles.subMenuItem
                            }
                            key={`${i}-${j}`}
                          >
                            {SVG && (
                              <Box mr={2}>
                                <SVG height={29} width={29} />
                              </Box>
                            )}
                            {icon && <Box mr={2}>{icon}</Box>}
                            <Link
                              href={dropdownItem.href}
                              overrideClassname=""
                              pathname={pathname}
                            >
                              {ReactHtmlParser(dropdownItem.title)}
                            </Link>
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </div>
                ) : (
                  <Link
                    overrideClassname=""
                    pathname={pathname}
                    href={item.href || ''}
                  >
                    {item.title}
                  </Link>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuList>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
