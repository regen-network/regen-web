import { useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'legacy-pages/Dashboard/Dashboard.constants';

import { Loading } from 'web-components/src/components/loading';

import { AccountsOrderBy } from 'generated/graphql';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';
import { getDaoByAddressWithAssignmentsQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery';

import {
  ROLE_ADMIN,
  ROLE_EDITOR,
  ROLE_OWNER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { ProjectRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { ProjectCollaborators } from 'components/organisms/ProjectCollaborators/ProjectCollaborators';
import { Collaborator } from 'components/organisms/ProjectCollaborators/ProjectCollaborators.types';
import { useOrganizationActions } from 'components/organisms/RegistryLayout/hooks/useOrganizationActions';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

import { useUpdateCollaborators } from './hooks/collaborators';
import { useFetchProject } from './hooks/useFetchProject';
import { useMigrateProject } from './hooks/useMigrateProject';

const Collaborators = (): JSX.Element => {
  const { _ } = useLingui();
  const { project, isLoading, offChainProject } =
    useOutletContext<ReturnType<typeof useFetchProject>>();
  const { activeAccountId } = useAuth();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const navigate = useNavigate();
  const daoOrganization = useDaoOrganization();

  const [daoAccountsOrderBy, setDaoAccountsOrderBy] = useState<
    AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc
  >(AccountsOrderBy.NameAsc);

  const {
    data: projectAssignmentsData,
    isLoading: isLoadingProjectsAssignments,
  } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!project?.adminDaoAddress,
      address: project?.adminDaoAddress as string,
      daoAccountsOrderBy,
    }),
  );
  const { data: orgAssignmentsData, isLoading: isLoadingOrgAssignments } =
    useQuery(
      getDaoByAddressWithAssignmentsQuery({
        client: graphqlClient,
        enabled: !!graphqlClient && !!daoOrganization?.address,
        address: daoOrganization?.address as string,
      }),
    );

  const orgDao = orgAssignmentsData?.daoByAddress;

  const projectDao = projectAssignmentsData?.daoByAddress;
  const activeAccountOrgAssignment = useMemo(
    () =>
      orgDao?.assignmentsByDaoAddress?.nodes?.find(
        assignment => assignment?.accountId === activeAccountId,
      ),
    [orgDao, activeAccountId],
  );

  // Getting the organization that each collaborators belongs to
  const accountsResults = useQueries({
    queries:
      projectDao?.accountsByAssignmentDaoAddressAndAccountId?.nodes?.map(
        account =>
          getAccountByIdQuery({
            client: graphqlClient,
            enabled: !!graphqlClient && !!account?.id,
            id: account?.id as string,
            languageCode: selectedLanguage,
          }),
      ) || [],
  });
  const accounts = accountsResults.map(queryResult => queryResult.data);
  const accountsLoading = accountsResults.some(
    queryResult => queryResult.isLoading,
  );

  const isOrgOwnerAdmin =
    activeAccountOrgAssignment?.roleName === ROLE_OWNER ||
    activeAccountOrgAssignment?.roleName === ROLE_ADMIN;

  const collaborators = useMemo(
    () =>
      (
        projectDao?.accountsByAssignmentDaoAddressAndAccountId?.nodes?.map(
          (acc, i) => {
            const assignment = projectDao?.assignmentsByDaoAddress?.nodes?.find(
              assignment => acc?.id === assignment?.accountId,
            );
            // Find organization collaborator is part of
            const daos =
              accounts[i]?.accountById?.daosByAssignmentAccountIdAndDaoAddress
                ?.nodes;
            const accDaoOrganization = daos?.find(
              dao => !!dao?.organizationByDaoAddress,
            );

            return assignment
              ? {
                  id: acc?.id,
                  name: acc?.name || _(DEFAULT_NAME),
                  title: acc?.title,
                  avatar: acc?.image || DEFAULT_PROFILE_USER_AVATAR,
                  role: assignment?.roleName,
                  visible: assignment?.visible,
                  address: acc?.addr,
                  hasWalletAddress: !!acc?.addr,
                  isCurrentUser: acc?.id === activeAccountId,
                  organization:
                    accDaoOrganization?.organizationByDaoAddress?.name,
                  email:
                    acc?.privateAccountById?.email ||
                    acc?.privateAccountById?.googleEmail,
                  onChainRoleId: parseInt(assignment?.onChainRoleId),
                  // current user has to be an owner or admin of the collaborator organization
                  canEditOrgRole:
                    !!accDaoOrganization &&
                    !!daoOrganization &&
                    daoOrganization.address === accDaoOrganization.address &&
                    isOrgOwnerAdmin,
                }
              : null;
          },
        ) ?? []
      ).filter(Boolean) as Collaborator[],
    [
      projectDao,
      activeAccountId,
      _,
      accounts,
      daoOrganization,
      isOrgOwnerAdmin,
    ],
  );

  const { migrateProject } = useMigrateProject(project);

  const { createOrganization } = useOrganizationActions();

  const canMigrate =
    isOrgOwnerAdmin || activeAccountOrgAssignment?.roleName === ROLE_EDITOR;

  const currentUserRole = useMemo(
    () =>
      projectDao?.assignmentsByDaoAddress?.nodes?.find(
        assignment => assignment?.accountId === activeAccountId,
      )?.roleName,
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

  if (
    isLoading ||
    isLoadingProjectsAssignments ||
    isLoadingOrgAssignments ||
    accountsLoading
  ) {
    return <Loading />;
  }

  return (
    <ProjectCollaborators
      canMigrate={canMigrate}
      isProjectDao={!!projectDao}
      partOfOrganization={!!daoOrganization}
      migrateProject={project.offChainId ? migrateProject : undefined}
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
