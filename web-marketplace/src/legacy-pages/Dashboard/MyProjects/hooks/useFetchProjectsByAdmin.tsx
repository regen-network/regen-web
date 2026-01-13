import { useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useProfileData } from 'legacy-pages/Profile/hooks/useProfileData';

import { ProjectFieldsFragment } from 'generated/graphql';
import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/apolloSanity';
import {
  NormalizeProject,
  normalizeProjectWithMetadata,
} from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getProjectsByAdminQuery } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin';
import { getAccountProjectsByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/sanity/getProjectByIdQuery/getProjectByIdQuery';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { useFetchProjectsWithOrders } from './useFetchProjectsWithOrders';
import { useMembersProjects } from './useMembersProjects';

type Params = {
  keepUnpublished?: boolean;
  adminAddress?: string | null;
  adminAccountId?: string;
  organization?: ReturnType<typeof useProfileData>['organization'];
  isLoading?: boolean;
  withExternalMemberProjects?: boolean;
};

export const useFetchProjectByAdmin = ({
  keepUnpublished = false,
  adminAddress,
  adminAccountId,
  organization,
  isLoading,
  withExternalMemberProjects = true,
}: Params) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { queryClient } = useLedger();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  // Off chain projects
  // for account
  const { data: accountData, isFetching: isAccountLoading } = useQuery(
    getAccountProjectsByIdQuery({
      id: adminAccountId,
      client: graphqlClient,
      enabled: adminAccountId !== undefined && !organization && !isLoading,
      languageCode: selectedLanguage,
    }),
  );

  // Get projects current user is an external member of
  const { externalMemberProjects, isAssignmentsLoading } = useMembersProjects(
    adminAccountId,
    !withExternalMemberProjects,
  );

  // or for organization
  const orgOffChainProjects = organization
    ? organization.organizationProjectsByOrganizationId.nodes.map(
        node => node?.projectByProjectId,
      )
    : accountData?.data?.accountById?.projectsByAdminAccountId?.nodes;

  // On chain projects
  // for account

  // Get on chain projects data for externalMemberProjects
  const externalMemberProjectsRes = useQueries({
    queries:
      externalMemberProjects?.map(project =>
        getProjectQuery({
          enabled: !!project?.onChainId && !!queryClient,
          client: queryClient,
          request: {
            projectId: project?.onChainId as string,
          },
        }),
      ) || [],
  });
  const externalMemberOnChainProjects = externalMemberProjectsRes
    .map(projectRes => {
      return projectRes.data?.project;
    })
    .filter(Boolean) as ProjectInfo[];

  const { data: projectsData, isFetching: isOnChainProjectsLoading } = useQuery(
    getProjectsByAdminQuery({
      enabled: !!adminAddress && !!queryClient && !organization && !isLoading,
      client: queryClient,
      request: { admin: adminAddress as string },
    }),
  );

  // or for organization
  const orgProjectsRes = useQueries({
    queries:
      organization?.organizationProjectsByOrganizationId.nodes?.map(project =>
        getProjectQuery({
          enabled: !!project?.projectByProjectId?.onChainId && !!queryClient,
          client: queryClient,
          request: {
            projectId: project?.projectByProjectId?.onChainId as string,
          },
        }),
      ) || [],
  });
  const orgProjects = orgProjectsRes
    .map(projectRes => {
      return projectRes.data?.project;
    })
    .filter(Boolean) as ProjectInfo[];
  const isLoadingProjectsRes = orgProjectsRes.some(res => res.isLoading);

  const offChainProjects = organization
    ? orgOffChainProjects
    : ([
        ...(accountData?.data?.accountById?.projectsByAdminAccountId?.nodes ??
          []),
        ...(externalMemberProjects ? externalMemberProjects : []),
      ] as ProjectFieldsFragment[]);

  const { data: sanityCreditClassData } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  // Get data for on chain projects
  const onChainProjects = [
    ...(projectsData?.projects ? projectsData?.projects : []),
    ...externalMemberOnChainProjects,
  ];
  const {
    projects: onChainProjectsWithData,
    isProjectsMetadataLoading,
    isClassesMetadataLoading,
  } = useFetchProjectsWithOrders({
    projects: organization ? orgProjects : onChainProjects,
    offChainProjects,
    sanityCreditClassData,
  });

  // Get data for projects that are only off chain
  const onlyOffChainProjects = offChainProjects?.filter(
    project => !project?.onChainId && (project?.published || keepUnpublished),
  );

  // Sanity projects
  const sanityProjectsResults = useQueries({
    queries:
      onlyOffChainProjects?.map(project => {
        const id = project?.slug || project?.id;
        return getProjectByIdQuery({
          id,
          sanityClient,
          languageCode: selectedLanguage,
          enabled: !!sanityClient && !!id,
        });
      }) || [],
  });
  const sanityProjects = sanityProjectsResults.map(res => {
    return res.data?.allProject?.[0];
  });
  const sanityProjectsLoading = sanityProjectsResults.some(
    res => res.isLoading,
  );

  const onlyOffChainProjectsWithData = useMemo(() => {
    return (
      onlyOffChainProjects?.map((project, index) => {
        const sanityProject = sanityProjects?.[index];

        return normalizeProjectWithMetadata({
          offChainProject: project,
          projectMetadata: project?.metadata,
          projectPageMetadata: project?.metadata,
          programAccount:
            project?.creditClassByCreditClassId?.accountByRegistryId,
          sanityClass: findSanityCreditClass({
            sanityCreditClassData,
            creditClassIdOrUrl:
              project?.creditClassByCreditClassId?.onChainId ??
              project?.metadata?.['regen:creditClassId'] ??
              '',
          }),
          sanityProject,
        });
      }) ?? []
    );
  }, [onlyOffChainProjects, sanityProjects, sanityCreditClassData]);

  const projects = [
    ...onChainProjectsWithData,
    ...onlyOffChainProjectsWithData,
  ];
  return {
    adminProjects: projects as NormalizeProject[],
    accountData,
    isLoadingAdminProjects:
      isAccountLoading ||
      isOnChainProjectsLoading ||
      isProjectsMetadataLoading ||
      isClassesMetadataLoading ||
      sanityProjectsLoading ||
      isLoadingProjectsRes ||
      isAssignmentsLoading,
  };
};
