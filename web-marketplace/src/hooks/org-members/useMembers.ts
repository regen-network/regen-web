import { useMemo, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'legacy-pages/Dashboard/Dashboard.constants';

import { truncate } from 'web-components/src/utils/truncate';

import { AccountsOrderBy } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { getDaoByAddressWithAssignmentsQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery';
import { useWallet } from 'lib/wallet/wallet';

import {
  BaseMemberRole,
  Member,
} from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { useDaoOrganizations } from 'hooks/useDaoOrganizations';

export const useMembers = ({ orgAddress }: { orgAddress?: string }) => {
  const { _ } = useLingui();
  const { loginDisabled } = useWallet();
  const daoOrganizations = useDaoOrganizations();
  const currentDaoOrganization = useMemo(
    () => daoOrganizations.find(dao => dao?.address === orgAddress),
    [daoOrganizations, orgAddress],
  );

  const [daoAccountsOrderBy, setDaoAccountsOrderBy] = useState<
    AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc
  >(AccountsOrderBy.NameAsc);

  const toggleSort = () => {
    setDaoAccountsOrderBy(prev =>
      prev === AccountsOrderBy.NameAsc
        ? AccountsOrderBy.NameDesc
        : AccountsOrderBy.NameAsc,
    );
  };

  const { activeAccountId } = useAuth();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!orgAddress,
      address: orgAddress as string,
      daoAccountsOrderBy,
      includePrivate: !loginDisabled,
    }),
  );

  const dao = data?.daoByAddress;

  const currentUserRole = useMemo(
    () =>
      dao?.assignmentsByDaoAddress?.nodes?.find(
        assignment => assignment?.accountId === activeAccountId,
      )?.roleName,
    [dao, activeAccountId],
  ) as BaseMemberRole | undefined;

  const members = useMemo(
    () =>
      (
        dao?.accountsByAssignmentDaoAddressAndAccountId?.nodes?.map(acc => {
          const assignment = dao?.assignmentsByDaoAddress?.nodes?.find(
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
                isCurrentUser: acc?.id === activeAccountId,
                organization:
                  currentDaoOrganization?.organizationByDaoAddress?.name ||
                  _(DEFAULT_NAME),
                email:
                  acc?.privateAccountById?.email ||
                  acc?.privateAccountById?.googleEmail ||
                  truncate(acc?.addr),
                onChainRoleId: parseInt(assignment?.onChainRoleId),
              }
            : null;
        }) ?? []
      ).filter(Boolean) as Member[],
    [dao, activeAccountId, _, currentDaoOrganization],
  );
  return {
    members,
    currentUserRole,
    daoAccountsOrderBy,
    dao,
    toggleSort,
  };
};
