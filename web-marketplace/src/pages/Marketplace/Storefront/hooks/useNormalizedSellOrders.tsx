import { useMemo, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQueries, useQuery } from '@tanstack/react-query';

import {
  SortCallbacksType,
  TablePaginationParams,
} from 'web-components/src/components/table/ActionsTable';
import { DEFAULT_ROWS_PER_PAGE } from 'web-components/src/components/table/Table.constants';

import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getBatchQuery } from 'lib/queries/react-query/ecocredit/getBatchQuery/getBatchQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { useFetchSellOrders } from 'features/marketplace/BuySellOrderFlow/hooks/useFetchSellOrders';
import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';
import { normalizeToUISellOrderInfo } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { useClassesWithMetadata } from 'hooks/classes/useClassesWithMetadata';
import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import {
  normalizeProjectsInfosByHandleMap,
  normalizeSellOrders,
} from '../Storefront.normalizer';
import { NormalizedSellOrder } from '../Storefront.types';
import { useSortedSellOrders } from './useSortedSellOrders';

type ResponseType = {
  normalizedSellOrders: NormalizedSellOrder[];
  uiSellOrdersInfo?: UISellOrderInfo[];
  refetchSellOrders: () => Promise<SellOrderInfoExtented[] | undefined>;
  setPaginationParams: React.Dispatch<
    React.SetStateAction<TablePaginationParams>
  >;
  isLoadingSellOrders: boolean;
  sortCallbacks: SortCallbacksType;
};

export const useNormalizedSellOrders = (): ResponseType => {
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { ecocreditClient, dataClient } = useLedger();

  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });
  const { offset, rowsPerPage } = paginationParams;
  useQuery(getSimplePriceQuery({}));

  // We do not use pagination yet on the SellOrders query
  // because the ledger currently returns sell orders ordered by seller address and not by id
  // which would result in a list of non sequential ids in the sell orders table and look weird
  // TODO: use pagination as soon as this is fixed on Regen Ledger side (as part of v5.0)
  const { sellOrders, refetchSellOrders, isLoadingSellOrders } =
    useFetchSellOrders();

  // Sorting
  const { sortCallbacks, sortedSellOrders } = useSortedSellOrders({
    sellOrders,
  });

  const uiSellOrdersInfo = useMemo(
    () => sortedSellOrders?.map(normalizeToUISellOrderInfo),
    [sortedSellOrders],
  );

  // On-chain stored Projects
  const { data: onChainProjects } = useQuery(
    getProjectsQuery({
      client: ecocreditClient,
      enabled: !!ecocreditClient,
      request: {},
    }),
  );

  const { data: sanityCreditClassData } = useQuery(
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // Batch pagination
  const batchDenoms = sortedSellOrders
    .slice(offset, offset + rowsPerPage)
    .map(sellOrder => sellOrder.batchDenom);

  const batchesResult = useQueries({
    queries:
      batchDenoms?.map(batchDenom =>
        getBatchQuery({
          client: ecocreditClient,
          enabled: !!ecocreditClient,
          request: { batchDenom },
        }),
      ) ?? [],
  });
  const batchInfos = useMemo(
    () => batchesResult?.map(batchResult => batchResult.data?.batch) ?? [],
    [batchesResult],
  );

  // Project metadata pagination
  const projectsIds = useMemo(
    () => batchInfos.map(batchInfo => batchInfo?.projectId),
    [batchInfos],
  );
  const projects = useMemo(
    () =>
      onChainProjects?.projects.filter(project =>
        projectsIds?.includes(project.id),
      ),
    [projectsIds, onChainProjects?.projects],
  );
  const metadataResults = useQueries({
    queries:
      projects?.map(({ metadata: iri }) =>
        getMetadataQuery({ iri, dataClient, enabled: !!dataClient }),
      ) ?? [],
  });
  const metadata = metadataResults.map(queryResult => queryResult.data);
  const projectsWithMetadata = useMemo(
    () =>
      projects?.map((project, i) => ({
        ...project,
        metadata: metadata?.[i],
      })) ?? [],
    [projects, metadata],
  );

  const { classesMetadata } = useClassesWithMetadata(
    projects?.map(project => project.classId),
  );

  const projectsInfosByHandleMap = useMemo(
    () =>
      normalizeProjectsInfosByHandleMap({
        onChainProjects: projectsWithMetadata,
        sanityCreditClassData,
        classesMetadata,
      }),
    [classesMetadata, projectsWithMetadata, sanityCreditClassData],
  );

  const normalizedSellOrders = useMemo(
    () =>
      normalizeSellOrders({
        batchInfos,
        sellOrders: sortedSellOrders,
        projectsInfosByHandleMap,
      }),
    [batchInfos, sortedSellOrders, projectsInfosByHandleMap],
  );

  return {
    normalizedSellOrders,
    uiSellOrdersInfo,
    refetchSellOrders,
    setPaginationParams,
    isLoadingSellOrders,
    sortCallbacks,
  };
};
