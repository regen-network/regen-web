// src/components/organisms/DashboardNavigation/DashboardNavigation.Header.tsx
import React, { useState } from 'react';

import { CopyButton } from 'web-components/src/components/buttons/CopyButton';
import BreadcrumbIcon from 'web-components/src/components/icons/BreadcrumbIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Body } from 'web-components/src/components/typography/Body';
import { Subtitle } from 'web-components/src/components/typography/Subtitle';
import UserAvatar from 'web-components/src/components/user/UserAvatar';
import { cn } from 'web-components/src/utils/styles/cn';

import useClickOutside from '../../../utils/hooks/useClickOutside';
import { AccountSwitcherDropdown } from './DashboardNavigation.Dropdown';
import { DashboardNavHeaderData } from './DashboardNavigation.types';

export const DashboardNavHeader: React.FC<
  DashboardNavHeaderData & {
    collapsed?: boolean;
    onViewProfileClick?: (href: string) => void;
  }
> = ({
  activeAccount,
  accounts,
  onAccountSelect,
  collapsed = false,
  onViewProfileClick,
}) => {
  const { name, address, avatarSrc, type } = activeAccount;
  const short = `${address.slice(0, 9)}…${address.slice(-6)}`;
  const canSwitch = accounts.length > 1;

  const [open, setOpen] = useState(false);
  // useClickOutside will call setOpen(false) whenever
  // you click/touch outside the returned ref
  const rootRef = useClickOutside<HTMLDivElement>(() => {
    if (open) setOpen(false);
  });

  const profileHref =
    type === 'org'
      ? `/dashboard/org/${activeAccount.id}`
      : '/dashboard/profile';

  return (
    <div
      ref={rootRef}
      className={cn(
        'relative flex items-start',
        collapsed ? 'justify-center mb-[64px]' : 'gap-15 px-3 py-4 mb-[20px]',
      )}
    >
      <UserAvatar src={avatarSrc} alt={name} />

      {!collapsed && (
        <div className="flex flex-col">
          <button
            type="button"
            className={cn(
              'flex items-center gap-10 bg-transparent border-none pl-0',
              canSwitch ? 'cursor-pointer' : 'cursor-default',
            )}
            onClick={() => canSwitch && setOpen(o => !o)}
            aria-expanded={open}
            aria-haspopup="true"
          >
            <Subtitle className="text-[16px] text-bc-neutral-900 pt-5">
              {name}
            </Subtitle>
            {canSwitch && (
              <BreadcrumbIcon className="h-[15px] w-[15px] pt-5 text-bc-neutral-400" />
            )}
          </button>

          <div className="flex items-center gap-5">
            <Body className="text-neutral-400 font-medium text-[12px]">
              {short}
            </Body>
            <CopyButton
              content={address}
              tooltipText=""
              toastText="Copied!"
              iconClassName="h-[14px] w-[14px] hover:text-ac-success-400 hover:stroke-none text-sc-icon-standard-disabled"
            />
          </div>

          <button
            type="button"
            className="mt-[4px] mb-[4px] flex items-center gap-[4px] text-[12px] font-bold text-bc-neutral-400 bg-transparent border-none p-0 text-left cursor-pointer"
            onClick={() => onViewProfileClick?.(profileHref)}
          >
            <span
              style={{
                textDecoration: 'underline',
                textDecorationColor: '#8F8F8F',
                textUnderlineOffset: '1px',
              }}
            >
              View public profile
            </span>
            <SmallArrowIcon className="h-[12px] w-[12px]" />
          </button>
        </div>
      )}

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
