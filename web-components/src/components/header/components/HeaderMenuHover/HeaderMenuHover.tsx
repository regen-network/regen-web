import React from 'react';
import { MenuItem, SxProps } from '@mui/material';
import cx from 'clsx';

import { Theme } from '../../../../theme/muiTheme';
import { sxToArray } from '../../../../utils/mui/sxToArray';
import { MenuTitle } from '../../../menu-hover';
import { HeaderDropdownItemProps } from '../HeaderDropdownItems';
import { NavLinkProps } from '../NavLink';
import { HeaderMenuHoverContent } from './HeaderMenuHover.Content';
import { useHeaderMenuHoverStyles } from './HeaderMenuHover.styles';

export interface HeaderMenuItem extends MenuTitle {
  href?: string;
  renderDropdownItems?: () => JSX.Element;
  dropdownItems?: HeaderDropdownItemProps[];
  extras?: JSX.Element;
}

export interface HeaderMenuHoverBase {
  pathname: string;
  linkComponent: React.FC<NavLinkProps>;
  classes?: {
    root?: string;
    paper?: string;
  };
  sx?: SxProps<Theme>;
  component?: React.ElementType;
}

export interface HeaderMenuHoverProps extends HeaderMenuHoverBase {
  item: HeaderMenuItem;
}

const HeaderMenuHover: React.FC<HeaderMenuHoverProps> = ({
  item,
  pathname,
  linkComponent,
  classes,
  sx,
  component = 'li',
}) => {
  const { classes: styles } = useHeaderMenuHoverStyles();

  return (
    <MenuItem
      className={cx(
        classes?.root,
        styles.menuItem,
        pathname === item.href && styles.currentMenuItem,
      )}
      sx={[...sxToArray(sx)]}
      component={component}
    >
      <HeaderMenuHoverContent
        item={item}
        linkComponent={linkComponent}
        pathname={pathname}
        classes={{ paper: classes?.paper }}
      />
    </MenuItem>
  );
};

export { HeaderMenuHover };
