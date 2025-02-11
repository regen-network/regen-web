import {
  BoxProps,
  MenuItem,
  SxProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import cx from 'clsx';

import { Theme } from '../../../../theme/muiTheme';
import { sxToArray } from '../../../../utils/mui/sxToArray';
import { HeaderDropdownItemProps } from '../HeaderDropdown/HeaderDropdown.Item';
import { NavLinkProps } from '../NavLink';
import { HeaderMenuItemContent } from './HeaderMenuItem.Content';
import { MenuTitle } from './HeaderMenuItem.Hover';
import { useHeaderMenuHoverStyles } from './HeaderMenuItem.styles';

export interface Item extends MenuTitle {
  href?: string;
  renderDropdownItems?: () => JSX.Element;
  dropdownItems?: HeaderDropdownItemProps[];
  extras?: JSX.Element;
}

export interface HeaderMenuItemBase {
  pathname: string;
  linkComponent: React.FC<NavLinkProps>;
  classes?: {
    root?: string;
    paper?: string;
  };
  sx?: SxProps<Theme>;
  component?: BoxProps['component'];
}

export interface MenuItemProps extends HeaderMenuItemBase {
  item: Item;
  isUserMenu?: boolean;
}

const HeaderMenuItem: React.FC<MenuItemProps> = ({
  item,
  pathname,
  linkComponent,
  classes,
  sx,
  component = 'li',
  isUserMenu,
}) => {
  const { classes: styles } = useHeaderMenuHoverStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <MenuItem
      className={cx(
        classes?.root,
        styles.menuItem,
        pathname === item.href && styles.currentMenuItem,
        isTablet && !isUserMenu ? '!hidden' : '',
      )}
      sx={[...sxToArray(sx)]}
      component={component}
    >
      <HeaderMenuItemContent
        item={item}
        linkComponent={linkComponent}
        pathname={pathname}
        classes={{ paper: classes?.paper }}
        isUserMenu={isUserMenu}
      />
    </MenuItem>
  );
};

export { HeaderMenuItem };
