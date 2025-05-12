// src/components/organisms/DashboardNavigation/DashboardNavigation.Header.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { CopyButton } from 'web-components/src/components/buttons/CopyButton';
import BreadcrumbIcon from 'web-components/src/components/icons/BreadcrumbIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Body } from 'web-components/src/components/typography/Body';
import { Subtitle } from 'web-components/src/components/typography/Subtitle';
import UserAvatar from 'web-components/src/components/user/UserAvatar';
import clsx from 'clsx';

import { AccountSwitcherDropdown } from './DashboardNavigation.Dropdown';
import { DashboardNavHeaderData } from './DashboardNavigation.types';

export const DashboardNavHeader: React.FC<DashboardNavHeaderData & {
  collapsed?: boolean;
}> = ({
  activeAccount,
  accounts,
  onAccountSelect,
  collapsed = false
}) => {
  const { name, address, avatarSrc, type } = activeAccount;
  const short = `${address.slice(0, 8)}…${address.slice(-5)}`;
  const canSwitch = accounts.length > 1;

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        rootRef.current &&
        !rootRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const profileHref =
    type === 'org'
      ? `/dashboard/org/${activeAccount.id}`
      : '/dashboard/profile';

  return (
    <div
      ref={rootRef}
      className={clsx(
        "relative flex items-start",
        collapsed ? "justify-center mb-[64px]" : "gap-15 px-3 py-4 mb-[20px]"
      )}
    >
      <UserAvatar 
        src={avatarSrc} 
        alt={name} 
      />
      
      {/* Only show detail content when not collapsed */}
      {!collapsed && (
        <div className="flex flex-col">
          <button
            type="button"
            className={clsx(
              'flex items-center gap-10 bg-transparent border-none pl-0',
              canSwitch ? 'cursor-pointer' : 'cursor-default'
            )}
            onClick={() => canSwitch && setOpen(o => !o)}
          >
            <Subtitle className="text-[16px] text-bc-neutral-900 pt-5">
              {name}
            </Subtitle>
            {canSwitch && (
              <BreadcrumbIcon className="h-[15px] w-[15px] pt-5 text-bc-neutral-400" />
            )}
          </button>

          <div className="flex items-center gap-5">
            <Body className="text-neutral-600 font-medium text-[12px]">
              {short}
            </Body>
            <CopyButton
              content={address}
              tooltipText=""
              toastText="Copied!"
              size={20}
            />
          </div>

          <Link
            to={profileHref}
            className="mt-2 flex items-center gap-[3px] text-[12px] font-bold text-bc-neutral-400"
          >
            <span style={{ 
              textDecoration: 'underline', 
              textDecorationColor: '#8F959E',
              textUnderlineOffset: '2px'
            }}>
              View public profile
            </span>
            <SmallArrowIcon className="h-[12px] w-[12px]" />
          </Link>
        </div>
      )}

      {/* Account switcher dropdown */}
      {open && (
        <AccountSwitcherDropdown
          accounts={accounts}
          activeId={activeAccount.id}
          onSelect={id => {
            setOpen(false);
            if (id !== activeAccount.id) onAccountSelect?.(id);
          }}
        />
      )}
    </div>
  );
};

export default DashboardNavHeader;


