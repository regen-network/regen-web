import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { GECKO_EEUR_ID, GECKO_USDC_ID } from 'lib/coingecko';
import { normalizeProjectsWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { normalizeProjectsWithOrderData } from 'lib/normalizers/projects/normalizeProjectsWithOrderData';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getProjectsByClassQuery } from 'lib/queries/react-query/ecocredit/getProjectsByClass/getProjectsByClassQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { useWallet } from 'lib/wallet/wallet';

import { ProjectsSellOrders } from 'pages/Projects/hooks/useProjectsSellOrders';
import { sortProjects } from 'pages/Projects/utils/sortProjects';

import { selectProjects } from './useProjectsWithOrders.utils';

export interface ProjectsWithOrdersProps {
  limit?: number;
  offset?: number;
  metadata?: boolean; // to discard projects without metadata prop
  random?: boolean; // to shuffle the projects (along with limit allows a random subselection)
  projectId?: string; // to discard an specific project
  classId?: string; // to filter by class
  sort?: string;
}

/**
 * Get projects and sell orders and merge them both normalizing
 */
export function useProjectsWithOrders({
  limit,
  offset = 0,
  metadata = false,
  random = false,
  projectId,
  classId,
  sort = '',
}: ProjectsWithOrdersProps): ProjectsSellOrders {
  const { ecocreditClient, marketplaceClient } = useLedger();

  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();

  /* Main Queries */

  const { data: projectsData, isFetching: isLoadingProjects } = useQuery(
    getProjectsQuery({
      enabled: !classId && !!ecocreditClient,
      client: ecocreditClient,
      request: {},
    }),
  );

  const { data: projectsByClassData, isFetching: isLoadingProjectsByClass } =
    useQuery(
      getProjectsByClassQuery({
        enabled: !!classId && !!ecocreditClient,
        client: ecocreditClient,
        request: { classId },
      }),
    );

  const simplePrice = useQuery(getSimplePriceQuery({}));
  const { data: sellOrders } = useQuery(
    getSellOrdersExtendedQuery({
      enabled: !!marketplaceClient,
      client: marketplaceClient,
      reactQueryClient,
      request: {},
    }),
  );

  /* Normalization/Filtering/Sorting */

  const projects = projectsData?.projects ?? projectsByClassData?.projects;
  const selectedProjects =
    selectProjects({
      projects,
      sellOrders,
      metadata,
      random,
      projectId,
    }) ?? [];
  const projectsWithOrderData = normalizeProjectsWithOrderData({
    projects: selectedProjects,
    sellOrders,
    geckoPrices: {
      regenPrice: simplePrice?.data?.regen?.usd,
      eeurPrice: simplePrice?.data?.[GECKO_EEUR_ID]?.usd,
      usdcPrice: simplePrice?.data?.[GECKO_USDC_ID]?.usd,
    },
    userAddress: wallet?.address,
  });
  const sortedProjects = sortProjects(projectsWithOrderData, sort).slice(
    offset,
    limit ? offset + limit : undefined,
  );

  /* Metadata queries */

  const metadataResults = useQueries({
    queries: sortedProjects.map(project =>
      getMetadataQuery({ iri: project.metadata }),
    ),
  });
  const metadatas = metadataResults.map(queryResult => queryResult.data);

  /* Final Normalization */

  const projectsWithMetadata = normalizeProjectsWithMetadata({
    projectsWithOrderData: sortedProjects,
    metadatas,
  });

  return {
    projectsWithOrderData: projectsWithMetadata,
    projectsCount: projects?.length,
    loading: isLoadingProjects || isLoadingProjectsByClass,
  };
}
