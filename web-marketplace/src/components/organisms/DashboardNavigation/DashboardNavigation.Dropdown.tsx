import { useMemo } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { CREATE_ORGANIZATION_FORM_ID } from 'legacy-pages/CreateOrganization/CreateOrganization.constants';
import { getDefaultAvatar } from 'legacy-pages/Dashboard/Dashboard.utils';

import { TextButton } from 'web-components/src/components/buttons/TextButton';
import CheckIcon from 'web-components/src/components/icons/CheckIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Body } from 'web-components/src/components/typography';
import UserAvatar from 'web-components/src/components/user/UserAvatar';
import { cn } from 'web-components/src/utils/styles/cn';

import { AccountType } from 'generated/graphql';

import { FINISH_ORG_CREATION } from '../RegistryLayout/RegistryLayout.constants';
import {
  CREATE_ORGANIZATION,
  ORG,
  ORGANIZATION,
  UNNAMED,
} from './DashboardNavigation.constants';
import {
  AccountOption,
  AccountSwitcherDropdownProps,
} from './DashboardNavigation.types';

export const AccountSwitcherDropdown = ({
  accounts,
  activeAddress,
  onSelect,
  hasOrganization = true,
  onCreateOrganization,
  unfinalizedOrgCreation = false,
  unfinalizedOrgName,
  onFinishOrgCreation,
}: AccountSwitcherDropdownProps) => {
  const { _ } = useLingui();

  const allOptions = useMemo(() => {
    const filteredAccounts = unfinalizedOrgCreation
      ? accounts.filter(account => account.type !== 'org')
      : accounts;

    const options: (
      | AccountOption
      | { id: typeof CREATE_ORGANIZATION_FORM_ID }
    )[] = [...filteredAccounts];
    if (unfinalizedOrgCreation || (!hasOrganization && onCreateOrganization)) {
      options.push({ id: CREATE_ORGANIZATION_FORM_ID });
    }
    return options;
  }, [accounts, hasOrganization, onCreateOrganization, unfinalizedOrgCreation]);

  return (
    <ul
      className={cn(
        'absolute top-[35px] left-[-13px] min-w-[280px]',
        'shadow-[0_0_20px_rgba(0,0,0,0.25)] z-10',
        'list-none p-0 m-0',
      )}
      role="listbox"
      aria-label={_(msg`Account switcher`)}
    >
      {allOptions.map(option => {
        const isCreateOrg = option.id === CREATE_ORGANIZATION_FORM_ID;
        const account = isCreateOrg ? null : (option as AccountOption);
        const accountAddress = account?.address;
        const isSelected = !isCreateOrg && accountAddress === activeAddress;

        const avatarSrc = account
          ? account.image ||
            getDefaultAvatar({
              type:
                account.type === ORG
                  ? AccountType.Organization
                  : AccountType.User,
            })
          : getDefaultAvatar({ type: AccountType.Organization });

        const name = isCreateOrg
          ? _(ORGANIZATION)
          : account?.name || _(UNNAMED);

        const handleClick = () => {
          if (isCreateOrg) {
            if (unfinalizedOrgCreation) {
              onFinishOrgCreation?.();
            } else {
              onCreateOrganization?.();
            }
          } else if (accountAddress) {
            onSelect(accountAddress);
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
              <UserAvatar src={avatarSrc} size="medium" alt={name} />
              {isCreateOrg ? (
                unfinalizedOrgCreation && unfinalizedOrgName ? (
                  <div className="ml-3 mr-auto text-left flex flex-col">
                    <Body
                      size="md"
                      className="truncate text-bc-neutral-700 font-bold"
                    >
                      {unfinalizedOrgName}
                    </Body>
                    <TextButton className="group text-[11px] bg-[linear-gradient(202deg,#4FB573_14.67%,#B9E1C7_97.14%)] bg-clip-text text-[transparent]">
                      {_(FINISH_ORG_CREATION)}
                      <SmallArrowIcon className="text-brand-400 group-hover:text-brand-200 h-[8px] ml-3" />
                    </TextButton>
                  </div>
                ) : (
                  <TextButton className="ml-3 mr-auto text-left text-[11px] bg-[linear-gradient(202deg,#4FB573_14.67%,#B9E1C7_97.14%)] bg-clip-text text-[transparent]">
                    {_(CREATE_ORGANIZATION)}
                  </TextButton>
                )
              ) : (
                <Body
                  size="md"
                  className="ml-3 mr-auto truncate text-left text-bc-neutral-700 font-bold"
                >
                  {name}
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
