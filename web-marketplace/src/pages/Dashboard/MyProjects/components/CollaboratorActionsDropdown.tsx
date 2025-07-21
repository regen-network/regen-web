import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { HorizontalDotsIcon } from 'web-components/src/components/icons/HorizontalDotsIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import { CollaboratorActionsDropdownProps } from './Collaborators.types';

export const CollaboratorActionsDropdown: React.FC<CollaboratorActionsDropdownProps> =
  ({
    role,
    currentUserRole,
    orgRole,
    isCurrentUser,
    onRemove,
    onEditOrgRole,
    onEditTitle,
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

    // Do not render the dropdown trigger unless the current user is an admin
    // or the collaborator is the current user.
    if (currentUserRole !== 'admin' && !isCurrentUser) {
      return null;
    }

    // Define menu items based on user status
    let items: { label: string; onClick?: () => void; danger?: boolean }[] = [];
    if (isCurrentUser && role === 'admin' && orgRole !== '') {
      items = [
        {
          label: _(msg`Edit organization role`),
          onClick: onEditOrgRole,
        },
        {
          label: _(msg`Edit title`),
          onClick: onEditTitle,
        },
      ];
    } else if (
      isCurrentUser &&
      (role === 'viewer' || role === 'author' || role === 'editor')
    ) {
      items = [
        {
          label: _(msg`Edit my profile`),
          onClick: () => navigate('/dashboard/profile'),
        },
      ];
    } else if (orgRole !== '') {
      items = [
        {
          label: _(msg`Edit organization role`),
          onClick: onEditOrgRole,
        },
      ];
    } else {
      items = [
        {
          label: _(msg`Remove`),
          onClick: onRemove,
          danger: true,
        },
      ];
    }

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
                <button
                  type="button"
                  onClick={() => handleSelect(item.onClick)}
                  className={cn(
                    'flex w-full items-center gap-10 px-[15px] h-[55px] hover:cursor-pointer border-none text-left',
                    item.danger ? 'text-red-600' : 'text-bc-neutral-700',
                    'bg-bc-neutral-100 hover:bg-bc-neutral-200',
                  )}
                >
                  <span className="mr-auto">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
