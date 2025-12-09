import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_EDITOR,
  ROLE_OWNER,
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

type GetCanCreatePostParams = {
  role?: ProjectRole;
};

export const getCanCreatePost = ({ role }: GetCanCreatePostParams) => {
  return {
    canCreatePost:
      role === ROLE_OWNER ||
      role === ROLE_ADMIN ||
      role === ROLE_EDITOR ||
      role === ROLE_AUTHOR,
  };
};
