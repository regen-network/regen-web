import { useMemo } from 'react';
import { useApolloClient } from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { UNREGISTERED_PATH } from 'legacy-pages/Projects/AllProjects/AllProjects.constants';
import { ProjectWithOrderData } from 'legacy-pages/Projects/AllProjects/AllProjects.types';
import {
  sortPinnedProject,
  sortProjects,
} from 'legacy-pages/Projects/AllProjects/utils/sortProjects';
import { useOffChainProjects } from 'legacy-pages/Projects/hooks/useOffChainProjects';
import { ProjectsSellOrders } from 'legacy-pages/Projects/hooks/useProjectsSellOrders.types';
import {
  CREDIT_CARD_BUYING_OPTION_ID,
  CRYPTO_BUYING_OPTION_ID,
} from 'legacy-pages/Projects/Projects.constants';

import { Account } from 'web-components/src/components/user/UserInfo';

import { QueryClient, useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { IS_REGEN, IS_TERRASOS, SKIPPED_CLASS_ID } from 'lib/env';
import {
  getCardSellOrders,
  NormalizeProject,
  normalizeProjectsWithMetadata,
} from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { normalizeProjectsWithOrderData } from 'lib/normalizers/projects/normalizeProjectsWithOrderData';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getProjectsByAdminQuery } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin';
import { getProjectsByClassQuery } from 'lib/queries/react-query/ecocredit/getProjectsByClass/getProjectsByClassQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllSanityProjectsQuery } from 'lib/queries/react-query/sanity/getAllProjectsQuery/getAllProjectsQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/sanity/getProjectByIdQuery/getProjectByIdQuery';
import { useWallet } from 'lib/wallet/wallet';

import { useClassesWithMetadata } from 'hooks/classes/useClassesWithMetadata';

import { useLastRandomProjects } from './useLastRandomProjects';
import { selectProjects } from './useProjectsWithOrders.utils';

export interface ProjectsWithOrdersProps {
  limit?: number;
  offset?: number;
  metadata?: boolean; // to discard projects without metadata prop
  random?: boolean; // to shuffle the projects (along with limit allows a random subselection)
  showCommunityProjects?: boolean; // to show community projects
  projectId?: string; // to filter by project
  skippedProjectId?: string; // to discard a specific project
  classId?: string; // to filter by class
  sortPinnedIds?: string[]; // list of on-chain id, uuid or slug to pinned at the top if `sort` set to 'featured-projects'
  pinnedIds?: string[]; // list of on-chain id, uuid or slug to pinned at the top
  sort?: string;
  creditClassFilter?: Record<string, boolean>;
  showOffChainProjects?: boolean;
  enableOffchainProjectsQuery?: boolean;
  regionFilter?: Record<string, boolean>;
  environmentTypeFilter?: Record<string, boolean>;
  marketTypeFilter?: Record<string, boolean>;
  buyingOptionsFilters?: Record<string, boolean>;
  isOffChainProject?: boolean;
  projectSlugOrId?: string;
  projectAdmin?: Account;
}

/**
 * Get projects and sell orders and merge them both normalizing
 */
