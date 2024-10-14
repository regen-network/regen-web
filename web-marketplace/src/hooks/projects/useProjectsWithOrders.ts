import { useMemo } from 'react';
import { useApolloClient } from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { SKIPPED_CLASS_ID } from 'lib/env';
import { normalizeProjectsWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { normalizeProjectsWithOrderData } from 'lib/normalizers/projects/normalizeProjectsWithOrderData';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getProjectsByClassQuery } from 'lib/queries/react-query/ecocredit/getProjectsByClass/getProjectsByClassQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllSanityPrefinanceProjectsQuery } from 'lib/queries/react-query/sanity/getAllPrefinanceProjectsQuery/getAllPrefinanceProjectsQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/sanity/getProjectByIdQuery/getProjectByIdQuery';
import { useWallet } from 'lib/wallet/wallet';

import { UNREGISTERED_PATH } from 'pages/Projects/AllProjects/AllProjects.constants';
import {
  sortPinnedProject,
  sortProjects,
} from 'pages/Projects/AllProjects/utils/sortProjects';
import { useFetchAllOffChainProjects } from 'pages/Projects/hooks/useOffChainProjects';
import { ProjectsSellOrders } from 'pages/Projects/hooks/useProjectsSellOrders.types';
import { useClassesWithMetadata } from 'hooks/classes/useClassesWithMetadata';

import { useLastRandomProjects } from './useLastRandomProjects';
import { selectProjects } from './useProjectsWithOrders.utils';

export interface ProjectsWithOrdersProps {
  limit?: number;
  offset?: number;
  metadata?: boolean; // to discard projects without metadata prop
  random?: boolean; // to shuffle the projects (along with limit allows a random subselection)
  useCommunityProjects?: boolean; // to show community projects
  projectId?: string; // to filter by project
  skippedProjectId?: string; // to discard a specific project
  classId?: string; // to filter by class
  sortPinnedIds?: string[]; // list of on-chain id, uuid or slug to pinned at the top if `sort` set to 'featured-projects'
  pinnedIds?: string[]; // list of on-chain id, uuid or slug to pinned at the top
  sort?: string;
  creditClassFilter?: Record<string, boolean>;
  useOffChainProjects?: boolean;
  enableOffchainProjectsQuery?: boolean;
}

/**
 * Get projects and sell orders and merge them both normalizing
 */
