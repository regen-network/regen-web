import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { useTheme, styled } from '@mui/material';

import { HeaderMenuHover, HeaderMenuHoverBase } from './HeaderMenuHover';
import CreditsIcon from '../icons/CreditsIcon';
import { Label } from '../typography';

interface UserMenuItemProps extends HeaderMenuHoverBase {
  address: string;
  avatar: string;
  disconnect: () => void;
}

const Separator = styled('hr')(({ theme }) => ({
  borderTop: 0,
  borderColor: theme.palette.grey[100],
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
}));

const UserMenuItem: React.FC<UserMenuItemProps> = ({
  address,
  avatar,
  disconnect,
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
          <Box
            display="flex"
            alignItems="center"
            sx={{ fontSize: 14, mt: { md: 0.5 } }}
          >
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
            icon: (
              <CreditsIcon
                sx={{ height: 18, width: 20 }}
                color={theme.palette.secondary.main}
              />
            ),
          },
        ],
        extras: (
          <Box sx={{ mx: -3.5 }}>
            <Separator />
            <Label size="xs" onClick={disconnect} sx={{ cursor: 'pointer' }}>
              disconnect »
            </Label>
          </Box>
        ),
      }}
    />
  );
};

export { UserMenuItem };
