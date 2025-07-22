import { useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import DropdownIcon from 'web-components/src/components/icons/DropdownIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import EmailIcon from 'web-components/src/components/icons/EmailIcon';
import { Title } from 'web-components/src/components/typography';

import { CollaboratorActionsDropdown } from '../MyProjects/components/CollaboratorActionsDropdown';
import { YOU } from '../MyProjects/components/Collaborators.constants';
import { MemberRoleDropdown } from './MembersRoleDropdown';
import { VisibilitySwitch } from './VisibilitySwitch';

/** TYPES */
export type MemberRole = 'admin' | 'editor' | 'viewer';
interface Member {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  role: MemberRole;
  avatar?: string;
  visible: boolean; // new
  isCurrentUser?: boolean;
}

const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    title: 'Project Manager',
    organization: 'Ecometric',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/299',
    visible: true,
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    title: 'Project Manager',
    organization: 'Ecometric',
    role: 'editor',
    avatar: 'https://i.pravatar.cc/300',
    visible: false,
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    title: 'Project Manager',
    organization: 'Ecometric',
    role: 'viewer',
    avatar: 'https://i.pravatar.cc/301',
    visible: true,
  },
  {
    id: '4',
    name: 'Bob Brown',
    email: 'bob@example.com',
    title: 'Project Manager',
    organization: 'Ecometric',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/302',
    visible: true,
    isCurrentUser: true,
  },
];

/** MAIN PAGE */
export const Members = () => {
  const { _ } = useLingui();
  const members = mockMembers; // Replace with actual data fetching logic
  const [localMembers, setLocalMembers] = useState<Member[]>(members);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const currentUserRole = 'admin';

  const canAdmin = currentUserRole === 'admin';
  const isOnlyAdmin = localMembers.filter(m => m.role === 'admin').length <= 1;

  const toggleSort = () => {
    const dir = sortDir === 'asc' ? 'desc' : 'asc';
    setSortDir(dir);
    setLocalMembers(prev =>
      [...prev].sort((a, b) =>
        dir === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      ),
    );
  };

  // Internal handler for role change
  const updateRole = (id: string, newRole: MemberRole) => {
    setLocalMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, role: newRole } : m)),
    );
    // Optionally: add toast/notification here
  };

  // Internal handler for visibility change
  const updateVisibility = (id: string, visible: boolean) => {
    setLocalMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, visible } : m)),
    );
    // Optionally: add toast/notification here
  };

  // Internal handler for invite
  const handleInvite = () => {
    // Open invite modal or show notification
  };

  // Internal handler for remove
  const handleRemove = (id: string) => {
    setLocalMembers(prev => prev.filter(m => m.id !== id));
    // Optionally: add toast/notification here
  };

  return (
    <div className="w-full p-40 bg-bc-neutral-0 rounded-lg border border-bc-neutral-300">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <Title variant="h4">
          {_(msg`Organization Members`)}{' '}
          <span className="text-bc-neutral-400 font-normal">
            ({members.length})
          </span>
        </Title>
        {canAdmin && (
          <ContainedButton
            className="w-[269px] h-[42px] text-[14px]"
            onClick={handleInvite}
            startIcon={<EmailIcon />}
          >
            {_(msg`Invite Members`)}
          </ContainedButton>
        )}
      </div>
      {/* Subtitle / description */}
      <p className="text-sc-text-paragraph mb-30 mt-0">
        {_(
          msg`Organization members have permissions for all projects associated with an organization`,
        )}
      </p>

      {/* TABLE HEADER */}
      <div className="flex pb-20 justify-between font-muli text-sc-text-sub-header font-bold text-[12px]">
        <div
          className="w-[330px] px-6 flex items-center cursor-pointer"
          onClick={toggleSort}
        >
          {_(msg`NAME`)}
          <DropdownIcon
            className={`ml-10 w-4 h-4 transition-transform ${
              sortDir === 'desc' ? 'transform rotate-180' : ''
            }`}
          />
        </div>
        <div className="w-[170px] text-left">{_(msg`ROLE`)}</div>
        <div className="w-[150px] text-left">
          {_(msg`VISIBILITY ON PROFILE`)}
        </div>
        <div className="w-[60px]"></div>
      </div>

      {/* ROWS */}
      <div className="flex flex-col gap-20">
        {localMembers.map(m => (
          <div
            key={m.id}
            className="flex py-20 justify-between items-center"
            style={{ borderTop: '1px solid var(--surface-stroke, #D2D5D9)' }}
          >
            {/* User info - left aligned */}
            <div className="flex items-center w-[300px] px-6 gap-10">
              <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden">
                {m.avatar && (
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-5 flex-1">
                <div className="flex flex-row gap-3 font-bold">
                  {m.name}
                  {m.isCurrentUser && (
                    <span className="text-gray-400 ml-2 flex items-center flex-row gap-5">
                      {_(YOU)}
                      <a
                        href={`/dashboard/profile`}
                        className="ml-1 p-0 bg-transparent border-none cursor-pointer"
                        aria-label="Edit your profile"
                      >
                        <EditIcon sx={{ height: '16px', width: '16px' }} />
                      </a>
                    </span>
                  )}
                </div>
                <span className="text-sm text-bc-neutral-700">
                  {m.title}
                  {m.title && m.organization ? ', ' : ''}
                  {m.organization}
                </span>
                <span className="text-sm text-bc-neutral-400">{m.email}</span>
              </div>
            </div>

            {/* Role dropdown - right aligned with actions */}
            <div className="w-[214px] flex justify-start items-center relative">
              <MemberRoleDropdown
                role={m.role}
                disabled={!canAdmin}
                isOnlyAdmin={isOnlyAdmin}
                onChange={r => updateRole(m.id, r)}
              />
            </div>

            {/* Visibility switch */}
            <div className="w-[120px] flex justify-start">
              <VisibilitySwitch
                checked={m.visible}
                disabled={!canAdmin}
                onChange={val => updateVisibility(m.id, val)}
              />
            </div>

            {/* Actions */}
            <div className="w-[60px] flex justify-center items-center">
              <CollaboratorActionsDropdown
                role={m.role}
                currentUserRole={currentUserRole}
                isCurrentUser={!!m.isCurrentUser}
                onRemove={() => handleRemove(m.id)}
                context="members"
                isOnlyAdmin={isOnlyAdmin}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
