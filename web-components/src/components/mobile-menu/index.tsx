import React, { useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';

import HamburgerIcon from '../icons/HamburgerIcon';
import CloseIcon from '../icons/CloseIcon';
import { HeaderMenuItem } from '../header';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.primary.light,
      width: '85%',
    },
    '& .MuiBackdrop-root, & .MuiDrawer-paper': {
      top: theme.spacing(15),
    },
  },
  menuList: {
    paddingTop: theme.spacing(12.25),
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
}));

interface Props extends React.HTMLProps<HTMLDivElement> {
  menuItems?: HeaderMenuItem[];
}

const MobileMenu = ({ menuItems, className }: Props): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <div className={className}>
      <HamburgerIcon
        className={clsx(classes.hamburger, classes.icon)}
        onClick={handleOpen}
        width="29px"
        height="22px"
      />
      <Drawer elevation={0} className={classes.drawer} anchor="right" open={open} onClose={handleClose}>
        <CloseIcon
          className={clsx(classes.close, classes.icon)}
          onClick={handleClose}
          svgColor={theme.palette.primary.main}
        />
        <MenuList className={classes.menuList}>
          {menuItems?.map((item, i) => (
            <MenuItem key={i} className={classes.menuItem}>
              {item.dropdownItems ? (
                <>
                  <span className={classes.subMenuTitle}>{item.title}</span>
                  <MenuList>
                    {item.dropdownItems.map((dropdownItem, j) => (
                      <MenuItem className={classes.subMenuItem} key={`${i}-${j}`}>
                        <Link href={dropdownItem.href}>{dropdownItem.title}</Link>
                      </MenuItem>
                    ))}
                  </MenuList>
                </>
              ) : (
                <Link href={item.href}>{item.title}</Link>
              )}
            </MenuItem>
          ))}
        </MenuList>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
