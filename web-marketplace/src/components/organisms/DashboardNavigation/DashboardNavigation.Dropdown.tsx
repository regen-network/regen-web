import { useMemo } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { getDefaultAvatar } from 'legacy-pages/Dashboard/Dashboard.utils';

import { TextButton } from 'web-components/src/components/buttons/TextButton';
import CheckIcon from 'web-components/src/components/icons/CheckIcon';
import { Body } from 'web-components/src/components/typography';
import UserAvatar from 'web-components/src/components/user/UserAvatar';
import { cn } from 'web-components/src/utils/styles/cn';

import { AccountType } from 'generated/graphql';

import {
  CREATE_ORGANIZATION,
  ORGANIZATION,
  UNNAMED,
} from './DashboardNavigation.constants';
import {
  AccountOption,
  AccountSwitcherDropdownProps,
} from './DashboardNavigation.types';

const CREATE_ORG_ID = 'create-organization';

export const AccountSwitcherDropdown = ({
  accounts,
  activeId,
  onSelect,
  hasOrganization = true,
  onCreateOrganization,
}: AccountSwitcherDropdownProps) => {
  const { _ } = useLingui();

  const allOptions = useMemo(() => {
    const options: (AccountOption | { id: typeof CREATE_ORG_ID })[] = [
      ...accounts,
    ];
    if (!hasOrganization && onCreateOrganization) {
      options.push({ id: CREATE_ORG_ID });
    }
    return options;
  }, [accounts, hasOrganization, onCreateOrganization]);

  return (
    <ul
      className={cn(
        'absolute top-[35px] left-[-13px] w-[280px]',
        'shadow-[0_0_20px_rgba(0,0,0,0.25)] z-10',
        'list-none p-0 m-0',
      )}
      role="listbox"
      aria-label={_(msg`Account switcher`)}
    >
      {allOptions.map(option => {
        const isCreateOrg = option.id === CREATE_ORG_ID;
        const account = isCreateOrg ? null : (option as AccountOption);
        const accountId = account?.address;
        const isSelected = !isCreateOrg && accountId === activeId;

        const avatarSrc = account
          ? account.image ||
            getDefaultAvatar({
              type:
                account.type === 'org'
                  ? AccountType.Organization
                  : AccountType.User,
            })
          : getDefaultAvatar({ type: AccountType.Organization });

        const handleClick = () => {
          if (isCreateOrg) {
            onCreateOrganization?.();
          } else if (accountId) {
            onSelect(accountId);
          }
        };

        return (
          <li key={option.id} role="option" aria-selected={isSelected}>
            <button
              type="button"
              onClick={handleClick}
              className={cn(
                'flex w-full items-center gap-10 px-15 py-[20px]',
                'hover:cursor-pointer border-none',
                isSelected
                  ? 'bg-bc-neutral-200'
                  : 'bg-bc-neutral-100 hover:bg-bc-neutral-200',
              )}
            >
              <UserAvatar
                src={avatarSrc}
                size="medium"
                alt={account?.name || _(ORGANIZATION)}
              />
              {isCreateOrg ? (
                <TextButton className="ml-3 mr-auto text-left text-[11px] bg-[linear-gradient(202deg,#4FB573_14.67%,#B9E1C7_97.14%)] bg-clip-text text-[transparent]">
                  {_(CREATE_ORGANIZATION)}
                </TextButton>
              ) : (
                <Body
                  size="md"
                  className="ml-3 mr-auto truncate text-left text-bc-neutral-700 font-bold"
                >
                  {account?.name || _(UNNAMED)}
                </Body>
              )}
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
