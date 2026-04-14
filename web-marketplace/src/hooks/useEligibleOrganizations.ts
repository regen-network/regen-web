import { useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQueries } from '@tanstack/react-query';
import { getAccountAssignment } from 'utils/rbam.utils';

import { useAuth } from 'lib/auth/auth';
import { getDaoByAddressWithAssignmentsQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery';

import { useDaoOrganizations } from 'hooks/useDaoOrganizations';

/**
 * Returns the DAO organizations where the currently active account holds one
 * of the specified roles.
 *
 * For each organization returned by `useDaoOrganizations`, it fetches the RBAM
 * assignments and checks whether the active account's role is included in the
 * `roles` allowlist. Organizations whose role cannot be determined are excluded.
 *
 * @param roles - List of role names that qualify an organization as eligible
 * @returns `eligibleOrganizations` – filtered list of qualifying orgs, and
 *          `loading` – true while any assignment query is in-flight
 */
export const useEligibleOrganizations = (roles: string[]) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const daoOrganizations = useDaoOrganizations();
  const { activeAccountId } = useAuth();

  const orgsAssignmentsResults = useQueries({
    queries: daoOrganizations.map(dao =>
      getDaoByAddressWithAssignmentsQuery({
        client: graphqlClient,
        enabled: !!graphqlClient && !!dao?.address,
        address: dao?.address as string,
        includePrivate: false,
      }),
    ),
  });
  const orgsAssignmentsLoading = orgsAssignmentsResults.some(
    res => res.isLoading,
  );

  const eligibleOrganizations = useMemo(() => {
    return daoOrganizations.filter((_, i) => {
      const assignments =
        orgsAssignmentsResults[i]?.data?.daoByAddress?.assignmentsByDaoAddress
          ?.nodes;
      const role = getAccountAssignment({
        accountId: activeAccountId,
        assignments,
      })?.roleName;

      return role ? roles.includes(role) : false;
    });
  }, [daoOrganizations, orgsAssignmentsResults, activeAccountId, roles]);

  return { eligibleOrganizations, loading: orgsAssignmentsLoading };
};
