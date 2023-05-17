import {
  HeaderMenuHover,
  HeaderMenuHoverProps,
} from './HeaderMenuHover/HeaderMenuHover';
import { useUserMenuItemStyles } from './UserMenuItem.styles';

interface UserMenuItemProps extends HeaderMenuHoverProps {}

const UserMenuItem: React.FC<React.PropsWithChildren<UserMenuItemProps>> = ({
  classes,
  ...props
}) => {
  const styles = useUserMenuItemStyles();

  return (
    <HeaderMenuHover
      classes={{ root: styles.userMenuItem, paper: classes?.paper }}
      component="div"
      {...props}
    />
  );
};

export { UserMenuItem };
