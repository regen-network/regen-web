import { useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { getAssignmentsWithProjectsQuery } from 'lib/queries/react-query/registry-server/graphql/getAssignmentsWithProjectQuery/getAssignmentsWithProjectsQuery';

import { useDaoOrganizations } from 'hooks/useDaoOrganizations';

export const useMembersProjects = (accountId?: string, disabled = false) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const daoOrganizations = useDaoOrganizations();

  const { data: assignmentsData, isFetching: isAssignmentsLoading } = useQuery(
    getAssignmentsWithProjectsQuery({
      id: accountId,
      client: graphqlClient,
      enabled: accountId !== undefined && !disabled,
    }),
  );

  const allMemberProjects = useMemo(
    () =>
      disabled
        ? []
        : assignmentsData?.accountById?.assignmentsByAccountId?.nodes
            ?.map(
              assignment =>
                assignment?.daoByDaoAddress?.projectByAdminDaoAddress,
            )
            .filter(Boolean),
    [assignmentsData, disabled],
  );

  // Build a set of all org IDs the user belongs to
  const orgIds = useMemo(
    () =>
      new Set(
        daoOrganizations
          .map(dao => dao?.organizationByDaoAddress?.id)
          .filter(Boolean),
      ),
    [daoOrganizations],
  );

  // Compute projects current user is an external member of
  // (ie member is part of project DAO but not part the organization project)
  const externalMemberProjects = useMemo(
    () =>
      orgIds.size > 0
        ? // If user is part of any organization, filter out projects that belong to those organizations on its user dashboard/profile
          allMemberProjects?.filter(
            project =>
              !orgIds.has(
                project?.organizationProjectByProjectId?.organizationId,
              ),
          )
        : allMemberProjects,
    [allMemberProjects, orgIds],
  );

  return {
    externalMemberProjects,
    isAssignmentsLoading,
  };
};
