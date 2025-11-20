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

  const organizationMemberProjects = useMemo(() => {
    if (!allMemberProjects) return allMemberProjects;
    if (!externalMemberProjects?.length) return allMemberProjects;

    const externalIds = new Set(
      externalMemberProjects.map(project => project?.id).filter(id => !!id),
    );

    if (!externalIds.size) return allMemberProjects;

    return allMemberProjects.filter(project => {
      const projectId = project?.id;
      return projectId ? !externalIds.has(projectId) : true;
    });
  }, [allMemberProjects, externalMemberProjects]);

  return {
    allMemberProjects,
    externalMemberProjects,
    organizationMemberProjects,
    isAssignmentsLoading,
    organizationDaoAddress: dao?.address,
  };
};
