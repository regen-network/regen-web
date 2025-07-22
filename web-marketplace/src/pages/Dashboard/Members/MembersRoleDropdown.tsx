import { useEffect, useRef, useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import CheckIcon from 'web-components/src/components/icons/CheckIcon';
import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import DropdownIcon from 'web-components/src/components/icons/DropdownIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { cn } from 'web-components/src/utils/styles/cn';

export type MemberRole = 'admin' | 'editor' | 'viewer';

interface MemberRoleDropdownProps {
  role: MemberRole;
  disabled?: boolean;
  onChange: (newRole: MemberRole) => void;
}

const ROLE_ITEMS: {
  key: MemberRole;
  label: string;
  Icon: React.FC<any>;
  description: string;
}[] = [
  {
    key: 'admin',
    label: 'Admin',
    Icon: CogIcon,
    description:
      'Manages user access and has full control of projects, credits, and credit classes.',
  },
  {
    key: 'editor',
    label: 'Editor',
    Icon: EditIcon,
    description:
      'Has full control of projects and credit classes, but cannot manage users or credits.',
  },
  {
    key: 'viewer',
    label: 'Viewer',
    Icon: EyeIcon,
    description: 'Can view all data across all projects, even when private.',
  },
];

export const MemberRoleDropdown: React.FC<
  MemberRoleDropdownProps & { isOnlyAdmin?: boolean }
> = ({ role, disabled = false, onChange, isOnlyAdmin = false }) => {
  const { _ } = useLingui();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  const showOnlyAdminTooltip = isOnlyAdmin && role === 'admin';
  const isDropdownDisabled = disabled || showOnlyAdminTooltip;

  const toggle = () => !isDropdownDisabled && setOpen(o => !o);
  const select = (r: MemberRole) => {
    onChange(r);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full font-sans">
      {/* ───── Trigger button ───── */}
      {isDropdownDisabled ? (
        <InfoTooltip
          title={
            showOnlyAdminTooltip
              ? _(
                  msg`As the only admin, you can’t change your role or remove yourself without adding another admin to this organization. `,
                )
              : _(msg`Please contact your administrator to change your role.`)
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
                'flex items-center justify-between w-full h-[50px] px-20 py-15 rounded border cursor-not-allowed bg-bc-neutral-200',
              )}
            >
              <div className="flex items-center gap-2">
                <span className="capitalize">{role}</span>
              </div>
              <DropdownIcon
                className="w-4 h-4 text-bc-neutral-400"
                color="text-bc-neutral-400"
              />
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
            disabled && 'bg-bc-neutral-400 cursor-not-allowed',
          )}
        >
          <div className="flex items-center gap-2">
            <span className="capitalize">{role}</span>
          </div>
          <DropdownIcon className="w-4 h-4" />
        </button>
      )}

      {/* ───── Listbox ───── */}
      {open && !isDropdownDisabled && (
        <ul
          role="listbox"
          aria-label="Select member role"
          className="absolute z-20 w-[330px] bg-bc-neutral-0 shadow-lg rounded mt-1 p-10 max-h-[32rem] overflow-auto flex gap-5 flex-col"
        >
          {ROLE_ITEMS.map(({ key, label, Icon, description }) => {
            const selected = key === role;
            const iconClass = 'text-ac-primary-500';

            return (
              <li key={key} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => select(key)}
                  className={cn(
                    'flex flex-col items-start w-full p-5 rounded border-none bg-bc-neutral-0 gap-3 font-sans',
                    selected
                      ? 'bg-bc-neutral-200'
                      : 'hover:bg-bc-neutral-200 cursor-pointer',
                  )}
                >
                  <div className="flex flex-row items-start gap-5">
                    <div className="flex items-center justify-center w-20 mt-5">
                      {selected && (
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
                          {_(msg`${label}`)}
                        </span>
                      </div>
                      <p className="text-[12px] leading-[1.45] not-italic text-left m-0 text-bc-neutral-500">
                        {_(msg`${description}`)}
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
