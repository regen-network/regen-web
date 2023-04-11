import React from 'react';
import { MenuItem } from '@mui/material';
import cx from 'clsx';

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
}

interface HeaderMenuHoverProps extends HeaderMenuHoverBase {
  item: HeaderMenuItem;
}

const HeaderMenuHover: React.FC<HeaderMenuHoverProps> = ({
  item,
  pathname,
  linkComponent,
}) => {
  const { classes: styles } = useHeaderMenuHoverStyles();

  return (
    <MenuItem
      className={cx(
        styles.menuItem,
        pathname === item.href && styles.currentMenuItem,
      )}
    >
      <HeaderMenuHoverContent
        item={item}
        linkComponent={linkComponent}
        pathname={pathname}
      />
    </MenuItem>
  );
};

export { HeaderMenuHover };
