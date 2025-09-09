import { useLingui } from '@lingui/react';

import EditIcon from 'web-components/src/components/icons/EditIcon';
import UserAvatar from 'web-components/src/components/user/UserAvatar';

import {
  ACTION_EDIT_MY_PROFILE,
  EDIT_PROFILE,
  YOU,
} from '../ProjectCollaborators/ProjectCollaborators.constants';
import { PROJECT_CONTEXT } from './BaseMembersTable.constants';
import { BaseUser, Context } from './BaseMembersTable.types';

interface UserInfoProps<T extends BaseUser> {
  user: T;
  context: Context;
  description?: string;
  organization?: string;
  children?: React.ReactNode;
  onEditPersonalProfile?: () => void;
}

export const UserInfo = <T extends BaseUser>({
  user,
  context,
  description,
  organization,
  children,
  onEditPersonalProfile,
}: UserInfoProps<T>) => {
  const { _ } = useLingui();
  const isProjectContext = context === PROJECT_CONTEXT;
  const widthClass = isProjectContext ? 'lg:w-[330px]' : 'xl:w-[330px]';
  const mobileDotsBreakpoint = isProjectContext ? 'lg:hidden' : 'xl:hidden';

  return (
    <div
      className={`flex w-full ${widthClass} items-center justify-between px-6`}
    >
      <div className="flex items-center gap-10">
        <UserAvatar
          className="border borders-solid border-grey-300"
          size="medium"
          src={user.avatar}
          alt={user.name}
        />
        <div
          className={`flex flex-col ${
            isProjectContext ? 'pb-10 lg:pb-0' : 'gap-5 pb-10 md:pb-0'
          }`}
        >
          <span className="ml-2 flex items-center flex-row gap-5 font-bold">
            {user.name}
            {user.isCurrentUser && (
              <>
                {` ${_(YOU)}`}
                <button
                  type="button"
                  onClick={onEditPersonalProfile}
                  className="ml-1 p-0 bg-transparent border-none cursor-pointer flex items-center group"
                  aria-label={_(ACTION_EDIT_MY_PROFILE)}
                >
                  <EditIcon sx={{ height: '16px', width: '16px' }} />
                  <span className="hidden group-hover:flex text-[12px] tracking-[1px] font-[800] bg-transparent font-muli cursor-pointer text-ac-primary-500 ml-5">
                    {_(EDIT_PROFILE)}
                  </span>
                </button>
              </>
            )}
          </span>

          <span
            className={`text-sm ${
              isProjectContext ? 'text-bc-neutral-700' : 'text-bc-neutral-700'
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
      <div className={`flex h-[94px] ${mobileDotsBreakpoint}`}>{children}</div>
    </div>
  );
};
