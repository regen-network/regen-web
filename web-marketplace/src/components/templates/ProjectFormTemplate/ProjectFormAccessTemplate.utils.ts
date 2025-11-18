import {
  canAccessManageProjectWithRole,
  CanAccessManageProjectWithRoleParams,
} from 'legacy-pages/Dashboard/MyProjects/MyProjects.utils';
import {
  ROLE_ADMIN,
  ROLE_OWNER,
  ROLE_EDITOR,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';

type GetCanEditProjectParams = CanAccessManageProjectWithRoleParams & {
  isLoading: boolean;
};

export const getCanEditProject = ({
  onChainProject,
  offChainProject,
  activeAccountId,
  activeAccount,
  wallet,
  isLoading,
}: GetCanEditProjectParams) => {
  const { role } = canAccessManageProjectWithRole({
    onChainProject,
    offChainProject,
    activeAccountId,
    activeAccount,
    wallet,
  });
  return (
    role === ROLE_OWNER ||
    role === ROLE_ADMIN ||
    role === ROLE_EDITOR ||
    isLoading
  );
};
