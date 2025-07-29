import { useEffect, useRef, useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import CheckIcon from 'web-components/src/components/icons/CheckIcon';
import DropdownIcon from 'web-components/src/components/icons/DropdownIcon';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  ORG_ADMIN,
  ORG_EDITOR,
  ORG_MEMBER_SETTINGS,
  TOOLTIP_ROLE,
} from './Collaborators.constants';
import { ProjectRoleType, RoleDropdownProps } from './Collaborators.types';
import { ROLE_HIERARCHY, ROLE_OPTIONS } from './Collaborators.utils';

export const RoleDropdown = ({
  projectRole,
  orgRole,
  onChange,
  disabled = false,
  currentUserRole,
  isExternalAdmin = false,
  isOnlyAdmin = false, // <-- add here
}: RoleDropdownProps & {
  isExternalAdmin?: boolean;
  isOnlyAdmin?: boolean;
}) => {
  const { _ } = useLingui();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const showOnlyAdminTooltip = isOnlyAdmin && projectRole === 'admin';
  const isDropdownDisabled =
    disabled ||
    currentUserRole !== 'admin' ||
    showOnlyAdminTooltip ||
    (isExternalAdmin && projectRole === 'admin' && orgRole !== '');

  const toggle = () => {
    if (isDropdownDisabled) return;
    setIsOpen(o => !o);
  };

  const select = (role: ProjectRoleType) => {
    onChange(role);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full font-sans">
      {isDropdownDisabled ? (
        <InfoTooltip
          title={
            showOnlyAdminTooltip
              ? _(
                  msg`This is the only admin on the project. You can’t change their role or remove them unless another admin is added.`,
                )
              : isExternalAdmin && projectRole === 'admin'
              ? _(msg`External admins cannot change the role of other admins.`)
              : _(TOOLTIP_ROLE)
          }
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
                'flex items-center justify-between w-full h-[50px] px-20 py-15 rounded border cursor-not-allowed text-bc-neutral-400',
              )}
            >
              <div className="flex items-center gap-2">
                <span className="capitalize">{projectRole}</span>
              </div>
              <DropdownIcon className="w-4 h-4" color="text-bc-neutral-400" />{' '}
            </button>
          </span>
        </InfoTooltip>
      ) : (
        <button
          onClick={toggle}
          disabled={disabled}
          className={cn(
            'flex items-center justify-between w-full h-[50px] px-20 py-15 rounded border cursor-pointer',
            'bg-bc-neutral-0 text-bc-neutral-700',
            'border-[#D2D5D9] hover:border-gray-300',
            disabled &&
              'bg-bc-neutral-200 cursor-not-allowed text-bc-neutral-400',
          )}
        >
          <div className="flex items-center gap-2">
            <span className="capitalize">{projectRole}</span>
          </div>
          <DropdownIcon className="w-4 h-4" />
        </button>
      )}

      {isOpen && !isDropdownDisabled && (
        <ul
          role="listbox"
          aria-label="Select role"
          className="absolute z-20 w-[330px] bg-bc-neutral-0 shadow-lg rounded mt-1 p-10 max-h-[32rem] overflow-auto flex gap-5 flex-col"
        >
          {ROLE_OPTIONS.map(({ key, label, Icon, description }) => {
            const level = ROLE_HIERARCHY[key];
            const isSelected = projectRole === key;
            const isOrgAndProjectAdmin =
              orgRole === 'admin' && projectRole === 'admin';
            const isOrgAndProjectEditor =
              orgRole === 'editor' && projectRole === 'editor';
            const isOrgEditorProjectAdmin =
              orgRole === 'editor' && projectRole === 'admin';

            const unavailable =
              projectRole === 'viewer' || orgRole === 'viewer'
                ? false
                : orgRole === undefined || orgRole === null || orgRole === ''
                ? false
                : isOrgAndProjectAdmin
                ? key !== 'admin'
                : isOrgAndProjectEditor
                ? key !== 'editor' && key !== 'admin'
                : isOrgEditorProjectAdmin
                ? key !== 'admin' && key !== 'editor'
                : orgRole === 'admin' && key !== 'admin'
                ? true
                : level > ROLE_HIERARCHY[orgRole];

            const iconClass =
              key === 'admin'
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
                      {(orgRole === 'editor' && key === 'editor') ||
                      (isOrgAndProjectAdmin && key === 'admin') ? (
                        <p className="text-[12px] leading-[1.45] font-bold italic text-left m-0 text-bc-neutral-500">
                          {_(ORG_EDITOR)}
                          {' '}
                          <a
                            href="/dashboard/members"
                            className="underline decoration-0 text-bc-neutral-500 hover:text-bc-neutral-500"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: 'underline',
                              textDecorationColor: 'inherit',
                            }}
                          >
                            {_(ORG_MEMBER_SETTINGS)}
                          </a>
                          .
                        </p>
                      ) : isOrgAndProjectAdmin && key === 'admin' ? (
                        <p className="text-[12px] leading-[1.45] font-bold italic text-left m-0 text-bc-neutral-500">
                          {_(ORG_ADMIN)}
                          {' '}
                          <a
                            href="/dashboard/members"
                            className="underline decoration-0 text-bc-neutral-500 hover:text-bc-neutral-500"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: 'underline',
                              textDecorationColor: 'inherit',
                            }}
                          >
                            {_(ORG_MEMBER_SETTINGS)}
                          </a>
                          .
                        </p>
                      ) : (
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
                      )}
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
