import React from 'react';
import cx from 'clsx';
import { makeStyles, useTheme } from '@mui/styles';
import { Box, MenuItem, styled } from '@mui/material';

import MenuHover from '../menu-hover';
import { NavLinkProps } from './NavLink';
import {
  HeaderDropdownColumn,
  HeaderDropdownItemProps,
} from './HeaderDropdownItems';
import { Label } from '../label';

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
}));

const NewIcon = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '-7px',
  right: '-28px',
  backgroundColor: '#3D7ACF', // not in theme
  height: '10px',
  width: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1px',
  borderRadius: '3px',
}));

export interface HeaderMenuItem {
  title: string;
  href?: string;
  render?: () => JSX.Element;
  isNew?: boolean;
  dropdownItems?: HeaderDropdownItemProps[];
}

const HeaderMenuHover: React.FC<{
  item: HeaderMenuItem;
  pathName: string;
  color: string;
  isNew?: boolean;
  linkComponent: React.FC<NavLinkProps>;
}> = ({ item, linkComponent: LinkComponent, ...props }) => {
  const theme = useTheme();
  const styles = useStyles();

  const Content: React.FC = () => {
    if (item.href && !item.dropdownItems && !item.render) {
      return (
        <LinkComponent href={item.href}>
          <Box component="span" sx={{ position: 'relative' }}>
            {item.title}
            {props.isNew && (
              <NewIcon>
                <Label sx={{ fontSize: { xs: 8 }, color: 'primary.main' }}>
                  NEW
                </Label>
              </NewIcon>
            )}
          </Box>
        </LinkComponent>
      );
    }
    return (
      <MenuHover
        dropdownColor={
          props.color === theme.palette.primary.light
            ? theme.palette.secondary.main
            : theme.palette.secondary.contrastText
        }
        text={item.title}
      >
        {/* `render` overrides default dropdown */}
        {item.dropdownItems && !item.render && (
          <HeaderDropdownColumn
            items={item.dropdownItems}
            linkComponent={LinkComponent}
          />
        )}
        {item.render && item.render()}
      </MenuHover>
    );
  };

  return (
    <MenuItem
      className={cx(
        styles.menuItem,
        props.pathName === item.href && styles.currentMenuItem,
      )}
    >
      <Content />
    </MenuItem>
  );
};

export { HeaderMenuHover };
