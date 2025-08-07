import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { Project } from '@regen-network/api/regen/ecocredit/v1/state';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import DropdownIcon from 'web-components/src/components/icons/DropdownIcon';
import EmailIcon from 'web-components/src/components/icons/EmailIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Title } from 'web-components/src/components/typography';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from '../ActionDropdown/ActionDropdown.constants';
import {
  INVITE,
  NAME,
  ROLE,
  SEE_HELP_DOCS,
} from '../ProjectCollaborators/ProjectCollaborators.constants';
import { PROJECT_CONTEXT } from './BaseMembersTable.constants';
import {
  BaseMemberRole,
  BaseUser,
  ProjectRole,
} from './BaseMembersTable.types';

interface BaseMembersTableProps<T extends BaseUser> {
  users: T[];
  title: string;
  description: string;
  inviteButtonText: string;
  onInvite?: () => void;
  onSort?: () => void;
  sortDir?: 'asc' | 'desc';
  children: (user: T, canAdmin: boolean) => React.ReactNode;
  context: 'organization' | 'project';
  additionalColumns?: string[];
  showMobileInvite?: boolean;
  currentUserRole: ProjectRole | BaseMemberRole;
}

export const BaseMembersTable = <T extends BaseUser>({
  users,
  title,
  description,
  inviteButtonText,
  onInvite,
  onSort,
  sortDir = 'asc',
  children,
  context,
  additionalColumns = [],
  showMobileInvite = true,
  currentUserRole,
}: BaseMembersTableProps<T>) => {
  const { _ } = useLingui();
  const navigate = useNavigate();

  const isProjectContext = context === PROJECT_CONTEXT;

  const headerBreakpoint = isProjectContext ? 'lg:flex' : 'xl:flex';
  const rowBreakpoint = isProjectContext ? 'lg:flex-row' : 'xl:flex-row';

  const canAdmin =
    currentUserRole === ROLE_OWNER || currentUserRole === ROLE_ADMIN;

  return (
    <div className="w-full px-10 py-30 md:p-40 bg-bc-neutral-0 rounded-lg border border-solid border-bc-neutral-300">
      {/* Header row */}
      <div className="flex justify-between items-center mb-10">
        <Title variant="h4">
          {title}{' '}
          <span className="text-bc-neutral-400 font-normal">
            ({users.length})
          </span>
        </Title>

        {/* desktop / tablet invite */}
        {canAdmin && (
          <ContainedButton
            className="hidden lg:flex w-[269px] h-[42px] text-[14px]"
            onClick={onInvite}
            startIcon={<EmailIcon />}
          >
            {inviteButtonText}
          </ContainedButton>
        )}
      </div>

      <p className="text-sc-text-paragraph mb-10 mt-0">{description}</p>

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
      {canAdmin && showMobileInvite && (
        <ContainedButton
          className={`lg:hidden ${
            isProjectContext ? 'w-[136px]' : 'w-[208px]'
          } h-[42px] text-[14px] mb-30`}
          onClick={onInvite}
          startIcon={<EmailIcon />}
        >
          {isProjectContext ? _(INVITE) : inviteButtonText}
        </ContainedButton>
      )}

      {/* Desktop column headers */}
      <div
        className={`hidden ${headerBreakpoint} pb-20 justify-between font-muli text-sc-text-sub-header font-bold text-[12px]`}
      >
        <div
          className="w-[330px] px-6 flex items-center cursor-pointer"
          onClick={onSort}
        >
          {_(NAME)}
          <DropdownIcon
            className={`ml-10 w-4 h-4 transition-transform ${
              sortDir === 'desc' ? 'rotate-180' : ''
            }`}
          />
        </div>
        <div className="w-[170px] text-left">{_(ROLE)}</div>
        {additionalColumns.map((column, index) => (
          <div key={index} className="w-[150px] text-left">
            {column}
          </div>
        ))}
        <div className="w-[60px]" />
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`flex flex-col ${rowBreakpoint} justify-between py-20 gap-8 border-0 border-t border-solid border-sc-surface-stroke ${
              isProjectContext ? 'lg:gap-0' : 'xl:gap-0'
            }`}
          >
            {children(user, canAdmin)}
          </div>
        ))}
      </div>
    </div>
  );
};
