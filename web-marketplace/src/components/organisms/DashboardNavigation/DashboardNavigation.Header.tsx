import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { CopyButton } from 'web-components/src/components/buttons/CopyButton';
import BreadcrumbIcon from 'web-components/src/components/icons/BreadcrumbIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Body } from 'web-components/src/components/typography/Body';
import { Subtitle } from 'web-components/src/components/typography/Subtitle';
import UserAvatar from 'web-components/src/components/user/UserAvatar';

import { AccountSwitcherDropdown } from './DashboardNavigation.Dropdown';
import { DashboardNavHeaderData } from './DashboardNavigation.types';

export const DashboardNavHeader: React.FC<DashboardNavHeaderData> = ({
  activeAccount,
  accounts,
  onAccountSelect,
}) => {
  const { name, address, avatarSrc, type } = activeAccount;
  const short = `${address.slice(0, 8)}…${address.slice(-5)}`;
  const canSwitch = accounts.length > 1;

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        open &&
        rootRef.current &&
        !rootRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const profileText =
    // eslint-disable-next-line lingui/no-unlocalized-strings
    type === 'org' ? 'View org profile' : 'View personal profile';
  const profileHref =
    type === 'org'
      ? `/dashboard/org/${activeAccount.id}`
      : '/dashboard/profile';

  return (
    <div
      ref={rootRef}
      className="relative flex items-start gap-15 px-3 py-4 mb-20"
    >
      <UserAvatar src={avatarSrc} size="project" alt={name} />

      <div className="flex flex-col">
        <button
          type="button"
          className="flex items-center gap-10 bg-transparent border-none cursor-pointer pl-0"
          onClick={() => canSwitch && setOpen(o => !o)}
        >
          <Subtitle className="text-[16px] text-bc-neutral-900 pt-5">
            {name}
          </Subtitle>
          {canSwitch && (
            <BreadcrumbIcon className="h-[15px] w-[15px] pt-5 text-bc-neutral-400" />
          )}
        </button>

        <div className="flex items-center">
          <Body className="text-neutral-600 font-medium text-[12px]">
            {short}
          </Body>
          <span className="inline-flex origin-center scale-[0.6]">
            <CopyButton content={address} tooltipText="" toastText="Copied!" />
          </span>
        </div>

        <Link
          to={profileHref}
          style={{
            textDecoration: 'underline',
            color: '#8F8F8F',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {profileText}
          <SmallArrowIcon className="h-12 w-12" />
        </Link>
      </div>

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
