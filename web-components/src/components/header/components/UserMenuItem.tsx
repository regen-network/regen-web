import React from 'react';
import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import { Label } from '../../typography';
import { HeaderDropdownItemProps } from './HeaderDropdownItems';
import {
  HeaderMenuHover,
  HeaderMenuHoverBase,
} from './HeaderMenuHover/HeaderMenuHover';

interface UserMenuItemProps extends HeaderMenuHoverBase {
  address: string;
  avatar: string;
  userMenuItems: HeaderDropdownItemProps[];
  disconnect: () => void;
}

const Separator = styled('hr')(({ theme }) => ({
  borderTop: 0,
  borderColor: theme.palette.grey[100],
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
}));

const UserMenuItem: React.FC<React.PropsWithChildren<UserMenuItemProps>> = ({
  address,
  avatar,
  disconnect,
  pathname,
  linkComponent,
  userMenuItems,
}) => {
  return (
    <HeaderMenuHover
      pathname={pathname}
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
            {address}
          </Box>
        ),
        dropdownItems: userMenuItems,
        extras: (
          <Box sx={{ mx: -3.5 }}>
            <Separator />
            <Label size="xs" onClick={disconnect} sx={{ cursor: 'pointer' }}>
              logout »
            </Label>
          </Box>
        ),
      }}
    />
  );
};

export { UserMenuItem };
