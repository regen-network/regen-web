import { useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getAccountAssignment } from 'utils/rbam.utils';

import { Loading } from 'web-components/src/components/loading';

import { AccountsOrderBy } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';

import { ROLE_EDITOR } from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { ProjectRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { ProjectCollaborators } from 'components/organisms/ProjectCollaborators/ProjectCollaborators';
import { useOrganizationActions } from 'components/organisms/RegistryLayout/hooks/useOrganizationActions';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

import { useUpdateCollaborators } from './hooks/collaborators';
import { useCollaborators } from './hooks/collaborators/useCollaborators';
import { useFetchProject } from './hooks/useFetchProject';
import { useMigrateProject } from './hooks/useMigrateProject';

const Collaborators = (): JSX.Element => {
  const { project, isLoading, offChainProject } =
    useOutletContext<ReturnType<typeof useFetchProject>>();
  const { activeAccountId } = useAuth();
  const navigate = useNavigate();
  const daoOrganization = useDaoOrganization();

  const [daoAccountsOrderBy, setDaoAccountsOrderBy] = useState<
    AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc
  >(AccountsOrderBy.NameAsc);

  const {
    projectDao,
    isOrgOwnerAdmin,
    activeAccountOrgAssignment,
    collaborators,
    isLoading: isCollaboratorsLoading,
  } = useCollaborators(project, daoAccountsOrderBy);

  const { migrateProject } = useMigrateProject(project);

  const { createOrganization } = useOrganizationActions();

  const canMigrate =
    isOrgOwnerAdmin || activeAccountOrgAssignment?.roleName === ROLE_EDITOR;

  const currentUserRole = useMemo(
    () =>
      getAccountAssignment({
        accountId: activeAccountId,
        assignments: projectDao?.assignmentsByDaoAddress?.nodes,
      })?.roleName,
    [projectDao, activeAccountId],
  ) as ProjectRole | undefined;

  const { addCollaborator, removeCollaborator, updateCollaboratorRole } =
    useUpdateCollaborators({
      currentUserRole,
      daoAddress: projectDao?.address,
      daoRbamAddress: projectDao?.daoRbamAddress,
      cw4GroupAddress: projectDao?.cw4GroupAddress,
      collaborators,
      daoAccountsOrderBy,
      offChainProject,
    });

  if (isLoading || isCollaboratorsLoading) {
    return <Loading />;
  }

  return (
    <ProjectCollaborators
      canMigrate={canMigrate}
      isProjectDao={!!projectDao}
      partOfOrganization={!!daoOrganization}
      offChainId={project.offChainId}
      migrateProject={migrateProject}
      createOrganization={createOrganization}
      collaborators={collaborators}
      sortDir={daoAccountsOrderBy}
      onToggleSort={() =>
        setDaoAccountsOrderBy(prev =>
          prev === AccountsOrderBy.NameAsc
            ? AccountsOrderBy.NameDesc
            : AccountsOrderBy.NameAsc,
        )
      }
      onAddMember={addCollaborator}
      onUpdateRole={updateCollaboratorRole}
      onRemove={removeCollaborator}
      onEditOrgRole={() => navigate(`/dashboard/organization/members`)}
    />
  );
};

export default Collaborators;
