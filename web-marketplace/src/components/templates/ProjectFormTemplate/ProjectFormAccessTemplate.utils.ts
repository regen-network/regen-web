import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_EDITOR,
  ROLE_OWNER,
  ROLE_VIEWER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { ProjectRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';

type GetCanEditProjectParams = {
  role?: ProjectRole;
};

export const getCanEditProject = ({ role }: GetCanEditProjectParams) => {
  return {
    canEdit: role === ROLE_OWNER || role === ROLE_ADMIN || role === ROLE_EDITOR,
  };
};

type GetCanCreatePostParams = GetCanEditProjectParams;

export function getCanCreatePost({ role }: GetCanCreatePostParams) {
  return (
    role === ROLE_OWNER ||
    role === ROLE_ADMIN ||
    role === ROLE_EDITOR ||
    role === ROLE_AUTHOR
  );
}

type CheckPostParams = {
  role?: ProjectRole;
  creatorAccountId?: string;
  currentAccountId?: string;
};

export function getCanSeeOrManagePost({
  role,
  creatorAccountId,
  currentAccountId,
}: CheckPostParams) {
  if (
    role === ROLE_OWNER ||
    role === ROLE_ADMIN ||
    role === ROLE_EDITOR ||
    (role === ROLE_AUTHOR &&
      creatorAccountId &&
      creatorAccountId === currentAccountId)
  ) {
    return true;
  }
  return false;
}

export function getCanViewPrivatePost({
  role,
  creatorAccountId,
  currentAccountId,
}: CheckPostParams) {
  if (
    role === ROLE_OWNER ||
    role === ROLE_ADMIN ||
    role === ROLE_EDITOR ||
    role === ROLE_VIEWER ||
    (role === ROLE_AUTHOR &&
      creatorAccountId &&
      creatorAccountId === currentAccountId)
  ) {
    return true;
  }
  return false;
}

export function getCanViewDraftPost({
  role,
  creatorAccountId,
  currentAccountId,
}: CheckPostParams) {
  if (
    role === ROLE_OWNER ||
    role === ROLE_ADMIN ||
    role === ROLE_EDITOR ||
    (role === ROLE_AUTHOR &&
      creatorAccountId &&
      creatorAccountId === currentAccountId)
  ) {
    return true;
  }
  return false;
}
