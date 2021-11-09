import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Divider from '@material-ui/core/Divider';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

import HamburgerIcon from '../icons/HamburgerIcon';
// import ContainedButton from '../buttons/ContainedButton';
// import Button from '@material-ui/core/Button';
import CloseIcon from '../icons/CloseIcon';
import { HeaderMenuItem } from '../header/HeaderMenuHover';
import { NavLinkProps } from '../header/NavLink';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'inline-block',
    padding: theme.spacing(1),
    'align-items': 'unset',
  },
  drawer: {
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.primary.light,
      width: '85%',
      maxWidth: '350px',
    },
    '& .MuiBackdrop-root, & .MuiDrawer-paper': {
      top: theme.spacing(15),
    },
  },
  menuList: {
    paddingTop: theme.spacing(12.25),
    paddingBottom: theme.spacing(20),
  },
  menuItem: {
    display: 'block',
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.palette.primary.main,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: theme.spacing(3.25),
    lineHeight: theme.spacing(4),
    fontWeight: 800,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(5),
    minHeight: theme.spacing(9.75),
    '& a': {
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  subMenuItem: {
    fontSize: theme.spacing(2.75),
    lineHeight: theme.spacing(3.5),
    fontWeight: 800,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(6),
    minHeight: theme.spacing(9),
  },
  icon: {
    cursor: 'pointer',
  },
  subMenuTitle: {
    color: theme.palette.info.main,
  },
  hamburger: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
  },
  close: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 1,
  },
  currentMenuItem: {
    '& > a': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  loginBtns: {
    marginLeft: theme.spacing(4),
  },
  signUpBtn: {
    fontSize: theme.typography.pxToRem(12),
    padding: theme.spacing(2, 7),
  },
  loginBtn: {
    textTransform: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  divider: {
    backgroundColor: theme.palette.info.main,
    width: '85%',
    margin: '0 auto',
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(4),
  },
}));

type Props = {
  menuItems?: HeaderMenuItem[];
  isRegistry?: boolean;
  pathName?: string;
  isAuthenticated?: boolean;
  linkComponent: React.FC<NavLinkProps>;
  onSignup?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
};

const MobileMenu: React.FC<Props> = ({
  menuItems,
  pathName,
  linkComponent: Link,
  ...props
}) => {
  const styles = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  // close drawer if route changes
  useEffect(() => {
    handleClose();
  }, [pathName]);

  return (
    <div className={styles.root}>
      <HamburgerIcon
        className={clsx(styles.hamburger, styles.icon)}
        onClick={handleOpen}
        width="29px"
        height="22px"
      />
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
                  pathName === item.href
                    ? clsx(styles.menuItem, styles.currentMenuItem)
                    : styles.menuItem
                }
              >
                {item.dropdownItems ? (
                  <div>
                    <span className={styles.subMenuTitle}>{item.title}</span>
                    <MenuList>
                      {item.dropdownItems.map((dropdownItem, j) => {
                        const { svg: SVG } = dropdownItem;
                        return (
                          <MenuItem
                            className={
                              pathName === dropdownItem.href
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
                            <Link href={dropdownItem.href} overrideClassname="">
                              {ReactHtmlParser(dropdownItem.title)}
                            </Link>
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </div>
                ) : (
                  <Link overrideClassname="" href={item.href || ''}>
                    {item.title}
                  </Link>
                )}
              </MenuItem>
            ))}
            {/* {props.isRegistry && (
              <>
                <Divider light className={styles.divider} />
                <li className={styles.loginBtns}>
                  {props.isAuthenticated ? (
                    <Button variant="text" className={styles.loginBtn} onClick={props.onLogout}>
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Button variant="text" className={styles.loginBtn} onClick={props.onLogin}>
                        Login
                      </Button>
                      <ContainedButton size="small" className={styles.signUpBtn} onClick={props.onSignup}>
                        Sign Up
                      </ContainedButton>
                    </>
                  )}
                </li>
              </>
            )} */}
          </div>
        </MenuList>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
