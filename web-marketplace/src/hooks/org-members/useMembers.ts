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

import { AccountsOrderBy } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { getDaoByAddressWithAssignmentsQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery';

import {
  BaseMemberRole,
  Member,
} from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

export const useMembers = () => {
  const { _ } = useLingui();

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

  const daoOrganization = useDaoOrganization();

  const { data } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!daoOrganization?.address,
      address: daoOrganization?.address as string,
      daoAccountsOrderBy,
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
                  daoOrganization?.organizationByDaoAddress?.name ||
                  _(DEFAULT_NAME),
                email:
                  acc?.privateAccountById?.email ||
                  acc?.privateAccountById?.googleEmail,
                onChainRoleId: parseInt(assignment?.onChainRoleId),
              }
            : null;
        }) ?? []
      ).filter(Boolean) as Member[],
    [dao, activeAccountId, _, daoOrganization],
  );
  return {
    members,
    currentUserRole,
    daoAccountsOrderBy,
    dao,
    toggleSort,
  };
};
