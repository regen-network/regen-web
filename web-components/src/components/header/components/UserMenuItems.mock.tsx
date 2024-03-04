import BridgeIcon from '../../icons/BridgeIcon';
import CreditsIcon from '../../icons/CreditsIcon';
import { HeaderDropdownItemProps } from './HeaderDropdown/HeaderDropdown.Item';
import { NavLinkProps } from './NavLink';

interface GetUserMenuItemsParams {
  pathname: string;
  linkComponent: React.FC<NavLinkProps>;
}

export const getUserMenuItemsMock = ({
  linkComponent,
  pathname,
}: GetUserMenuItemsParams): HeaderDropdownItemProps[] => [
  {
    pathname,
    linkComponent,
    label: 'Portfolio',
    href: '/profile/portfolio',
    icon: <CreditsIcon sx={{ height: 18, width: 20 }} linearGradient />,
  },
  {
    pathname,
    linkComponent,
    label: 'Bridge',
    icon: <BridgeIcon linearGradient />,
    href: '/profile/bridge',
  },
];
