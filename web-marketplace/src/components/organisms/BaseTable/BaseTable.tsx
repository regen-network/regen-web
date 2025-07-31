import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import DropdownIcon from 'web-components/src/components/icons/DropdownIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import EmailIcon from 'web-components/src/components/icons/EmailIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Title } from 'web-components/src/components/typography';

import {
  ACTION_EDIT_MY_USER_PROFILE,
  EDIT_PROFILE,
  INVITE,
  NAME,
  ROLE,
  SEE_HELP_DOCS,
  YOU,
} from '../Collaborators/Collaborators.constants';
import { BaseUser } from './Basetable.types';

interface BaseTableProps<T extends BaseUser> {
  users: T[];
  title: string;
  description: string;
  inviteButtonText: string;
  canAdmin: boolean;
  onInvite?: () => void;
  onSort?: () => void;
  sortDir?: 'asc' | 'desc';
  children: (user: T, index: number) => React.ReactNode;
  context: 'members' | 'collaborators';
  additionalColumns?: string[];
  showMobileInvite?: boolean;
}

export const BaseTable = <T extends BaseUser>({
  users,
  title,
  description,
  inviteButtonText,
  canAdmin,
  onInvite,
  onSort,
  sortDir = 'asc',
  children,
  context,
  additionalColumns = [],
  showMobileInvite = true,
}: BaseTableProps<T>) => {
  const { _ } = useLingui();
  const navigate = useNavigate();

  const isCollaborators = context === 'collaborators';
  const containerClass =
    'w-full px-10 py-30 md:p-40 bg-bc-neutral-0 rounded-lg border border-solid border-bc-neutral-300';

  const headerBreakpoint = isCollaborators ? 'lg:flex' : 'xl:flex';
  const rowBreakpoint = isCollaborators ? 'lg:flex-row' : 'xl:flex-row';

  return (
    <div className={containerClass}>
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
            isCollaborators ? 'w-[136px]' : 'w-[208px]'
          } h-[42px] text-[14px] mb-30`}
          onClick={onInvite}
          startIcon={<EmailIcon />}
        >
          {isCollaborators ? _(INVITE) : inviteButtonText}
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
              isCollaborators ? 'lg:gap-0' : 'xl:gap-0'
            }`}
          >
            {children(user, index)}
          </div>
        ))}
      </div>
    </div>
  );
};
interface UserInfoProps<T extends BaseUser> {
  user: T;
  context: 'members' | 'collaborators';
  description?: string;
  organization?: string;
  children?: React.ReactNode;
}

export const UserInfo = <T extends BaseUser>({
  user,
  context,
  description,
  organization,
  children,
}: UserInfoProps<T>) => {
  const { _ } = useLingui();
  const isCollaborators = context === 'collaborators';
  const widthClass = isCollaborators ? 'lg:w-[330px]' : 'xl:w-[330px]';
  const mobileDotsBreakpoint = isCollaborators ? 'lg:hidden' : 'xl:hidden';

  return (
    <div
      className={`flex w-full ${widthClass} items-center justify-between px-6`}
    >
      <div className="flex items-center gap-10">
        <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden">
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div
          className={`flex flex-col ${
            isCollaborators ? 'pb-10 lg:pb-0' : 'gap-5 pb-10 md:pb-0'
          }`}
        >
          <span className="text-gray-400 ml-2 flex items-center flex-row gap-5 font-bold">
            {user.name}
            {user.isCurrentUser && (
              <>
                {` ${_(YOU)}`}
                <a
                  href="/dashboard/profile"
                  className="ml-1 p-0 bg-transparent border-none cursor-pointer flex items-center group"
                  aria-label={_(ACTION_EDIT_MY_USER_PROFILE)}
                >
                  <EditIcon sx={{ height: '16px', width: '16px' }} />
                  <span className="hidden group-hover:flex text-[12px] tracking-[1px] font-[800] bg-transparent font-muli cursor-pointer text-ac-primary-500 ml-5">
                    {_(EDIT_PROFILE)}
                  </span>
                </a>
              </>
            )}
          </span>

          <span
            className={`text-sm ${
              isCollaborators ? 'text-bc-neutral-700' : 'text-bc-neutral-700'
            }`}
          >
            {description}
            {description && organization ? ', ' : ''}
            {organization}
          </span>
          <span className="text-sm text-bc-neutral-400">{user.email}</span>
        </div>
      </div>

      {/* dots (mobile) */}
      {children && (
        <div className={`flex h-[94px] ${mobileDotsBreakpoint}`}>
          {children}
        </div>
      )}
    </div>
  );
};