export function useProjectsWithOrders({
  limit,
  offset = 0,
  metadata = false,
  random = false,
  useCommunityProjects = false,
  skippedProjectId,
  classId,
  pinnedIds,
  sortPinnedIds,
  sort = '',
  projectId,
  creditClassFilter = {},
  useOffChainProjects = false,
  enableOffchainProjectsQuery = true,
}: ProjectsWithOrdersProps): ProjectsSellOrders {
  const { ecocreditClient, marketplaceClient, dataClient } = useLedger();

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

  const { data: sellOrders, isLoading: isLoadingSellOrders } = useQuery(
    getSellOrdersExtendedQuery({
      enabled: !!marketplaceClient,
      client: marketplaceClient,
      reactQueryClient,
      request: {},
    }),
  );

  // Sanity credit classes
  const { data: creditClassData, isFetching: isLoadingSanityCreditClasses } =
    useQuery(
      getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
    );

  // Sanity prefinance projects
  const {
    data: prefinanceProjectsData,
    isFetching: isLoadingPrefinanceProjects,
  } = useQuery(
    getAllSanityPrefinanceProjectsQuery({
      sanityClient,
      enabled: !!sanityClient,
    }),
  );

  // OffChainProjects
  const { allOffChainProjects, isAllOffChainProjectsLoading } =
    useFetchAllOffChainProjects({
      sanityCreditClassesData: creditClassData,
      enabled: enableOffchainProjectsQuery,
      prefinanceProjectsData,
    });

  /* Normalization/Filtering/Sorting */

  let projects: ProjectInfo[] | undefined;
  if (projectId) {
    projects = projectArray;
  } else if (classId) {
    projects = projectsByClassData?.projects;
  } else {
    projects = projectsData?.projects;
  }

  const skippedClassId = !classId && !projectId ? SKIPPED_CLASS_ID : undefined;
  const selectedProjects = useMemo(
    () =>
      selectProjects({
        projects,
        sellOrders,
        metadata,
        random,
        skippedProjectId,
        skippedClassId,
      }) ?? [],
    [projects, sellOrders, metadata, random, skippedProjectId, skippedClassId],
  );
  const lastRandomProjects = useLastRandomProjects({
    random,
    selectedProjects,
  });

  const projectsWithOrderData = useMemo(
    () =>
      normalizeProjectsWithOrderData({
        projects: lastRandomProjects ?? selectedProjects,
        sellOrders,
        userAddress: wallet?.address,
        sanityCreditClassData: creditClassData,
      }),
    [
      lastRandomProjects,
      sellOrders,
      selectedProjects,
      wallet?.address,
      creditClassData,
    ],
  );

  // Exclude community projects based on sanity credit class data
  const projectsWithOrderDataFiltered = useMemo(
    () =>
      projectsWithOrderData.filter(
        project => !!project.sanityCreditClassData || useCommunityProjects,
      ),
    [projectsWithOrderData, useCommunityProjects],
  );

  const hasCommunityProjects = useMemo(
    () => projectsWithOrderData.some(project => !project.sanityCreditClassData),
    [projectsWithOrderData],
  );

  // Merge on-chain and off-chain projects
  const allProject = useMemo(
    () =>
      creditClassFilter?.[UNREGISTERED_PATH] || useOffChainProjects
        ? [...projectsWithOrderDataFiltered, ...allOffChainProjects]
        : projectsWithOrderDataFiltered,
    [
      creditClassFilter,
      useOffChainProjects,
      projectsWithOrderDataFiltered,
      allOffChainProjects,
    ],
  );

  // Filter projects by class ID
  const creditClassFilterKeys = Object.keys(creditClassFilter);
  const creditClassSelected = creditClassFilterKeys.filter(
    creditClassId => creditClassFilter[creditClassId],
  );

  const projectsFilteredByCreditClass = useMemo(
    () =>
      allProject.filter(project =>
        creditClassFilterKeys.length === 0
          ? true
          : project.offChain ||
            creditClassSelected.includes(project.creditClassId ?? ''),
      ),
    [allProject, creditClassFilterKeys, creditClassSelected],
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
        iri: project.metadata,
        dataClient,
        enabled: !!dataClient,
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
        onChainId: project.id,
        enabled: !!project.id && !project.offChain,
      }),
    ),
  });

  const projectPagesMetadata = offChainProjectResults.map(
    queryResult => queryResult.data?.data.projectByOnChainId?.metadata,
  );
  const offChainProjectLoading = offChainProjectResults.some(
    res => res.isFetching,
  );

  const programAccounts = offChainProjectResults.map(
    queryResult =>
      queryResult.data?.data.projectByOnChainId?.creditClassByCreditClassId
        ?.accountByRegistryId,
  );

  // Credit Classes and their metadata
  const { classesMetadata, isClassesMetadataLoading } = useClassesWithMetadata(
    sortedProjects.map(project => project?.creditClassId),
  );

  // Sanity projects
  const sanityProjectsResults = useQueries({
    queries: sortedProjects?.map(project => {
      const id = project.slug || project.id;
      return getProjectByIdQuery({
        id,
        sanityClient,
        enabled: !!sanityClient && !!id,
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

  const prefinanceProjects = allOffChainProjects.filter(
    project => project.projectPrefinancing?.isPrefinanceProject,
  );

  return {
    allProjects: projectsWithOrderData,
    prefinanceProjects,
    haveOffChainProjects: allOffChainProjects.length > 0,
    prefinanceProjectsCount: prefinanceProjects.length,
    projectsWithOrderData: projectsWithMetadata,
    projectsCount: projectsFilteredByCreditClass?.length,
    loading:
      isLoadingProjects ||
      isLoadingProjectsByClass ||
      isLoadingSellOrders ||
      isLoadingSanityCreditClasses ||
      isLoadingPrefinanceProjects ||
      sanityProjectsLoading ||
      isLoadingProject ||
      isClassesMetadataLoading ||
      projectsMetadataLoading ||
      isAllOffChainProjectsLoading ||
      offChainProjectLoading,
    hasCommunityProjects,
  };
}
