import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
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

import { useFetchProject } from './hooks/useFetchProject';
import { useMigrateProject } from './hooks/useMigrateProject';

const Collaborators = (): JSX.Element => {
  const { _ } = useLingui();
  const { project, isLoading } =
    useOutletContext<ReturnType<typeof useFetchProject>>();
  const { activeAccountId } = useAuth();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const [daoAccountsOrderBy, setDaoAccountsOrderBy] = useState<
    AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc
  >(AccountsOrderBy.NameAsc);

  const daoOrganization = useDaoOrganization();

  const { data: projectDaoData, isLoading: isLoadingAssignments } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!project?.adminDaoAddress,
      address: project?.adminDaoAddress as string,
      daoAccountsOrderBy,
    }),
  );
  const { data: organizationDaoData } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!daoOrganization?.address,
      address: daoOrganization?.address as string,
    }),
  );

  const projectDao = projectDaoData?.daoByAddress;
  const activeAccountOrgAssignment = useMemo(
    () =>
      organizationDaoData?.daoByAddress?.assignmentsByDaoAddress?.nodes?.find(
        assignment => assignment?.accountId === activeAccountId,
      ),
    [organizationDaoData, activeAccountId],
  );

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
            const daoOrganization = daos?.find(
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
                  organization: daoOrganization?.organizationByDaoAddress?.name,
                  email:
                    acc?.privateAccountById?.email ||
                    acc?.privateAccountById?.googleEmail,
                  onChainRoleId: parseInt(assignment?.onChainRoleId),
                }
              : null;
          },
        ) ?? []
      ).filter(Boolean) as Collaborator[],
    [projectDao, activeAccountId, _, accounts],
  );

  const { migrateProject } = useMigrateProject(project);

  const { createOrganization } = useOrganizationActions();

  const canMigrate =
    activeAccountOrgAssignment?.roleName === ROLE_OWNER ||
    activeAccountOrgAssignment?.roleName === ROLE_ADMIN ||
    activeAccountOrgAssignment?.roleName === ROLE_EDITOR;

  if (isLoading || accountsLoading) {
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
      onToggleSort={() =>
        setDaoAccountsOrderBy(prev =>
          prev === AccountsOrderBy.NameAsc
            ? AccountsOrderBy.NameDesc
            : AccountsOrderBy.NameAsc,
        )
      }
      // TODO APP-791
      onInvite={function (): void {}}
      onUpdateRole={function (id: string, role: ProjectRole): void {}}
      onRemove={function (id: string): void {}}
      onEditOrgRole={function (): void {}}
    />
  );
};

export default Collaborators;
