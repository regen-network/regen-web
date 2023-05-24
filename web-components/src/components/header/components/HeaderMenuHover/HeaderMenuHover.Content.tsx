import { useTheme } from '@mui/styles';

import MenuHover from '../../../menu-hover';
import { HeaderDropdownColumn } from '../HeaderDropdownItems';
import { NavLinkProps } from '../NavLink';
import { HeaderMenuItem } from './HeaderMenuHover';
import { useHeaderMenuHoverStyles } from './HeaderMenuHover.styles';

type Props = {
  item: HeaderMenuItem;
  linkComponent: React.FC<React.PropsWithChildren<NavLinkProps>>;
  pathname: string;
  classes?: {
    paper?: string;
  };
};

export const HeaderMenuHoverContent = ({
  item,
  linkComponent: LinkComponent,
  pathname,
  classes,
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
    <MenuHover
      dropdownColor={theme.palette.secondary.contrastText}
      title={item.title}
      renderTitle={item.renderTitle}
      classes={{ title: styles.title, paper: classes?.paper }}
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
