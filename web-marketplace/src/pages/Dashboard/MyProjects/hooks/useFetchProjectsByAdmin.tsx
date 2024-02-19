import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { normalizeProjectWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getProjectsByAdminQuery } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin';
import { getAccountProjectsByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllSanityPrefinanceProjectsQuery } from 'lib/queries/react-query/sanity/getAllPrefinanceProjectsQuery/getAllPrefinanceProjectsQuery';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { useFetchProjectsWithOrders } from './useFetchProjectsWithOrders';

type Params = {
  keepUnapproved?: boolean;
  adminAddress?: string | null;
  adminAccountId?: string;
};

export const useFetchProjectByAdmin = ({
  keepUnapproved = true,
  adminAddress,
  adminAccountId,
}: Params) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { ecocreditClient } = useLedger();

  const { data: accountData, isFetching: isAccountLoading } = useQuery(
    getAccountProjectsByIdQuery({
      id: adminAccountId,
      client: graphqlClient,
      enabled: adminAccountId !== undefined,
    }),
  );

  const { data: projectsData, isFetching: isOnChainProjectsLoading } = useQuery(
    getProjectsByAdminQuery({
      enabled: !!adminAddress && !!ecocreditClient,
      client: ecocreditClient,
      request: { admin: adminAddress as string },
    }),
  );
  const offChainProjects =
    accountData?.accountById?.projectsByAdminAccountId?.nodes;

  const { data: sanityCreditClassData } = useQuery(
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
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
    adminAccountId === accountData?.accountById?.id
      ? offChainProjects
          ?.filter(project => !project?.onChainId)
          .filter(project => project?.approved || keepUnapproved)
      : undefined;

  // Sanity prefinance projects
  const {
    data: prefinanceProjectsData,
    isFetching: isLoadingPrefinanceProjects,
  } = useQuery(
    getAllSanityPrefinanceProjectsQuery({
      sanityClient,
      enabled:
        !!sanityClient &&
        onlyOffChainProjects &&
        onlyOffChainProjects?.length > 0,
    }),
  );

  const onlyOffChainProjectsWithData =
    onlyOffChainProjects?.map(project => {
      const prefinanceProject = prefinanceProjectsData?.allProject?.find(
        sanityProject =>
          sanityProject.projectId === project?.id ||
          sanityProject.projectId === project?.slug,
      );

      return {
        offChain: true,
        published: project?.published,
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
          projectPrefinancing: prefinanceProject?.projectPrefinancing,
        }),
      };
    }) ?? [];

  const projects = [
    ...onChainProjectsWithData,
    ...onlyOffChainProjectsWithData,
  ];

  return {
    adminProjects: projects,
    accountData,
    isLoadingAdminProjects:
      isAccountLoading ||
      isOnChainProjectsLoading ||
      isProjectsMetadataLoading ||
      isClassesMetadataLoading ||
      isLoadingPrefinanceProjects,
  };
};
