import React from 'react';
import cx from 'clsx';
import { makeStyles, useTheme } from '@mui/styles';
import { MenuItem } from '@mui/material';

import MenuHover, { MenuTitle } from '../menu-hover';
import { NavLinkProps } from './NavLink';
import {
  HeaderDropdownColumn,
  HeaderDropdownItemProps,
} from './HeaderDropdownItems';

const useStyles = makeStyles(theme => ({
  menuItem: {
    boxSizing: 'border-box',
    height: '100%',
    lineHeight: theme.spacing(6),
    paddingRight: theme.spacing(7.375),
    paddingLeft: theme.spacing(7.375),
    'background-color': 'inherit',
    '& > a': {
      borderBottom: '2px solid transparent',
      '&:hover': {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
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
  title: {
    fontSize: theme.spacing(3.25),
    letterSpacing: '1px',
    fontFamily: 'Muli',
    textTransform: 'uppercase',
  },
}));

// TODO I made this for the NCT page, but there were conflicts with master. Leaving to use for #856
// const NewIcon = styled('div')(({ theme }) => ({
//   position: 'absolute',
//   top: '-7px',
//   right: '-28px',
//   backgroundColor: '#3D7ACF', // not in theme
//   height: '10px',
//   width: '30px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: '1px',
//   borderRadius: '3px',
// }));

export interface HeaderMenuItem extends MenuTitle {
  href?: string;
  renderDropdownItems?: () => JSX.Element;
  dropdownItems?: HeaderDropdownItemProps[];
  extras?: JSX.Element;
}

export interface HeaderMenuHoverBase {
  pathname: string;
  color: string;
  linkComponent: React.FC<NavLinkProps>;
}

interface HeaderMenuHoverProps extends HeaderMenuHoverBase {
  item: HeaderMenuItem;
}

const HeaderMenuHover: React.FC<HeaderMenuHoverProps> = ({
  item,
  pathname,
  color,
  linkComponent: LinkComponent,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const Content: React.FC = () => {
    if (item.href && !item.dropdownItems && !item.renderDropdownItems) {
      return (
        <LinkComponent
          overrideClassname={styles.title}
          pathname={pathname}
          href={item.href}
        >
          {item.title}
        </LinkComponent>
      );
    }
    return (
      <MenuHover
        dropdownColor={
          color === theme.palette.primary.light
            ? theme.palette.secondary.main
            : theme.palette.secondary.contrastText
        }
        title={item.title}
        renderTitle={item.renderTitle}
        classes={{ title: styles.title }}
      >
        {/* `render` overrides default dropdown */}
        {item.dropdownItems && !item.renderDropdownItems && (
          <HeaderDropdownColumn
            items={item.dropdownItems}
            linkComponent={LinkComponent}
          />
        )}
        {item.renderDropdownItems && item.renderDropdownItems()}
        {item.extras}
      </MenuHover>
    );
  };

  return (
    <MenuItem
      className={cx(
        styles.menuItem,
        pathname === item.href && styles.currentMenuItem,
      )}
    >
      <Content />
    </MenuItem>
  );
};

export { HeaderMenuHover };
