import { Theme } from '@mui/material';

import BridgeIcon from '../../icons/BridgeIcon';
import CreditsIcon from '../../icons/CreditsIcon';
import { HeaderDropdownItemProps } from './HeaderDropdown/HeaderDropdown.Item';
import { NavLinkProps } from './NavLink';

interface GetUserMenuItemsParams {
  pathname: string;
  linkComponent: React.FC<NavLinkProps>;
  theme: Theme;
}

export const getUserMenuItemsMock = ({
  linkComponent,
  pathname,
  theme,
}: GetUserMenuItemsParams): HeaderDropdownItemProps[] => [
  {
    pathname,
    linkComponent,
    title: 'My Portfolio',
    href: '/ecocredits/portfolio',
    icon: (
      <CreditsIcon
        sx={{ height: 18, width: 20 }}
        color={theme.palette.secondary.main}
      />
    ),
  },
  {
    pathname,
    linkComponent,
    title: 'Bridge',
    icon: <BridgeIcon />,
    href: '/ecocredits/bridge',
  },
];