export function useProjectsWithOrders({
  limit,
  offset = 0,
  metadata = false,
  random = false,
  showCommunityProjects = false,
  skippedProjectId,
  classId,
  pinnedIds,
  sortPinnedIds,
  sort = '',
  projectId,
  creditClassFilter = {},
  showOffChainProjects = false,
  enableOffchainProjectsQuery = true,
  regionFilter = {},
  environmentTypeFilter = {},
  marketTypeFilter = { COMPLIANCE_MARKET: true, VOLUNTARY_MARKET: true },
  buyingOptionsFilters = {},
  isOffChainProject = false,
  // projectSlugOrId is provided from useGetProject which already fetches the individual off-chain project,
  // so we don't have to fetch all off chain projects to find the project slug in this hook
  projectSlugOrId,
  projectAdmin,
}: ProjectsWithOrdersProps): ProjectsSellOrders {
  const { queryClient } = useLedger();
  const graphqlClient = useApolloClient();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const adminAddr = projectAdmin?.address;
  const adminId = projectAdmin?.id;

  /* Main Queries */

  const { data: projectsByAdminData, isFetching: isLoadingProjectsByAdmin } =
    useQuery(
      getProjectsByAdminQuery({
        enabled: !!adminAddr && !!queryClient,
        client: queryClient,
        request: { admin: adminAddr as string },
      }),
    );
  const projectsByAdmin = projectsByAdminData?.projects?.filter(
    project => !skippedProjectId || project.id !== skippedProjectId,
  );
  const enoughProjectsByAdmin =
    !!projectsByAdmin && !!limit && projectsByAdmin.length >= limit;

  const { data: projectData, isFetching: isLoadingProject } = useQuery(
    getProjectQuery({
      enabled: !!projectId && !!queryClient,
      client: queryClient,
      request: { projectId: projectId as string },
    }),
  );
  const projectArray = projectData?.project
    ? [projectData?.project]
    : undefined;

  const { data: projectsData, isFetching: isLoadingProjects } = useQuery(
    getProjectsQuery({
      enabled:
        !isOffChainProject &&
        !classId &&
        !projectId &&
        !!queryClient &&
        // if we've found enough projects by given admin, we do not need to fetch for other projects
        !enoughProjectsByAdmin,
      client: queryClient,
      request: {},
    }),
  );

  const { data: projectsByClassData, isFetching: isLoadingProjectsByClass } =
    useQuery(
      getProjectsByClassQuery({
        enabled: !!classId && !!queryClient,
        client: queryClient,
        request: { classId: classId as string },
      }),
    );

  const { data: sellOrders, isLoading: isLoadingSellOrders } = useQuery(
    getSellOrdersExtendedQuery({
      enabled: !isOffChainProject && !!queryClient,
      client: queryClient as QueryClient,
      reactQueryClient,
      request: {},
    }),
  );

  // Sanity credit classes
  const { data: creditClassData, isFetching: isLoadingSanityCreditClasses } =
    useQuery(
      getAllSanityCreditClassesQuery({
        sanityClient,
        enabled: !isOffChainProject && !!sanityClient,
        languageCode: selectedLanguage,
      }),
    );

  // Sanity projects
  const { data: sanityProjectsData, isFetching: isLoadingSanityProjects } =
    useQuery(
      getAllSanityProjectsQuery({
        sanityClient,
        enabled: !isOffChainProject && !!sanityClient,
        languageCode: selectedLanguage,
      }),
    );

  // OffChainProjects
  const limitOffChainProjects = limit
    ? projectsByAdmin
      ? limit - projectsByAdmin.length
      : limit
    : undefined;
  const { allOffChainProjects, isAllOffChainProjectsLoading } =
    useOffChainProjects({
      sanityCreditClassesData: creditClassData,
      enabled:
        enableOffchainProjectsQuery &&
        !enoughProjectsByAdmin &&
        !projectSlugOrId,
      sanityProjectsData,
      adminId,
      limitOffChainProjects,
      random,
      skippedProjectId,
    });
  const onlyOffChainProjects = allOffChainProjects.filter(
    project =>
      project.offChain &&
      (!skippedProjectId || skippedProjectId !== project.id),
  );

  /* Normalization/Filtering/Sorting */

  let projects: ProjectInfo[] | undefined;
  if (projectId) {
    projects = projectArray;
  } else if (classId) {
    projects = projectsByClassData?.projects;
  } else if (adminAddr && enoughProjectsByAdmin) {
    projects = projectsByAdmin;
  } else {
    projects = projectsData?.projects;
  }

  const onChainIdsFromOffChainProjects = allOffChainProjects.map(
    project => project.onChainId,
  );
  const clientProjects = projects?.filter(project =>
    IS_TERRASOS ? onChainIdsFromOffChainProjects.includes(project.id) : true,
  );

  const skippedClassId = !classId && !projectId ? SKIPPED_CLASS_ID : undefined;
  const selectedProjects = useMemo(
    () =>
      selectProjects({
        projects: clientProjects,
        sellOrders,
        metadata,
        random,
        skippedProjectId,
        skippedClassId,
        adminAddr,
        limit,
      }) ?? [],
    [
      clientProjects,
      sellOrders,
      metadata,
      random,
      skippedProjectId,
      skippedClassId,
      adminAddr,
      limit,
    ],
  );
  const lastRandomProjects = useLastRandomProjects({
    random,
    selectedProjects,
  });

  const allOnChainProjects = useMemo(
    () =>
      normalizeProjectsWithOrderData({
        projects: lastRandomProjects ?? selectedProjects,
        sellOrders,
        userAddress: wallet?.address,
        sanityCreditClassData: creditClassData,
        adminAddr,
      }) as ProjectWithOrderData[],
    [
      lastRandomProjects,
      sellOrders,
      selectedProjects,
      wallet?.address,
      creditClassData,
      adminAddr,
    ],
  );

  // Exclude community projects based on sanity credit class data
  const projectsWithOrderDataFiltered = useMemo(
    () =>
      allOnChainProjects.filter(
        project =>
          !!project?.sanityCreditClassData ||
          showCommunityProjects ||
          !!projectAdmin,
      ),
    [allOnChainProjects, showCommunityProjects, projectAdmin],
  );

  const hasCommunityProjects = useMemo(
    () => allOnChainProjects.some(project => !project?.sanityCreditClassData),
    [allOnChainProjects],
  );

  // Include offchain data and cardSellOrders from sanity data to allOnChainProjects because we need it for filtering
  const projectsWithMetadataFiltered = useMemo(
    () =>
      projectsWithOrderDataFiltered.map(project => {
        const offChainProject = allOffChainProjects.find(
          offChainProject => project.id === offChainProject.onChainId,
        );

        const allCardSellOrders = getCardSellOrders(
          project?.sellOrders,
          offChainProject?.sellOrdersByProjectId?.nodes,
        );
        return { ...offChainProject, ...project, allCardSellOrders };
      }),
    [allOffChainProjects, projectsWithOrderDataFiltered],
  );

  // Merge on-chain and off-chain projects
  const allProjects: Array<NormalizeProject | ProjectWithOrderData> = useMemo(
    () =>
      creditClassFilter?.[UNREGISTERED_PATH] || showOffChainProjects
        ? [...projectsWithMetadataFiltered, ...onlyOffChainProjects]
        : projectsWithMetadataFiltered,
    [
      creditClassFilter,
      showOffChainProjects,
      projectsWithMetadataFiltered,
      onlyOffChainProjects,
    ],
  );

  // Filter projects by class ID, buying option, etc.
  const creditClassFilterKeys = Object.keys(creditClassFilter);
  const creditClassSelected = creditClassFilterKeys.filter(
    creditClassId => creditClassFilter[creditClassId],
  );
  const buyingOptionsFiltersKeys = Object.keys(buyingOptionsFilters);

  const regionFilterKeys = Object.keys(regionFilter);
  const regionSelected = regionFilterKeys
    .filter(region => regionFilter?.[region])
    .map(region => region.toLowerCase());
  const environmentTypeFilterKeys = Object.keys(environmentTypeFilter);
  const environmentTypeSelected = environmentTypeFilterKeys
    .filter(environmentType => environmentTypeFilter?.[environmentType])
    .map(environmentType => environmentType.toLowerCase());
  const marketTypeFilterKeys = Object.keys(marketTypeFilter);
  const marketTypeSelected = marketTypeFilterKeys.filter(
    marketType => marketTypeFilter?.[marketType],
  );

  const projectsFilteredByCreditClass = useMemo(
    () =>
      allProjects
        .filter(project => {
          const isFromSelectedCreditClasses =
            creditClassFilterKeys.length === 0
              ? true
              : project.offChain ||
                creditClassSelected.includes(project.creditClassId ?? '');
          const hasSelectedBuyingOptions =
            buyingOptionsFiltersKeys.length === 0
              ? true
              : (buyingOptionsFilters[CREDIT_CARD_BUYING_OPTION_ID]
                  ? (project.allCardSellOrders &&
                      project.allCardSellOrders.length > 0) ||
                    project.projectPrefinancing?.isPrefinanceProject
                  : true) &&
                (buyingOptionsFilters[CRYPTO_BUYING_OPTION_ID]
                  ? !project.offChain
                  : true);
          return isFromSelectedCreditClasses && hasSelectedBuyingOptions;
        })
        .filter(project => {
          if (IS_REGEN) return true;

          const hasRegion =
            regionSelected.length === 0
              ? true
              : regionSelected.includes(project?.region?.toLowerCase() ?? '');
          const hasEnvironmentType =
            environmentTypeSelected.length === 0
              ? true
              : environmentTypeSelected.some(type =>
                  project.ecosystemType
                    ?.map(type => type.toLowerCase())
                    ?.includes(type),
                );

          const hasMarketType = marketTypeSelected.some(type =>
            project.marketType?.includes(type),
          );

          return hasMarketType && hasEnvironmentType && hasRegion;
        }),
    [
      allProjects,
      creditClassFilterKeys.length,
      creditClassSelected,
      buyingOptionsFiltersKeys.length,
      buyingOptionsFilters,
      regionSelected,
      environmentTypeSelected,
      marketTypeSelected,
    ],
  );

  const sortedProjects = useMemo(
    () =>
      sortProjects(projectsFilteredByCreditClass, sort, sortPinnedIds)
        .sort((a, b) => sortPinnedProject(a, b, pinnedIds))
        .slice(offset, limit ? offset + limit : undefined),
    [
      projectsFilteredByCreditClass,
      sort,
      sortPinnedIds,
      offset,
      limit,
      pinnedIds,
    ],
  );

  /* Metadata queries */

  const projectsMetadatasResults = useQueries({
    queries: sortedProjects.map(project =>
      getMetadataQuery({
        iri: project?.metadata,
        client: queryClient,
        enabled: !!queryClient,
        languageCode: selectedLanguage,
      }),
    ),
  });
  const projectsMetadata = projectsMetadatasResults.map(
    queryResult => queryResult.data,
  );
  const projectsMetadataLoading = projectsMetadatasResults.some(
    res => res.isFetching,
  );

  const offChainProjectResults = useQueries({
    queries: sortedProjects.map(project =>
      getProjectByOnChainIdQuery({
        client: graphqlClient,
        onChainId: project?.id as string,
        enabled: !!project?.id && !project?.offChain,
        languageCode: selectedLanguage,
      }),
    ),
  });

  const offChainProjects = offChainProjectResults.map(
    queryResult => queryResult.data?.data?.projectByOnChainId,
  );

  const projectPagesMetadata = offChainProjects.map(
    project => project?.metadata,
  );
  const offChainProjectLoading = offChainProjectResults.some(
    res => res.isFetching,
  );

  const programAccounts = offChainProjects.map(
    project => project?.creditClassByCreditClassId?.accountByRegistryId,
  );

  // Credit Classes and their metadata
  const { classesMetadata, isClassesMetadataLoading } = useClassesWithMetadata(
    sortedProjects.map(project => project?.creditClassId),
  );

  // Sanity projects
  const sanityProjectsResults = useQueries({
    queries: sortedProjects?.map(project => {
      const id = projectSlugOrId || project?.slug || project?.id;
      return getProjectByIdQuery({
        id: id as string,
        sanityClient,
        enabled: !!sanityClient && !!id,
        languageCode: selectedLanguage,
      });
    }),
  });
  const sanityProjects = sanityProjectsResults.map(res => {
    return res.data?.allProject?.[0];
  });
  const sanityProjectsLoading = sanityProjectsResults.some(
    res => res.isFetching,
  );

  /* Final Normalization */
  const projectsWithMetadata = useMemo(
    () =>
      normalizeProjectsWithMetadata({
        offChainProjects,
        projectsWithOrderData: sortedProjects,
        projectsMetadata: projectsMetadata as (
          | AnchoredProjectMetadataLD
          | undefined
        )[],
        projectPagesMetadata,
        programAccounts,
        sanityCreditClassData: creditClassData,
        classesMetadata,
        sanityProjects,
        wallet,
      }),
    [
      offChainProjects,
      sortedProjects,
      projectsMetadata,
      projectPagesMetadata,
      programAccounts,
      creditClassData,
      classesMetadata,
      sanityProjects,
      wallet,
    ],
  );

  const prefinanceProjects = onlyOffChainProjects.filter(
    project => project.projectPrefinancing?.isPrefinanceProject,
  );

  return {
    allProjects,
    allOnChainProjects,
    prefinanceProjects,
    haveOffChainProjects: onlyOffChainProjects.length > 0,
    prefinanceProjectsCount: prefinanceProjects.length,
    projectsWithOrderData: projectsWithMetadata,
    projectsCount: projectsFilteredByCreditClass?.length,
    loading:
      isLoadingProjects ||
      isLoadingProjectsByClass ||
      isLoadingProjectsByAdmin ||
      isLoadingSellOrders ||
      !queryClient ||
      isLoadingSanityCreditClasses ||
      isLoadingSanityProjects ||
      sanityProjectsLoading ||
      isLoadingProject ||
      isClassesMetadataLoading ||
      projectsMetadataLoading ||
      isAllOffChainProjectsLoading ||
      offChainProjectLoading,
    hasCommunityProjects,
  };
}
