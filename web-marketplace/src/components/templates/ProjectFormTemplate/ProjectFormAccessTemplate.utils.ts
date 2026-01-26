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

type GetCanManagePostParams = {
  role?: ProjectRole;
};

export const getCanManagePost = ({ role }: GetCanManagePostParams) => {
  return (
    role === ROLE_OWNER ||
    role === ROLE_ADMIN ||
    role === ROLE_EDITOR ||
    role === ROLE_AUTHOR
  );
};
