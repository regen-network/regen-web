import React from 'react';
import { styled, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import UserMenuIcon from '../../icons/UserMenuIcon';
import { Body } from '../../typography';
import UserAvatar from '../../user/UserAvatar';
import { HeaderDropdownItemProps } from './HeaderDropdownItems';
import { HeaderMenuHoverBase } from './HeaderMenuHover/HeaderMenuHover';
import { UserMenuItem } from './UserMenuItem';

interface UserMenuItemsProps extends HeaderMenuHoverBase {
  address: string;
  avatar: string;
  userMenuItems: HeaderDropdownItemProps[];
  disconnect: () => void;
}

const UserMenuItems: React.FC<React.PropsWithChildren<UserMenuItemsProps>> = ({
  address,
  avatar,
  disconnect,
  pathname,
  linkComponent,
  userMenuItems,
}) => {
  return (
    <>
      <UserMenuItem
        sx={{ mr: 2.5 }}
        pathname={pathname}
        linkComponent={linkComponent}
        item={{
          renderTitle: () => (
            <Box display="flex" alignItems="center" sx={{ fontSize: 14 }}>
              <UserAvatar
                size="small"
                sx={{
                  mr: 2.75,
                }}
                alt="default avatar"
                src={avatar}
              />
              {address}
            </Box>
          ),
          // dropdownItems: userMenuItems,
          extras: (
            <Box sx={{ mx: -3.5 }}>
              <Body size="xs" onClick={disconnect} sx={{ cursor: 'pointer' }}>
                Log out
              </Body>
            </Box>
          ),
        }}
      />
      <UserMenuItem
        pathname={pathname}
        linkComponent={linkComponent}
        item={{
          renderTitle: () => (
            <Box display="flex" alignItems="center">
              <UserMenuIcon />
            </Box>
          ),
          dropdownItems: userMenuItems,
        }}
      />
    </>
  );
};

export { UserMenuItems };
