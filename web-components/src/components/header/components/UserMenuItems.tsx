import React from 'react';

import { Body } from '../../typography';
import UserAvatar from '../../user/UserAvatar';
import { HeaderDropdownItemProps } from './HeaderDropdown/HeaderDropdown.Item';
import { HeaderMenuItemBase } from './HeaderMenuItem/HeaderMenuItem';
import { UserMenuItem } from './UserMenuItem';
import { useUserMenuItemsStyles } from './UserMenuItems.styles';
import { LogOutIcon } from '../../icons/LogOutIcon';
import BreadcrumbIcon from '../../icons/BreadcrumbIcon';

interface UserMenuItemsProps extends HeaderMenuItemBase {
  nameOrAddress?: string | null;
  avatar: string;
  userMenuItems: HeaderDropdownItemProps[];
  disconnect: () => void;
}

const UserMenuItems: React.FC<React.PropsWithChildren<UserMenuItemsProps>> = ({
  nameOrAddress,
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
        classes={{ paper: 'pt-10 pb-15 px-0' }}
        pathname={pathname}
        linkComponent={linkComponent}
        item={{
          renderTitle: () => (
            <div className="flex justify-between items-center text-sm w-[164px] sm:w-[194px]">
              <div className="flex items-center">
                <UserAvatar
                  size="small"
                  sx={{
                    mr: 2.75,
                  }}
                  alt="default avatar"
                  src={avatar}
                />
                {nameOrAddress}
              </div>
              <BreadcrumbIcon className="w-[12px] h-[12px] text-grey-700" />
            </div>
          ),
          extras: (
            <div className="flex text-grey-400 cursor-pointer pl-20 py-[6px] items-center">
              <LogOutIcon />
              <Body
                size="sm"
                mobileSize="sm"
                onClick={disconnect}
                className="text-grey-400 pl-[18px]"
              >
                Log out
              </Body>
            </div>
          ),
          dropdownItems: userMenuItems,
        }}
      />
    </>
  );
};

export { UserMenuItems };
