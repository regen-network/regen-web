import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import DropdownIcon from 'web-components/src/components/icons/DropdownIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import EmailIcon from 'web-components/src/components/icons/EmailIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Title } from 'web-components/src/components/typography';

import { ActionsDropdown } from '../Collaborators/ActionsDropdown';
import { SEE_HELP_DOCS, YOU } from '../Collaborators/Collaborators.constants';
import {
  EDIT_PROFILE,
  INVITE_MEMBERS,
  NAME,
  ORGANIZATION_MEMBERS,
  ORGANIZATION_MEMBERS_DESCRIPTION,
  ROLE,
  VISIBILITY_ON_PROFILE,
} from './Members.constants';
import { mockMembers } from './Members.mock';
import { Member, MemberRole } from './Members.types';
import { MemberRoleDropdown } from './MembersRoleDropdown';
import { VisibilitySwitch } from './VisibilitySwitch';

export const Members = ({
  initialMembers = mockMembers,
}: {
  initialMembers?: Member[];
}) => {
  const { _ } = useLingui();
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const currentUserRole: MemberRole =
    members.find(m => m.isCurrentUser)?.role ?? 'viewer';
  const canAdmin = currentUserRole === 'admin';
  const isOnlyAdmin = members.filter(m => m.role === 'admin').length <= 1;

  const toggleSort = () => {
    const dir = sortDir === 'asc' ? 'desc' : 'asc';
    setSortDir(dir);
    setMembers(prev =>
      [...prev].sort((a, b) =>
        dir === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      ),
    );
  };

  const updateRole = (id: string, role: MemberRole) =>
    setMembers(prev => prev.map(m => (m.id === id ? { ...m, role } : m)));

  const updateVisibility = (id: string, visible: boolean) =>
    setMembers(prev => prev.map(m => (m.id === id ? { ...m, visible } : m)));

  const handleRemove = (id: string) =>
    setMembers(prev => prev.filter(m => m.id !== id));

  const handleInvite = () => {
    /* open invite modal */
  };

  return (
    <div
      className="w-full px-10 py-30 md:p-40 bg-bc-neutral-0 rounded-lg"
      style={{ border: '1px solid #D2D5D9' }}
    >
      {/* Header row */}
      <div className="flex justify-between items-center mb-10">
        <Title variant="h4">
          {_(ORGANIZATION_MEMBERS)}{' '}
          <span className="text-bc-neutral-400 font-normal">
            ({members.length})
          </span>
        </Title>

        {/* desktop / tablet invite */}
        {canAdmin && (
          <ContainedButton
            className="hidden lg:flex w-[269px] h-[42px] text-[14px]"
            onClick={handleInvite}
            startIcon={<EmailIcon />}
          >
            {_(INVITE_MEMBERS)}
          </ContainedButton>
        )}
      </div>

      <p className="text-sc-text-paragraph mb-10 mt-0">
        {_(ORGANIZATION_MEMBERS_DESCRIPTION)}
      </p>

      <button
        className="p-0 text-[12px] tracking-[1px] font-[800] mb-30 bg-transparent font-muli cursor-pointer text-ac-primary-500 border-none flex items-center gap-3 group"
        onClick={() => navigate('/docs')}
      >
        {_(SEE_HELP_DOCS)}
        <SmallArrowIcon
          sx={{
            height: '16px',
            width: '16px',
            transition: 'transform 0.2s',
          }}
          className="group-hover:translate-x-3 "
        />
      </button>

      {/* mobile invite under subtitle */}
      {canAdmin && (
        <ContainedButton
          className="lg:hidden w-[208px] h-[42px] text-[14px] mb-30"
          onClick={handleInvite}
          startIcon={<EmailIcon />}
        >
          {_(INVITE_MEMBERS)}
        </ContainedButton>
      )}

      {/* Desktop column headers */}
      <div className="hidden xl:flex pb-20 justify-between font-muli text-sc-text-sub-header font-bold text-[12px]">
        <div
          className="w-[330px] px-6 flex items-center cursor-pointer"
          onClick={toggleSort}
        >
          {_(NAME)}
          <DropdownIcon
            className={`ml-10 w-4 h-4 transition-transform ${
              sortDir === 'desc' ? 'rotate-180' : ''
            }`}
          />
        </div>
        <div className="w-[170px] text-left">{_(ROLE)}</div>
        <div className="w-[150px] text-left">{_(VISIBILITY_ON_PROFILE)}</div>
        <div className="w-[60px]" />
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-20">
        {members.map(m => (
          <div
            key={m.id}
            className="flex flex-col justify-between xl:flex-row py-20 gap-8 xl:gap-0"
            style={{ borderTop: '1px solid var(--surface-stroke,#D2D5D9)' }}
          >
            {/* Info + mobile dots */}
            <div className="flex w-full xl:w-[330px] items-center justify-between px-6">
              <div className="flex items-center gap-10">
                <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden">
                  {m.avatar && (
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-5 pb-10 md:pb-0">
                  <span className="text-gray-400 ml-2 flex items-center flex-row gap-5 font-bold">
                    {m.name}
                    {m.isCurrentUser && (
                      <>
                        {` ${_(YOU)}`}
                        <a
                          href="/dashboard/profile"
                          className="ml-1 p-0 bg-transparent border-none cursor-pointer flex items-center group"
                          aria-label="Edit your profile"
                        >
                          <EditIcon sx={{ height: '16px', width: '16px' }} />
                          <span className="hidden group-hover:flex text-[12px] tracking-[1px] font-[800] bg-transparent font-muli cursor-pointer text-ac-primary-500 ml-5">
                            {_(EDIT_PROFILE)}
                          </span>
                        </a>
                      </>
                    )}
                  </span>

                  <span className="text-sm text-bc-neutral-700">
                    {m.title}
                    {m.title && m.organization ? ', ' : ''}
                    {m.organization}
                  </span>
                  <span className="text-sm text-bc-neutral-400">{m.email}</span>
                </div>
              </div>

              {/* dots (mobile) */}
              <div className="flex h-[94px] xl:hidden">
                <ActionsDropdown
                  role={m.role}
                  currentUserRole={currentUserRole}
                  isCurrentUser={!!m.isCurrentUser}
                  onRemove={() => handleRemove(m.id)}
                  context="members"
                  isOnlyAdmin={isOnlyAdmin}
                />
              </div>
            </div>

            {/* Mobile row: dropdown + switch */}
            <div className="flex gap-20 xl:hidden w-full px-6 justify-between items-center">
              <MemberRoleDropdown
                role={m.role}
                disabled={!canAdmin}
                isOnlyAdmin={isOnlyAdmin}
                isCurrentUser={m.isCurrentUser}
                onChange={r => updateRole(m.id, r)}
              />
              <VisibilitySwitch
                checked={m.visible}
                disabled={!canAdmin}
                isCurrentUser={m.isCurrentUser}
                onChange={v => updateVisibility(m.id, v)}
              />
            </div>

            {/* Desktop columns */}
            <div className="hidden xl:flex w-[170px] items-center">
              <MemberRoleDropdown
                role={m.role}
                disabled={!canAdmin}
                isOnlyAdmin={isOnlyAdmin}
                isCurrentUser={m.isCurrentUser}
                onChange={r => updateRole(m.id, r)}
              />
            </div>
            <div className="hidden xl:flex w-[150px] items-center">
              <VisibilitySwitch
                checked={m.visible}
                disabled={!canAdmin}
                isCurrentUser={m.isCurrentUser}
                onChange={v => updateVisibility(m.id, v)}
              />
            </div>
            <div className="hidden xl:flex w-[60px] h-[74px] justify-center items-center">
              <ActionsDropdown
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
