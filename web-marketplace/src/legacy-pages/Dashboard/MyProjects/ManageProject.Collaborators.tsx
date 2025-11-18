import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
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

  const { data, isLoading: isLoadingActiveAccount } = useQuery(
    getAccountByIdQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!activeAccountId,
      id: activeAccountId,
      daoAccountsOrderBy,
      languageCode: selectedLanguage,
    }),
  );
  const activeAccount = data?.accountById;

  const projectDao = useMemo(() => {
    if (!project) return null;
    return activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes.find(
      dao =>
        dao?.projectByAdminDaoAddress?.id &&
        dao.projectByAdminDaoAddress.id === project.offChainId,
    );
  }, [project, activeAccount]);

  // TODO if not project DAO, create org or migrate to org APP-796

  const collaborators = useMemo(
    () =>
      (
        projectDao?.accountsByAssignmentDaoAddressAndAccountId?.nodes?.map(
          acc => {
            const assignment = projectDao?.assignmentsByDaoAddress?.nodes?.find(
              assignment => acc?.id === assignment?.accountId,
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
                  isCurrentUser: acc?.id === activeAccount?.id,
                  // display organization name if collaborator is part of it
                  organization:
                    dao?.accountsByAssignmentDaoAddressAndAccountId?.nodes.find(
                      accountInOrg => accountInOrg?.id === acc?.id,
                    )
                      ? dao.organizationByDaoAddress?.name
                      : '',
                  email:
                    acc?.privateAccountById?.email ||
                    acc?.privateAccountById?.googleEmail,
                  onChainRoleId: parseInt(assignment?.onChainRoleId),
                }
              : null;
          },
        ) ?? []
      ).filter(Boolean) as Collaborator[],
    [
      projectDao,
      activeAccount?.id,
      _,
      dao?.accountsByAssignmentDaoAddressAndAccountId?.nodes,
      dao?.organizationByDaoAddress?.name,
    ],
  );

  if (isLoading || isLoadingActiveAccount) {
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
