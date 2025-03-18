import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import {
  NormalizeProject,
  normalizeProjectWithMetadata,
} from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getProjectsByAdminQuery } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin';
import { getAccountProjectsByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/sanity/getProjectByIdQuery/getProjectByIdQuery';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { useFetchProjectsWithOrders } from './useFetchProjectsWithOrders';

type Params = {
  keepUnpublished?: boolean;
  adminAddress?: string | null;
  adminAccountId?: string;
};

export const useFetchProjectByAdmin = ({
  keepUnpublished = false,
  adminAddress,
  adminAccountId,
}: Params) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { queryClient } = useLedger();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { data: accountData, isFetching: isAccountLoading } = useQuery(
    getAccountProjectsByIdQuery({
      id: adminAccountId,
      client: graphqlClient,
      enabled: adminAccountId !== undefined,
      languageCode: selectedLanguage,
    }),
  );

  const { data: projectsData, isFetching: isOnChainProjectsLoading } = useQuery(
    getProjectsByAdminQuery({
      enabled: !!adminAddress && !!queryClient,
      client: queryClient,
      request: { admin: adminAddress as string },
    }),
  );
  const offChainProjects =
    accountData?.data?.accountById?.projectsByAdminAccountId?.nodes;

  const { data: sanityCreditClassData } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  // Get data for on chain projects
  const {
    projects: onChainProjectsWithData,
    isProjectsMetadataLoading,
    isClassesMetadataLoading,
  } = useFetchProjectsWithOrders({
    projects: projectsData?.projects,
    offChainProjects,
    sanityCreditClassData,
  });

  // Get data for projects that are only off chain
  const onlyOffChainProjects =
    adminAccountId === accountData?.data?.accountById?.id
      ? offChainProjects?.filter(
          project =>
            !project?.onChainId && (project?.published || keepUnpublished),
        )
      : undefined;

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

  const onlyOffChainProjectsWithData =
    onlyOffChainProjects?.map((project, index) => {
      const sanityProject = sanityProjects?.[index];

      return {
        offChain: true,
        published: !!project?.published,
        ...normalizeProjectWithMetadata({
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
        }),
      };
    }) ?? [];

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
      sanityProjectsLoading,
  };
};
