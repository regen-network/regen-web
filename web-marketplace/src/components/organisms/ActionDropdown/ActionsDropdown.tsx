import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import { HorizontalDotsIcon } from 'web-components/src/components/icons/HorizontalDotsIcon';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { cn } from 'web-components/src/utils/styles/cn';

import { TOOLTIP_ONLY_ADMIN_REMOVE } from '../Collaborators/Collaborators.constants';
import { ActionsDropdownProps } from '../Collaborators/Collaborators.types';
import { getActionItems } from './ActionDropdown.utils';

export const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  role,
  currentUserRole,
  orgRole,
  isCurrentUser,
  isExternalAdmin = false,
  onRemove,
  onEditOrgRole,
  onEditTitle,
  context = 'project',
  isOnlyAdmin = false,
}) => {
  const { _ } = useLingui();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (callback?: () => void) => {
    if (callback) callback();
    setIsOpen(false);
  };

  const items = getActionItems({
    context,
    role,
    currentUserRole,
    orgRole,
    isCurrentUser,
    isExternalAdmin,
    isOnlyAdmin,
    onRemove,
    onEditOrgRole,
    onEditTitle,
    navigate,
    _,
  });

  if (items.length === 0) return null;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={handleToggle}
        className="flex border-none bg-transparent cursor-pointer"
      >
        <HorizontalDotsIcon className="w-4 h-4" />
      </button>
      {isOpen && (
        <ul
          className={cn(
            'absolute right-0 mt-2 w-[180px]',
            'shadow-[0_0_20px_rgba(0,0,0,0.25)] z-20',
            'list-none p-0 m-0',
            'bg-bc-neutral-100 border border-[#D2D5D9] rounded-[2px]',
          )}
          role="menu"
          aria-label="Collaborator actions"
        >
          {items.map(item => (
            <li key={item.label} role="menuitem">
              {item.disabled ? (
                <InfoTooltip
                  title={_(TOOLTIP_ONLY_ADMIN_REMOVE)}
                  arrow={true}
                  placement="top"
                  className="bg-bc-neutral-0"
                >
                  <span>
                    <button
                      type="button"
                      disabled
                      tabIndex={-1}
                      aria-disabled="true"
                      className={cn(
                        'flex w-full items-center gap-10 px-[15px] h-[45px] border-none text-left cursor-not-allowed',
                        item.danger ? 'text-bc-red-600' : 'text-bc-neutral-700',
                        'bg-bc-neutral-100',
                      )}
                    >
                      <span className="mr-auto">{item.label}</span>
                    </button>
                  </span>
                </InfoTooltip>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSelect(item.onClick)}
                  className={cn(
                    'flex w-full items-center gap-10 px-[15px] h-[45px] hover:cursor-pointer border-none text-left',
                    item.danger ? 'text-bc-red-600' : 'text-bc-neutral-700',
                    'bg-bc-neutral-100 hover:bg-bc-neutral-200',
                  )}
                >
                  <span className="mr-auto">{item.label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
