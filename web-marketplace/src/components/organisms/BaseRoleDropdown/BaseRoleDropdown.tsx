import { useEffect, useMemo, useRef, useState } from 'react';
import { useLingui } from '@lingui/react';

import CheckIcon from 'web-components/src/components/icons/CheckIcon';
import DropdownIcon from 'web-components/src/components/icons/DropdownIcon';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from '../ActionDropdown/ActionDropdown.constants';
import {
  BaseRoleDropdownProps,
  RoleOption,
} from '../BaseMembersTable/BaseMembersTable.types';
import { SELECT_ROLE_ARIA_LABEL } from '../ProjectCollaborators/ProjectCollaborators.constants';
import { PLEASE_CONTACT_ADMIN } from './BaseRoleDropdown.constants';

export const BaseRoleDropdown: React.FC<BaseRoleDropdownProps> = ({
  role,
  disabled = false,
  onChange,
  isCurrentUser = false,
  roleOptions,
  getUnavailableRoles,
  currentUserRole,
}) => {
  const { _ } = useLingui();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  console.log(currentUserRole);
  const filteredRoleOptions = useMemo(
    () =>
      roleOptions.filter(option =>
        currentUserRole === ROLE_OWNER ? true : option.key !== ROLE_OWNER,
      ),
    [currentUserRole, roleOptions],
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
    ? _(PLEASE_CONTACT_ADMIN)
    : isOwner
    ? 'TODO'
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
        tooltipTitle ? (
          <InfoTooltip
            title={tooltipTitle}
            arrow={true}
            placement="top"
            className="bg-bc-neutral-0"
          >
            <span>
              <button
                disabled
                tabIndex={-1}
                aria-disabled="true"
                className={cn(
                  'flex items-center justify-between w-full h-[50px] px-20 py-15 rounded border-solid cursor-not-allowed text-bc-neutral-400 bg-bc-neutral-200',
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="capitalize font-sans">{role}</span>
                </div>
                <DropdownIcon className="w-4 h-4" color="text-bc-neutral-400" />
              </button>
            </span>
          </InfoTooltip>
        ) : (
          <button
            disabled
            tabIndex={-1}
            aria-disabled="true"
            className={cn(
              'flex items-center justify-between w-full h-[50px] px-20 py-15 rounded border-solid cursor-not-allowed text-bc-neutral-400 bg-bc-neutral-200',
            )}
          >
            <div className="flex items-center gap-2">
              <span className="capitalize font-sans">{role}</span>
            </div>
            <DropdownIcon className="w-4 h-4" color="text-bc-neutral-400" />
          </button>
        )
      ) : (
        <button
          onClick={toggle}
          disabled={disabled}
          className={cn(
            'flex items-center justify-between w-full h-[50px] px-20 py-15 rounded border border-solid cursor-pointer',
            'bg-bc-neutral-0 text-bc-neutral-700',
            'border-bc-neutral-300 hover:border-gray-300',
            disabled &&
              'bg-bc-neutral-400 cursor-not-allowed text-bc-neutral-400',
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
          className="absolute z-20 w-full lg:w-[330px] bg-bc-neutral-0 shadow-lg rounded mt-1 p-10 max-h-[32rem] overflow-auto flex gap-5 flex-col border border-solid border-bc-neutral-300"
        >
          {filteredRoleOptions.map(({ key, label, Icon, description }) => {
            const isSelected = role === key;
            const unavailable = getUnavailableRoles
              ? getUnavailableRoles(role)(key)
              : false;

            const iconClass =
              key === ROLE_ADMIN
                ? unavailable
                  ? 'text-bc-neutral-400'
                  : 'text-ac-primary-500'
                : unavailable
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
                  <div className="flex flex-row items-start gap-5">
                    <div className="flex items-center justify-center w-20 mt-5">
                      {isSelected && (
                        <CheckIcon
                          className="w-[12px] h-[12px] text-black"
                          aria-hidden
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-5 w-full">
                        <Icon
                          className={iconClass}
                          sx={{ width: 20, height: 20 }}
                          aria-hidden
                        />
                        <span className="font-medium text-bc-neutral-900 text-[16px]">
                          {_(label)}
                        </span>
                      </div>

                      <p
                        className={cn(
                          'text-[12px] leading-[1.45] not-italic text-left m-0',
                          unavailable
                            ? 'text-bc-neutral-400'
                            : 'text-bc-neutral-500',
                        )}
                      >
                        {_(description)}
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
