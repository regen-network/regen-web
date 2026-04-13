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
import { useDaoOrganizations } from 'hooks/useDaoOrganizations';

import { useUpdateCollaborators } from './hooks/collaborators';
import { useCollaborators } from './hooks/collaborators/useCollaborators';
import { useFetchProject } from './hooks/useFetchProject';
import { useMigrateProject } from './hooks/useMigrateProject';

const Collaborators = (): JSX.Element => {
  const { project, isDraftOnChainProject, isLoading, offChainProject } =
    useOutletContext<ReturnType<typeof useFetchProject>>();
  const { activeAccountId } = useAuth();
  const navigate = useNavigate();
  const daoOrganizations = useDaoOrganizations();

  const [daoAccountsOrderBy, setDaoAccountsOrderBy] = useState<
    AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc
  >(AccountsOrderBy.NameAsc);

  const projectOrgId =
    offChainProject?.organizationProjectByProjectId?.organizationId;

  const {
    projectDao,
    isOrgOwnerAdmin,
    activeAccountOrgAssignment,
    collaborators,
    isLoading: isCollaboratorsLoading,
  } = useCollaborators(project, daoAccountsOrderBy, projectOrgId);

  const { migrateProject } = useMigrateProject({
    project,
    navigateToOrg: true,
  });

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
      organizations={daoOrganizations}
      offChainId={project.offChainId}
      isDraftOnChainProject={isDraftOnChainProject}
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
      onEditOrgRole={() => {
        const orgDao = daoOrganizations.find(
          dao => dao?.organizationByDaoAddress?.id === projectOrgId,
        );
        const orgAddress = orgDao?.address ?? daoOrganizations[0]?.address;
        navigate(`/dashboard/organization/${orgAddress}/members`);
      }}
      currentDaoAddress={projectDao?.address}
    />
  );
};

export default Collaborators;
