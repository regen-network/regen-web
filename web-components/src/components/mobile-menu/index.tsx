import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ReactHtmlParser from 'html-react-parser';

import { Center } from '../box';
import { Item } from '../header/components/HeaderMenuItem/HeaderMenuItem';
import { NavLinkProps } from '../header/components/NavLink';
import CloseIcon from '../icons/CloseIcon';
import HamburgerIcon from '../icons/HamburgerIcon';
import { useMobileMenuStyles } from './MobileMenu.styles';

type Props = {
  menuItems?: Item[];
  isRegistry?: boolean;
  pathname: string;
  extras?: JSX.Element;
  linkComponent: React.FC<React.PropsWithChildren<NavLinkProps>>;
  websiteExtras?: JSX.Element;
  isUserLoggedIn?: boolean;
};

const MobileMenu: React.FC<React.PropsWithChildren<Props>> = ({
  menuItems,
  pathname,
  isRegistry,
  extras,
  websiteExtras,
  linkComponent: Link,
  isUserLoggedIn,
}) => {
  const { classes: styles, cx } = useMobileMenuStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(open => !open);
  };
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
          className={cx(styles.hamburger, styles.icon)}
          onClick={handleToggle}
          onMouseLeave={handleClose}
          width="29px"
          height="22px"
          sx={{ ml: { xs: isUserLoggedIn ? 0 : 2, sm: 4 } }}
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
          className={cx(styles.close, styles.icon)}
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
                    ? cx(styles.menuItem, styles.currentMenuItem)
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
                                ? cx(styles.subMenuItem, styles.currentMenuItem)
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
                              {ReactHtmlParser(dropdownItem.label)}
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
            {websiteExtras && (
              <>
                <div className="my-30 px-20">
                  <div className="w-full bg-bc-neutral-500 h-1" />
                </div>
                <MenuItem className="px-20">{websiteExtras}</MenuItem>
              </>
            )}
          </div>
        </MenuList>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
