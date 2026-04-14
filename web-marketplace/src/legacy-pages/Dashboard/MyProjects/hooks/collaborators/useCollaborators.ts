import { useMemo } from 'react';
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
import { getAccountAssignment } from 'utils/rbam.utils';

import { truncate } from 'web-components/src/utils/truncate';

import { AccountsOrderBy } from 'generated/graphql';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';
import { getDaoByAddressWithAssignmentsQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery';
import { useWallet } from 'lib/wallet/wallet';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { Collaborator } from 'components/organisms/ProjectCollaborators/ProjectCollaborators.types';
import { useProjectOrgDao } from 'hooks/useProjectOrgDao';

export const useCollaborators = (
  project: NormalizeProject,
  daoAccountsOrderBy: AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc,
  projectOrgId?: string | null,
) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { _ } = useLingui();
  const { loginDisabled } = useWallet();

  const { activeAccountId } = useAuth();

  const {
    data: projectAssignmentsData,
    isLoading: isLoadingProjectsAssignments,
  } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!project?.adminDaoAddress,
      address: project?.adminDaoAddress as string,
      daoAccountsOrderBy,
      includePrivate: !loginDisabled,
    }),
  );

  const daoOrganization = useProjectOrgDao({ projectOrgId });

  const { data: orgAssignmentsData, isLoading: isLoadingOrgAssignments } =
    useQuery(
      getDaoByAddressWithAssignmentsQuery({
        client: graphqlClient,
        enabled: !!graphqlClient && !!daoOrganization?.address,
        address: daoOrganization?.address as string,
        includePrivate: !loginDisabled,
      }),
    );

  const orgDao = orgAssignmentsData?.daoByAddress;

  const projectDao = projectAssignmentsData?.daoByAddress;
  const activeAccountOrgAssignment = useMemo(
    () =>
      getAccountAssignment({
        accountId: activeAccountId,
        assignments: orgDao?.assignmentsByDaoAddress?.nodes,
      }),
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
            const daoOrganizationForAccount = daos?.find(
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
                    daoOrganizationForAccount?.organizationByDaoAddress?.name,
                  email:
                    acc?.privateAccountById?.email ||
                    acc?.privateAccountById?.googleEmail ||
                    truncate(acc?.addr),
                  onChainRoleId: parseInt(assignment?.onChainRoleId),
                  // current user has to be an owner or admin of the collaborator organization
                  canEditOrgRole:
                    !!daoOrganizationForAccount &&
                    !!daoOrganization &&
                    daoOrganization.address ===
                      daoOrganizationForAccount.address &&
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

  return {
    projectDao,
    collaborators,
    isLoading:
      isLoadingProjectsAssignments ||
      isLoadingOrgAssignments ||
      accountsLoading,
  };
};
