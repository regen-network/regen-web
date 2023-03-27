import { useApolloClient } from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { GECKO_EEUR_ID, GECKO_USDC_ID } from 'lib/coingecko';
import { normalizeProjectsWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { normalizeProjectsWithOrderData } from 'lib/normalizers/projects/normalizeProjectsWithOrderData';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getProjectsByClassQuery } from 'lib/queries/react-query/ecocredit/getProjectsByClass/getProjectsByClassQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { useWallet } from 'lib/wallet/wallet';

import { ProjectsSellOrders } from 'pages/Projects/hooks/useProjectsSellOrders';
import { sortProjects } from 'pages/Projects/utils/sortProjects';

import { useLastRandomProjects } from './useLastRandomProjects';
import { selectProjects } from './useProjectsWithOrders.utils';

export interface ProjectsWithOrdersProps {
  limit?: number;
  offset?: number;
  metadata?: boolean; // to discard projects without metadata prop
  random?: boolean; // to shuffle the projects (along with limit allows a random subselection)
  projectId?: string; // to filter by project
  skippedProjectId?: string; // to discard a specific project
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
  skippedProjectId,
  classId,
  sort = '',
  projectId,
}: ProjectsWithOrdersProps): ProjectsSellOrders {
  const { ecocreditClient, marketplaceClient } = useLedger();

  const graphqlClient = useApolloClient();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();

  /* Main Queries */

  const { data: projectData, isFetching: isLoadingProject } = useQuery(
    getProjectQuery({
      enabled: !!projectId && !!ecocreditClient,
      client: ecocreditClient,
      request: { projectId },
    }),
  );
  const projectArray = projectData?.project
    ? [projectData?.project]
    : undefined;

  const { data: projectsData, isFetching: isLoadingProjects } = useQuery(
    getProjectsQuery({
      enabled: !classId && !projectId && !!ecocreditClient,
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

  // AllCreditClasses
  const { data: creditClassData } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  /* Normalization/Filtering/Sorting */

  let projects: ProjectInfo[] | undefined;
  if (projectId) {
    projects = projectArray;
  } else if (classId) {
    projects = projectsByClassData?.projects;
  } else {
    projects = projectsData?.projects;
  }

  const selectedProjects =
    selectProjects({
      projects,
      sellOrders,
      metadata,
      random,
      skippedProjectId,
    }) ?? [];

  const lastRandomProjects = useLastRandomProjects({
    random,
    selectedProjects,
  });
  const projectsWithOrderData = normalizeProjectsWithOrderData({
    projects: lastRandomProjects ?? selectedProjects,
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

  const offChainProjectResults = useQueries({
    queries: sortedProjects.map(project =>
      getProjectByOnChainIdQuery({
        client: graphqlClient,
        onChainId: project.id,
      }),
    ),
  });
  const projectPageMetadatas = offChainProjectResults.map(
    queryResult => queryResult.data?.data.projectByOnChainId?.metadata,
  );

  /* Final Normalization */

  const projectsWithMetadata = normalizeProjectsWithMetadata({
    projectsWithOrderData: sortedProjects,
    metadatas,
    projectPageMetadatas,
    sanityCreditClassData: creditClassData,
  });

  return {
    projectsWithOrderData: projectsWithMetadata,
    projectsCount: projects?.length,
    loading: isLoadingProjects || isLoadingProjectsByClass || isLoadingProject,
  };
}
