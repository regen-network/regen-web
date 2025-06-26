import { useState } from 'react';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { getDefaultAvatar } from 'legacy-pages/Dashboard/Dashboard.utils';

import { CopyButton } from 'web-components/src/components/buttons/CopyButton';
import BreadcrumbIcon from 'web-components/src/components/icons/BreadcrumbIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Body } from 'web-components/src/components/typography/Body';
import { Subtitle } from 'web-components/src/components/typography/Subtitle';
import UserAvatar from 'web-components/src/components/user/UserAvatar';
import { cn } from 'web-components/src/utils/styles/cn';

import { AccountType } from 'generated/graphql';

import useClickOutside from '../../../utils/hooks/useClickOutside';
import { COPIED, UNNAMED } from './DashboardNavigation.constants';
import { AccountSwitcherDropdown } from './DashboardNavigation.Dropdown';
import { DashboardNavHeaderData } from './DashboardNavigation.types';

type Props = DashboardNavHeaderData & {
  collapsed?: boolean;
  onViewProfileClick?: (href: string) => void;
  hasWalletAddress?: boolean;
  wallet?: String;
};

export const DashboardNavHeader = ({
  activeAccount,
  accounts,
  onAccountSelect,
  collapsed = false,
  onViewProfileClick,
  hasWalletAddress = true,
  wallet,
}: Props) => {
  const { name, address, image, id } = activeAccount;

  const avatarSrc =
    image ||
    getDefaultAvatar({
      ...activeAccount,
      type:
        activeAccount.type === 'user'
          ? AccountType.User
          : AccountType.Organization,
    });

  const short = `${address.slice(0, 9)}…${address.slice(-6)}`;

  const canSwitch = accounts.length > 1;
  const { _ } = useLingui();

  const [open, setOpen] = useState(false);
  const rootRef = useClickOutside<HTMLDivElement>(() => {
    if (open) setOpen(false);
  });

  return (
    <div
      ref={rootRef}
      className={cn(
        'relative flex items-start',
        collapsed ? 'justify-center mb-[64px]' : 'gap-15 px-3 py-4 mb-20',
      )}
    >
      <UserAvatar src={avatarSrc} alt={name} size="md" />

      {!collapsed && (
        <div className="flex flex-col">
          <button
            type="button"
            className={cn(
              'flex items-center gap-10 bg-transparent border-none pl-0 py-5 md:pt-0',
              canSwitch ? 'cursor-pointer' : 'cursor-default',
            )}
            onClick={() => canSwitch && setOpen(o => !o)}
            aria-expanded={open}
            aria-haspopup="true"
          >
            <Subtitle className="text-bc-neutral-900 pt-5 text-[16px]">
              {name || _(UNNAMED)}
            </Subtitle>
            {canSwitch && (
              <BreadcrumbIcon className="h-[15px] w-[15px] pt-5 text-bc-neutral-400" />
            )}
          </button>

          <div className="group flex items-center gap-3">
            {hasWalletAddress ? (
              <CopyButton
                className="group/copy flex items-center gap-3"
                content={short}
                toastText={_(COPIED)}
                iconClassName="h-[14px] w-[14px] text-bc-neutral-500 group-hover:text-ac-success-400 hover:stroke-none text-sc-icon-standard-disabled"
                tooltipText={''}
              >
                <Body
                  size="xs"
                  className="text-sc-text-sub-header group-hover:text-sc-text-paragraph group-hover:underline group-hover/copy:text-sc-text-paragraph group-hover/copy:underline cursor-pointer"
                >
                  {short}
                </Body>
              </CopyButton>
            ) : (
              <Body size="xs" className="text-sc-text-sub-header">
                {address.length > 21 ? short : address}
              </Body>
            )}
          </div>

          <button
            type="button"
            className="mt-[4px] mb-[4px] flex items-center gap-[4px] text-[12px] bg-transparent border-none p-0 text-left cursor-pointer group hover:text-sc-text-paragraph"
            onClick={() => onViewProfileClick?.('/profiles/' + (wallet || id))}
          >
            <Subtitle className="underline text-[12px] text-bc-neutral-400 group-hover:text-sc-text-paragraph transition-colors">
              <Trans>View public profile</Trans>
              <SmallArrowIcon className="h-[8px] ml-3 transition-transform group-hover:translate-x-1" />
            </Subtitle>
          </button>
        </div>
      )}

      {open && (
        <AccountSwitcherDropdown
          accounts={accounts}
          activeId={id}
          onSelect={id => {
            setOpen(false);
            if (id !== activeAccount.id) onAccountSelect?.(id);
          }}
        />
      )}
    </div>
  );
};
