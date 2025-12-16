import { useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { getAssignmentsWithProjectsQuery } from 'lib/queries/react-query/registry-server/graphql/getAssignmentsWithProjectQuery/getAssignmentsWithProjectsQuery';

import { useDaoOrganization } from 'hooks/useDaoOrganization';

export const useMembersProjects = (accountId?: string, disabled = false) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const dao = useDaoOrganization();

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

  // Compute projects current user is an external member of
  // (ie member is part of project DAO but not part the organization project)
  const externalMemberProjects = useMemo(
    () =>
      dao?.organizationByDaoAddress?.id
        ? // If user is part of an organization, filter out projects that belong to that organization on its user dashboard/profile
          allMemberProjects?.filter(
            project =>
              project?.organizationProjectByProjectId?.organizationId !==
              dao?.organizationByDaoAddress?.id,
          )
        : allMemberProjects,
    [allMemberProjects, dao],
  );

  return {
    externalMemberProjects,
    isAssignmentsLoading,
  };
};
