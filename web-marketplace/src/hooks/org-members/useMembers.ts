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
import { ROLE_HIERARCHY } from 'components/organisms/BaseRoleDropdown/BaseRoleDropdown.constants';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

export const useMembers = () => {
  const { _ } = useLingui();
  const { loginDisabled } = useWallet();

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
      includePrivate: !loginDisabled,
    }),
  );

  const dao = data?.daoByAddress;

  const assignmentsByAccountId = useMemo(() => {
    const assignments = dao?.assignmentsByDaoAddress?.nodes ?? [];
    type Assignment = NonNullable<typeof assignments[number]>;

    return assignments.reduce((map, assignment) => {
      if (!assignment?.accountId || !assignment?.roleName) return map;

      const assignmentRole = assignment.roleName as BaseMemberRole;
      const currentAssignment = map.get(assignment.accountId);
      const currentAssignmentRole = currentAssignment?.roleName as
        | BaseMemberRole
        | undefined;

      if (
        !currentAssignment ||
        !currentAssignmentRole ||
        ROLE_HIERARCHY[assignmentRole] > ROLE_HIERARCHY[currentAssignmentRole]
      ) {
        map.set(assignment.accountId, assignment);
      }

      return map;
    }, new Map<string, Assignment>());
  }, [dao?.assignmentsByDaoAddress?.nodes]);

  const currentUserRole = useMemo(
    () => assignmentsByAccountId.get(activeAccountId ?? '')?.roleName,
    [assignmentsByAccountId, activeAccountId],
  ) as BaseMemberRole | undefined;

  const members = useMemo(
    () =>
      (
        dao?.accountsByAssignmentDaoAddressAndAccountId?.nodes?.map(acc => {
          const assignment = assignmentsByAccountId.get(acc?.id ?? '');
          return assignment
            ? {
                id: acc?.id,
                name: acc?.name || _(DEFAULT_NAME),
                title: acc?.title,
                avatar: acc?.image || DEFAULT_PROFILE_USER_AVATAR,
                role: assignment.roleName as BaseMemberRole,
                visible: assignment.visible,
                address: acc?.addr,
                hasWalletAddress: !!acc?.addr,
                isCurrentUser: acc?.id === activeAccountId,
                organization:
                  daoOrganization?.organizationByDaoAddress?.name ||
                  _(DEFAULT_NAME),
                email:
                  acc?.privateAccountById?.email ||
                  acc?.privateAccountById?.googleEmail ||
                  truncate(acc?.addr),
                onChainRoleId: parseInt(assignment.onChainRoleId),
              }
            : null;
        }) ?? []
      ).filter(Boolean) as Member[],
    [dao, assignmentsByAccountId, activeAccountId, _, daoOrganization],
  );

  return {
    members,
    currentUserRole,
    daoAccountsOrderBy,
    dao,
    toggleSort,
  };
};
