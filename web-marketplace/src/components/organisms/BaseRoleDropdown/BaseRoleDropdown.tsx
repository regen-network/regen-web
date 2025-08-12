import { useEffect, useMemo, useRef, useState } from 'react';
import { useLingui } from '@lingui/react';

import CheckIcon from 'web-components/src/components/icons/CheckIcon';
import DropdownIcon from 'web-components/src/components/icons/DropdownIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from '../ActionDropdown/ActionDropdown.constants';
import { BaseRoleDropdownProps } from '../BaseMembersTable/BaseMembersTable.types';
import { SELECT_ROLE_ARIA_LABEL } from '../ProjectCollaborators/ProjectCollaborators.constants';
import {
  MUST_ASSIGN_NEW_OWNER,
  MUST_HAVE_BLOCKCHAIN_ACCOUNT,
  OWNER_ADMIN_CAN_EDIT,
  OWNER_CAN_EDIT_SELF,
  ROLE_HIERARCHY,
} from './BaseRoleDropdown.constants';
import QuestionMarkTooltip from 'web-components/src/components/tooltip/QuestionMarkTooltip';
import { Body } from 'web-components/src/components/typography';

export const BaseRoleDropdown: React.FC<BaseRoleDropdownProps> = ({
  role,
  disabled = false,
  onChange,
  roleOptions,
  currentUserRole,
  hasWalletAddress,
}) => {
  const { _ } = useLingui();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isCurrentUserOwner = currentUserRole === ROLE_OWNER;
  const filteredRoleOptions = useMemo(
    () =>
      roleOptions.filter(option =>
        isCurrentUserOwner ? true : option.key !== ROLE_OWNER,
      ),
    [isCurrentUserOwner, roleOptions],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [isOpen]);

  const isOwner = role === ROLE_OWNER;
  const tooltipTitle = disabled
    ? _(OWNER_ADMIN_CAN_EDIT)
    : isOwner
    ? isCurrentUserOwner
      ? _(MUST_ASSIGN_NEW_OWNER)
      : _(OWNER_CAN_EDIT_SELF)
    : undefined;
  const isDropdownDisabled = disabled || isOwner;

  const toggle = () => {
    if (isDropdownDisabled) return;
    setIsOpen(o => !o);
  };

  const select = (newRole: string) => {
    onChange(newRole);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full font-sans">
      {isDropdownDisabled ? (
        <div className="flex items-center gap-5">
          <Body className="capitalize text-sc-text-header" size="sm">
            {role}
          </Body>
          {tooltipTitle && (
            <QuestionMarkTooltip
              title={tooltipTitle}
              placement="top"
              className="bg-bc-neutral-0"
            />
          )}
        </div>
      ) : (
        <button
          onClick={toggle}
          className={cn(
            'flex items-center justify-between w-full h-[50px] px-20 py-15 rounded border border-solid cursor-pointer',
            'bg-bc-neutral-0 text-bc-neutral-700',
            'border-bc-neutral-300 hover:border-gray-300',
          )}
        >
          <div className="flex items-center gap-2">
            <span className="capitalize font-sans">{role}</span>
          </div>
          <DropdownIcon className="w-4 h-4" />
        </button>
      )}

      {isOpen && !isDropdownDisabled && (
        <ul
          role="listbox"
          aria-label={_(SELECT_ROLE_ARIA_LABEL)}
          className="list-none absolute z-20 w-full lg:w-[330px] bg-bc-neutral-0 shadow-lg rounded mt-1 p-10 max-h-[32rem] overflow-auto flex gap-5 flex-col border border-solid border-bc-neutral-300"
        >
          {filteredRoleOptions.map(({ key, label, Icon, description }) => {
            const isSelected = role === key;
            const unavailable =
              ROLE_HIERARCHY[key] > 1 && !hasWalletAddress ? true : false;

            const iconClass = unavailable
              ? 'text-bc-neutral-400'
              : 'text-ac-primary-500';

            return (
              <li key={key} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => !unavailable && select(key)}
                  disabled={unavailable}
                  className={cn(
                    'flex flex-col items-start w-full p-5 rounded border-none bg-bc-neutral-0 gap-3 font-sans',
                    isSelected && 'bg-bc-neutral-200 border-none',
                    !unavailable && 'hover:bg-bc-neutral-200 cursor-pointer',
                    unavailable &&
                      'text-bc-neutral-400 bg-transparent cursor-not-allowed border-none',
                  )}
                >
                  <div className="pl-20 relative">
                    {isSelected && (
                      <CheckIcon
                        className="absolute top-5 left-0 w-[12px] h-[12px] text-black"
                        aria-hidden
                      />
                    )}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-5 w-full">
                        <Icon
                          className={iconClass}
                          sx={{ width: 20, height: 20 }}
                          aria-hidden
                        />
                        <span className="font-medium text-bc-neutral-900 text-[16px]">
                          {label}
                        </span>
                      </div>

                      <p
                        className={cn(
                          'text-[14px] leading-[1.45] text-left m-0',
                          unavailable
                            ? 'text-bc-neutral-400 italic font-bold'
                            : 'text-bc-neutral-500',
                        )}
                      >
                        {unavailable
                          ? _(MUST_HAVE_BLOCKCHAIN_ACCOUNT)
                          : description}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
