import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { getDefaultAvatar } from 'legacy-pages/Dashboard/Dashboard.utils';

import CheckIcon from 'web-components/src/components/icons/CheckIcon';
import { Body } from 'web-components/src/components/typography';
import UserAvatar from 'web-components/src/components/user/UserAvatar';
import { cn } from 'web-components/src/utils/styles/cn';

import { AccountType } from 'generated/graphql';

import { UNNAMED } from './DashboardNavigation.constants';
import { AccountSwitcherDropdownProps } from './DashboardNavigation.types';

export const AccountSwitcherDropdown = ({
  accounts,
  activeId,
  onSelect,
}: AccountSwitcherDropdownProps) => {
  const { _ } = useLingui();

  return (
    <ul
      className={cn(
        'absolute top-[32px] left-[-15px] w-[256px]',
        'shadow-[0_0_20px_rgba(0,0,0,0.25)] z-10',
        'list-none p-0 m-0',
      )}
      role="listbox"
      aria-label={_(msg`Account switcher`)}
    >
      {accounts.map((account, index) => {
        const accountId = account.address;
        const isSelected = accountId === activeId;
        const avatarSrc =
          account.image ||
          getDefaultAvatar({
            type:
              account.type === 'org'
                ? AccountType.Organization
                : AccountType.User,
          });

        return (
          <li key={accountId} role="option" aria-selected={isSelected}>
            <button
              type="button"
              onClick={() => accountId && onSelect(accountId)}
              className={cn(
                'flex w-full items-center gap-10 px-10 h-[55px]',
                'hover:cursor-pointer border-none',
                isSelected
                  ? 'bg-bc-neutral-200'
                  : 'bg-bc-neutral-100 hover:bg-bc-neutral-200',
              )}
            >
              <UserAvatar src={avatarSrc} size="small" alt={account.name} />
              <Body
                size="sm"
                className="ml-3 mr-auto truncate text-left text-bc-neutral-700 font-bold"
              >
                {account.name || _(UNNAMED)}
              </Body>
              {isSelected && (
                <CheckIcon
                  className="h-[18px] w-[18px] text-brand-400"
                  aria-hidden="true"
                />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
