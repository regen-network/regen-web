import { useApolloClient } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { normalizeProjectWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getProjectsByAdminQuery } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin';
import { getWalletByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getWalletByAddrQuery/getWalletByAddrQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { Project } from '../MyProjects.types';
import { useFetchProjectsWithOrders } from './useFetchProjectsWithOrders';

type Params = {
  keepUnapproved?: boolean;
  adminAddress?: string;
  adminAccountId?: string;
};

export const useFetchProjectByAdmin = ({
  keepUnapproved = true,
  adminAddress,
  adminAccountId,
}: Params) => {
  const graphqlClient = useApolloClient();

  const { ecocreditClient } = useLedger();

  const { data: walletData, isFetching: isWalletLoading } = useQuery(
    getWalletByAddrQuery({
      addr: adminAddress ?? '',
      client: graphqlClient,
      enabled: adminAddress !== undefined,
    }),
  );

  const { data: projectsData, isFetching: isOnChainProjectsLoading } = useQuery(
    getProjectsByAdminQuery({
      enabled: !!adminAddress && !!ecocreditClient,
      client: ecocreditClient,
      request: { admin: adminAddress },
    }),
  );
  const offChainProjects =
    walletData?.walletByAddr?.projectsByAdminWalletId?.nodes;

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
    adminAccountId === walletData?.walletByAddr?.partyByWalletId?.accountId
      ? offChainProjects
          ?.filter(project => !project?.onChainId)
          .filter(project => project?.approved || keepUnapproved)
      : undefined;

  const onlyOffChainProjectsWithData =
    onlyOffChainProjects?.map(project => ({
      offChain: true,
      ...normalizeProjectWithMetadata({
        offChainProject: project,
        projectMetadata: project?.metadata,
        projectPageMetadata: project?.metadata,
        programParty: project?.creditClassByCreditClassId?.partyByRegistryId,
        sanityClass: findSanityCreditClass({
          sanityCreditClassData,
          creditClassIdOrUrl:
            project?.creditClassByCreditClassId?.onChainId ??
            project?.metadata?.['regen:creditClassId'] ??
            '',
        }),
      }),
    })) ?? [];

  const projects: Project[] = [
    ...onChainProjectsWithData,
    ...onlyOffChainProjectsWithData,
  ];

  return {
    adminProjects: projects,
    walletData,
    isLoadingAdminProjects:
      isWalletLoading ||
      isOnChainProjectsLoading ||
      isProjectsMetadataLoading ||
      isClassesMetadataLoading,
  };
};
