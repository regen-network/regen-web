import {
  HeaderMenuHover,
  HeaderMenuHoverProps,
} from './HeaderMenuHover/HeaderMenuHover';
import { useUserMenuItemStyles } from './UserMenuItem.styles';

interface UserMenuItemProps extends HeaderMenuHoverProps {}

const UserMenuItem: React.FC<React.PropsWithChildren<UserMenuItemProps>> =
  props => {
    const styles = useUserMenuItemStyles();

    return <HeaderMenuHover className={styles.userMenuItem} {...props} />;
  };

export { UserMenuItem };
