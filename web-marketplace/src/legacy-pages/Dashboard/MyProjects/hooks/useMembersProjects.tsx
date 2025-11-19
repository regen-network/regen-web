import { useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { getAssignmentsWithProjectsByAccountIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAssignmentsWithProjectQueryByAccountId.ts/getAssignmentsWithProjectQueryByAccountId';

import { useDaoOrganization } from 'hooks/useDaoOrganization';

export const useMembersProjects = (adminAccountId?: string) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const dao = useDaoOrganization();

  const { data: assignmentsData, isFetching: isAssignmentsLoading } = useQuery(
    getAssignmentsWithProjectsByAccountIdQuery({
      id: adminAccountId,
      client: graphqlClient,
      enabled: adminAccountId !== undefined,
    }),
  );
  const allMemberProjects = useMemo(
    () =>
      assignmentsData?.accountById?.assignmentsByAccountId?.nodes
        ?.map(
          assignment => assignment?.daoByDaoAddress?.projectByAdminDaoAddress,
        )
        .filter(Boolean),
    [assignmentsData],
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
    allMemberProjects,
    externalMemberProjects,
    isAssignmentsLoading,
  };
};
