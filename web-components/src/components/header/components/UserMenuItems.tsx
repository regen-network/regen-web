import React from 'react';
import Box from '@mui/material/Box';

import OutlinedButton from '../../buttons/OutlinedButton';
import UserMenuIcon from '../../icons/UserMenuIcon';
import { Subtitle } from '../../typography';
import UserAvatar from '../../user/UserAvatar';
import { HeaderDropdownItemProps } from './HeaderDropdownItems';
import { HeaderMenuHoverBase } from './HeaderMenuHover/HeaderMenuHover';
import { UserMenuItem } from './UserMenuItem';
import {
  UserMenuItemProfile,
  UserMenuItemProfileProps,
} from './UserMenuItem.Profile';
import { OnProfileClickType } from './UserMenuItem.types';
import { useUserMenuItemsStyles } from './UserMenuItems.styles';

interface UserMenuItemsProps extends HeaderMenuHoverBase {
  address: string;
  avatar: string;
  userMenuItems: HeaderDropdownItemProps[];
  disconnect: () => void;
  profiles: UserMenuItemProfileProps[];
  addAddress?: () => Promise<void>;
  onProfileClick?: OnProfileClickType;
}

const UserMenuItems: React.FC<React.PropsWithChildren<UserMenuItemsProps>> = ({
  address,
  avatar,
  disconnect,
  pathname,
  linkComponent,
  userMenuItems,
  profiles,
  addAddress,
  onProfileClick,
}) => {
  const styles = useUserMenuItemsStyles();

  return (
    <>
      <UserMenuItem
        sx={{ mr: 2.5 }}
        classes={{ paper: styles.paper }}
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
          extras: (
            <Box>
              {profiles.map(p => (
                <UserMenuItemProfile {...p} onProfileClick={onProfileClick} />
              ))}
              {addAddress && (
                <OutlinedButton
                  onClick={addAddress}
                  sx={{ py: 12, px: { xs: 6.25, sm: 15 }, mb: 2.5 }}
                >
                  + add address
                </OutlinedButton>
              )}
              <Subtitle
                size="sm"
                color="info.dark"
                onClick={disconnect}
                sx={{ cursor: 'pointer' }}
              >
                Log out
              </Subtitle>
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
              <UserMenuIcon sx={{ color: 'info.dark' }} />
            </Box>
          ),
          dropdownItems: userMenuItems,
        }}
      />
    </>
  );
};

export { UserMenuItems };
