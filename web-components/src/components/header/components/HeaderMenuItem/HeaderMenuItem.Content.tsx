import { useTheme } from '@mui/material';

import { HeaderDropdown } from '../HeaderDropdown/HeaderDropdown';
import { NavLinkProps } from '../NavLink';
import { Item } from './HeaderMenuItem';
import HeaderMenuItemHover from './HeaderMenuItem.Hover';
import { useHeaderMenuHoverStyles } from './HeaderMenuItem.styles';

type Props = {
  item: Item;
  linkComponent: React.ElementType<NavLinkProps>;
  pathname: string;
  classes?: {
    paper?: string;
  };
  isUserMenu?: boolean;
};

export const HeaderMenuItemContent = ({
  item,
  linkComponent: LinkComponent,
  pathname,
  classes,
  isUserMenu,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { classes: styles } = useHeaderMenuHoverStyles();

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
    <HeaderMenuItemHover
      dropdownColor={theme.palette.secondary.contrastText}
      title={item.title}
      renderTitle={item.renderTitle}
      classes={{ title: styles.title, paper: classes?.paper }}
      isUserMenu={isUserMenu}
    >
      {/* `render` overrides default dropdown */}
      {item.dropdownItems && !item.renderDropdownItems && (
        <HeaderDropdown
          items={item.dropdownItems}
          linkComponent={LinkComponent}
          isUserMenu={isUserMenu}
        />
      )}
      {item.renderDropdownItems && item.renderDropdownItems()}
      {item.extras}
    </HeaderMenuItemHover>
  );
};
