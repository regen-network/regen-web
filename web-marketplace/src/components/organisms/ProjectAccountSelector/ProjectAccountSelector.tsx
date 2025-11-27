import { useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import CheckIcon from 'web-components/src/components/icons/CheckIcon';
import DropdownIcon from 'web-components/src/components/icons/DropdownIcon';
import { Body } from 'web-components/src/components/typography';
import { Subtitle } from 'web-components/src/components/typography/Subtitle';
import UserAvatar from 'web-components/src/components/user/UserAvatar';
import { cn } from 'web-components/src/utils/styles/cn';

import useClickOutside from '../../../utils/hooks/useClickOutside';
import { AccountOption } from '../DashboardNavigation/DashboardNavigation.types';

export interface ProjectAccountSelectorProps {
  accounts: AccountOption[];
  selectedAddress: string;
  onSelect: (id: string) => void;
  label?: string;
}

export const ProjectAccountSelector = ({
  accounts,
  selectedAddress,
  onSelect,
  label,
}: ProjectAccountSelectorProps) => {
  const { _ } = useLingui();
  const [open, setOpen] = useState(false);
  const rootRef = useClickOutside<HTMLDivElement>(() => {
    if (open) setOpen(false);
  });

  const handleSelect = (address?: string) => {
    if (!address) return;
    onSelect(address);
  };

  const unnamedLabel = _(msg`Unnamed`);
  const getName = (name?: string) => name?.trim() || unnamedLabel;
  const selectedAccount = accounts.find(acc => acc.address === selectedAddress);

  return (
    <div ref={rootRef} className="relative w-full">
      {label && (
        <Body size="lg" className="text-bc-neutral-700 mb-[8px] font-bold">
          {label}
        </Body>
      )}
      {/* Button to toggle dropdown */}
      <button
        type="button"
        className={cn(
          'flex items-center gap-15 w-full px-[20px] py-[15px]',
          'border-solid border border-bc-neutral-300 rounded bg-bc-neutral-0 cursor-pointer',
          'transition-colors',
        )}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <UserAvatar
          src={selectedAccount?.image}
          alt={getName(selectedAccount?.name)}
          size="medium"
        />
        <Subtitle className="text-bc-neutral-700 font-normal text-left flex-1">
          {getName(selectedAccount?.name)}
        </Subtitle>
        <DropdownIcon className="h-[10px] w-[13px] text-brand-400" />
      </button>

      {open && (
        <ul
          className={cn(
            'absolute top-[calc(100%+8px)] left-0 w-full rounded',
            'shadow-[0_0_20px_rgba(0,0,0,0.25)] z-10',
            'list-none m-0 p-10 bg-bc-neutral-0',
          )}
          role="listbox"
          aria-label={_(msg`Account selector`)}
        >
          {accounts.map(account => {
            const isSelected = account.address === selectedAddress;
            const key = account.address ?? account.name;
            const isSelectable = !!account.address;

            return (
              <li key={key} role="option" aria-selected={isSelected}>
                <Body
                  size="md"
                  className="font-bold text-bc-neutral-900 px-[20px] pt-[10px] pb-[5px] bg-bc-neutral-0"
                >
                  {account.displayName}
                </Body>
                <button
                  type="button"
                  disabled={!isSelectable}
                  onClick={() => {
                    setOpen(false);
                    handleSelect(account.address);
                  }}
                  className={cn(
                    'flex items-center w-full gap-15 px-[20px] py-[10px]',
                    'cursor-pointer border-none bg-bc-neutral-0',
                    'rounded transition-colors hover:bg-bc-neutral-200',
                    {
                      'opacity-60 cursor-not-allowed hover:bg-bc-neutral-0':
                        !isSelectable,
                    },
                  )}
                >
                  <UserAvatar
                    src={account.image}
                    size="medium"
                    alt={getName(account.name)}
                  />
                  <Body
                    size="md"
                    className="font-medium text-bc-neutral-800 ml-[15px]"
                  >
                    {getName(account.name)}
                  </Body>
                  {isSelected && (
                    <CheckIcon
                      className="h-[18px] w-[18px] text-brand-400 ml-auto"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
