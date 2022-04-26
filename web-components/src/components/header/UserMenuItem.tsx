import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material';

import MenuHover, { MenuTitle } from '../menu-hover';
import { HeaderMenuHover, HeaderMenuHoverBase } from './HeaderMenuHover';
import CreditsIcon from '../icons/CreditsIcon';

interface UserMenuItemProps extends HeaderMenuHoverBase {
  address: string;
  avatar: string;
}

const UserMenuItem: React.FC<UserMenuItemProps> = ({
  address,
  avatar,
  pathname,
  color,
  linkComponent,
}) => {
  const theme = useTheme();
  return (
    <HeaderMenuHover
      pathname={pathname}
      color={color}
      linkComponent={linkComponent}
      item={{
        renderTitle: () => (
          <Box display="flex" alignItems="center" sx={{ fontSize: 14 }}>
            <Avatar
              sx={{
                height: 24,
                width: 24,
                mr: 2.75,
                border: theme => `1px solid ${theme.palette.grey[100]}`,
              }}
              alt="default avatar"
              src={avatar}
            />
            {/* TODO hide address on mobile https://github.com/regen-network/regen-web/issues/786 */}
            {address}
          </Box>
        ),
        dropdownItems: [
          {
            pathname,
            linkComponent,
            title: 'My Portfolio',
            href: '/ecocredits/dashboard',
            icon: <CreditsIcon color={theme.palette.secondary.main} />,
          },
        ],
      }}
    />
  );
};

export { UserMenuItem };
