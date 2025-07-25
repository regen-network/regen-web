import React from 'react';

import BreadcrumbIcon from '../../icons/BreadcrumbIcon';
import { LogOutIcon } from '../../icons/LogOutIcon';
import { Body } from '../../typography';
import UserAvatar from '../../user/UserAvatar';
import { HeaderDropdownItemProps } from './HeaderDropdown/HeaderDropdown.Item';
import { HeaderMenuItemBase } from './HeaderMenuItem/HeaderMenuItem';
import { UserMenuItem } from './UserMenuItem';

interface UserMenuItemsProps extends HeaderMenuItemBase {
  nameOrAddress?: string | null;
  avatar: string;
  userMenuItems: HeaderDropdownItemProps[];
  logoutText: string;
  avatarAlt: string;
  disconnect: () => void;
}

const UserMenuItems: React.FC<React.PropsWithChildren<UserMenuItemsProps>> = ({
  nameOrAddress,
  avatar,
  avatarAlt,
  disconnect,
  logoutText,
  pathname,
  linkComponent,
  userMenuItems,
}) => {
  return (
    <UserMenuItem
      sx={{ mr: 2.5 }}
      classes={{ paper: 'pt-10 pb-15 px-0' }}
      pathname={pathname}
      linkComponent={linkComponent}
      item={{
        renderTitle: () => (
          <div className="flex justify-between items-center text-sm w-[164px] sm:w-[194px]">
            <div className="flex items-center truncate">
              <UserAvatar
                size="small"
                sx={{
                  mr: 2.75,
                }}
                alt={avatarAlt}
                src={avatar}
              />
              <span className="truncate">{nameOrAddress}</span>
            </div>
            <BreadcrumbIcon className="w-[12px] h-[12px] text-grey-700 mr-10" />
          </div>
        ),
        extras: (
          <div className="cursor-default flex text-grey-400 pl-20 py-[6px] items-center pb-20">
            <LogOutIcon linearGradient />
            <Body
              size="sm"
              mobileSize="sm"
              onClick={disconnect}
              className="cursor-pointer text-sc-text-sub-header pl-[14px] hover:underline hover:text-sc-text-header"
            >
              {logoutText}
            </Body>
          </div>
        ),
        dropdownItems: userMenuItems,
      }}
    />
  );
};

export { UserMenuItems };
