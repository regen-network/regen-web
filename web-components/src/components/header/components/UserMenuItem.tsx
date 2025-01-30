import { HeaderMenuItem, MenuItemProps } from './HeaderMenuItem/HeaderMenuItem';
import { useUserMenuItemStyles } from './UserMenuItem.styles';

interface UserMenuItemProps extends MenuItemProps {}

const UserMenuItem: React.FC<React.PropsWithChildren<UserMenuItemProps>> = ({
  classes,
  ...props
}) => {
  const styles = useUserMenuItemStyles();

  return (
    <HeaderMenuItem
      classes={{ root: styles.userMenuItem, paper: classes?.paper }}
      component="div"
      isUserMenu
      {...props}
    />
  );
};

export { UserMenuItem };
