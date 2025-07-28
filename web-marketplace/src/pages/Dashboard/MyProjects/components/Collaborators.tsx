import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import DropdownIcon from 'web-components/src/components/icons/DropdownIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import EmailIcon from 'web-components/src/components/icons/EmailIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Title } from 'web-components/src/components/typography';

import { ActionsDropdown } from './ActionsDropdown';
import { SEE_HELP_DOCS, YOU } from './Collaborators.constants';
import {
  CollaboratorsManagementProps,
  ProjectRoleType,
} from './Collaborators.types';
import { RoleDropdown } from './RoleDropdown';

export const CollaboratorsManagement: React.FC<CollaboratorsManagementProps> =
  ({ collaborators, onInvite, onRoleChange, onRemove }) => {
    const { _ } = useLingui();
    const navigate = useNavigate();

    const [localCollaborators, setLocalCollaborators] = useState(collaborators);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

    const currentUserRole =
      collaborators?.find(c => c.isCurrentUser)?.projectRole || 'viewer';
    const isExternalAdmin = collaborators?.some(
      c => c.orgRole === '' && c.projectRole === 'admin' && c.isCurrentUser,
    );

    /* ───── sort handler ───── */
    const toggleSort = () => {
      const dir = sortDir === 'asc' ? 'desc' : 'asc';
      setSortDir(dir);
      setLocalCollaborators(prev =>
        [...(prev ?? [])].sort((a, b) =>
          dir === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name),
        ),
      );
    };

    /* ───── role / remove handlers ───── */
    const handleRoleChange = (id: string, role: ProjectRoleType) => {
      setLocalCollaborators(prev =>
        prev?.map(c => (c.id === id ? { ...c, projectRole: role } : c)),
      );
      onRoleChange?.(id, role);
    };
    const handleRemove = (id: string) => onRemove?.(id);

    return (
      <div className="w-full border border-bc-neutral-300">
        {/* ───────── Header ───────── */}
        <div className="flex justify-between items-center mb-10">
          <Title variant="h4">
            {_(msg`Project Collaborators`)}{' '}
            <span className="text-bc-neutral-400 font-normal">
              ({collaborators?.length})
            </span>
          </Title>

          {/* desktop / tablet invite button */}
          {currentUserRole === 'admin' && (
            <ContainedButton
              className="hidden lg:flex w-[269px] h-[42px] text-[14px]"
              onClick={onInvite}
              startIcon={<EmailIcon />}
            >
              {_(msg`Invite Collaborators`)}
            </ContainedButton>
          )}
        </div>

        <p className="text-sc-text-paragraph mb-10 mt-0">
          {_(
            msg`Collaborators can manage the project page, posts, and credits, but aren’t visible publicly.`,
          )}
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

        {/* mobile invite button under subtitle */}
        {currentUserRole === 'admin' && (
          <ContainedButton
            className="lg:hidden w-[136px] h-[42px] text-[14px] mb-30"
            onClick={onInvite}
            startIcon={<EmailIcon />}
          >
            {_(msg`Invite`)}
          </ContainedButton>
        )}

        {/* ───────── Table header (desktop only) ───────── */}
        <div className="hidden lg:flex items-center pb-20 justify-between font-muli text-sc-text-sub-header font-bold text-[12px]">
          <div
            className="w-[330px] px-6 flex items-center cursor-pointer"
            onClick={toggleSort}
          >
            {_(msg`NAME`)}
            <DropdownIcon
              className={`ml-10 w-4 h-4 transition-transform ${
                sortDir === 'desc' ? 'rotate-180' : ''
              }`}
            />
          </div>
          <div className="w-[170px] text-left">{_(msg`ROLE`)}</div>
          <div className="w-[60px]" />
        </div>

        {/* ───────── Rows ───────── */}
        <div className="flex flex-col">
          {localCollaborators?.map(col => (
            <div
              key={col.id}
              className="flex flex-col lg:flex-row justify-between py-20 gap-8 lg:gap-0"
              style={{ borderTop: '1px solid var(--surface-stroke,#D2D5D9)' }}
            >
              {/* ① Avatar / info + mobile dots */}
              <div className="flex lg:w-[330px] items-center justify-between px-6">
                <div className="flex items-center gap-10">
                  <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden">
                    {col.avatar && (
                      <img
                        src={col.avatar}
                        alt={col.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col pb-10 lg:pb-0">
                    <span className="text-gray-400 ml-2 flex items-center flex-row gap-5 font-bold">
                      {col.name}
                      {col.isCurrentUser && (
                        <>
                          {` ${_(YOU)}`}
                          <a
                            href="/dashboard/profile"
                            className="ml-1 p-0 bg-transparent border-none cursor-pointer flex items-center group"
                            aria-label="Edit your profile"
                          >
                            <EditIcon sx={{ height: '16px', width: '16px' }} />
                            <span className="hidden group-hover:flex text-[12px] tracking-[1px] font-[800] bg-transparent font-muli cursor-pointer text-ac-primary-500 ml-5">
                              {_(msg`EDIT PROFILE`)}
                            </span>
                          </a>
                        </>
                      )}
                    </span>

                    <span className="text-bc-neutral-700 text-sm">
                      {col.description}
                      {col.description && col.organization ? ', ' : ''}
                      {col.organization}
                    </span>
                    <span className="text-bc-neutral-400 text-sm">
                      {col.email}
                    </span>
                  </div>
                </div>

                {/* dots on mobile */}
                <div className="flex h-[94px] lg:hidden">
                  <ActionsDropdown
                    role={col.projectRole}
                    currentUserRole={currentUserRole}
                    orgRole={col.orgRole}
                    isCurrentUser={col.isCurrentUser}
                    onRemove={() => handleRemove(col.id)}
                    onEditOrgRole={() => {}}
                    onEditTitle={() => {}}
                    isExternalAdmin={isExternalAdmin}
                  />
                </div>
              </div>

              {/* ② Role dropdown – full width on mobile */}
              <div className="order-10 lg:order-none w-full lg:w-[170px] px-6">
                <RoleDropdown
                  projectRole={col.projectRole}
                  orgRole={col.orgRole}
                  currentUserRole={currentUserRole}
                  onChange={r => handleRoleChange(col.id, r)}
                  isCurrentUser={col.isCurrentUser}
                  isExternalAdmin={isExternalAdmin}
                />
              </div>

              {/* ③ dots for desktop */}
              <div className="hidden lg:flex w-[60px] justify-center items-center">
                <ActionsDropdown
                  role={col.projectRole}
                  currentUserRole={currentUserRole}
                  orgRole={col.orgRole}
                  isCurrentUser={col.isCurrentUser}
                  onRemove={() => handleRemove(col.id)}
                  onEditOrgRole={() => {}}
                  onEditTitle={() => {}}
                  isExternalAdmin={isExternalAdmin}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
