import CheckIcon from 'web-components/src/components/icons/CheckIcon';
import { Body } from 'web-components/src/components/typography';
import UserAvatar from 'web-components/src/components/user/UserAvatar';
import { cn } from 'web-components/src/utils/styles/cn';

import { AccountSwitcherDropdownProps } from './DashboardNavigation.types';

export const AccountSwitcherDropdown = ({
  accounts,
  activeId,
  onSelect,
}: AccountSwitcherDropdownProps) => (
  <ul
    className={cn(
      'absolute top-[32px] left-[-15px] w-[256px]',
      'shadow-[0_0_20px_rgba(0,0,0,0.25)] z-10',
      'list-none p-0 m-0',
    )}
    role="listbox"
    aria-label="Account switcher"
  >
    {accounts.map(account => {
      const isSelected = account.id === activeId;

      return (
        <li key={account.id} role="option" aria-selected={isSelected}>
          <button
            type="button"
            onClick={() => onSelect(account.id)}
            className={cn(
              'flex w-full items-center gap-10 px-10 h-[55px]',
              'hover:cursor-pointer border-none',
              isSelected
                ? 'bg-bc-neutral-200'
                : 'bg-bc-neutral-100 hover:bg-bc-neutral-200',
            )}
          >
            <UserAvatar src={account.image} size="small" alt={account.name} />
            <Body
              size="sm"
              className="ml-3 mr-auto truncate text-left text-bc-neutral-700 font-bold"
            >
              {account.name}
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
