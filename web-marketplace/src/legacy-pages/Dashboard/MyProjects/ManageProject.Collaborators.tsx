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

import { ProjectRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { ProjectCollaborators } from 'components/organisms/ProjectCollaborators/ProjectCollaborators';
import { Collaborator } from 'components/organisms/ProjectCollaborators/ProjectCollaborators.types';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

import { useFetchProject } from './hooks/useFetchProject';

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

  const dao = useDaoOrganization();

  const { data, isLoading: isLoadingAssignments } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!project?.adminDaoAddress,
      address: project?.adminDaoAddress as string,
      daoAccountsOrderBy,
    }),
  );

  const projectDao = data?.daoByAddress;

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

  // TODO if not project DAO, show create org or migrate to org APP-796

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

  if (isLoading || isLoadingAssignments || accountsLoading) {
    return <Loading />;
  }

  return (
    <>
      <ProjectCollaborators
        collaborators={collaborators}
        // TODO after merging https://github.com/regen-network/regen-web/pull/2741
        onToggleSort={function (): void {}}
        // TODO APP-791
        onInvite={function (): void {}}
        onUpdateRole={function (id: string, role: ProjectRole): void {}}
        onRemove={function (id: string): void {}}
        onEditOrgRole={function (): void {}}
      />
    </>
  );
};

export default Collaborators;
