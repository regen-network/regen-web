import { useMemo, useState } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import {
  SortCallbacksType,
  TablePaginationParams,
} from 'web-components/src/components/table/ActionsTable';
import { DEFAULT_ROWS_PER_PAGE } from 'web-components/src/components/table/Table.constants';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getBatchQuery } from 'lib/queries/react-query/ecocredit/getBatchQuery/getBatchQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { SellOrderInfoExtented } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.types';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';
import { normalizeToUISellOrderInfo } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { useClassesWithMetadata } from 'hooks/classes/useClassesWithMetadata';

import {
  normalizeProjectsInfosByHandleMap,
  normalizeSellOrders,
} from '../Storefront.normalizer';
import { NormalizedSellOrder } from '../Storefront.types';
import { useFetchSellOrders } from './useFetchSellOrders';
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
  totalSellOrders?: number;
  paginationParams?: TablePaginationParams;
};

export const useNormalizedSellOrders = ({
  sellerAddress,
}: { sellerAddress?: string } = {}): ResponseType => {
  const { queryClient } = useLedger();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });
  const { offset, rowsPerPage } = paginationParams;
  useQuery(getSimplePriceQuery({}));

  const { sellOrders, refetchSellOrders, isLoadingSellOrders } =
    useFetchSellOrders(sellerAddress, {
      offset,
      limit: rowsPerPage,
    });

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
      client: queryClient,
      enabled: !!queryClient,
      request: {},
    }),
  );

  const { data: sanityCreditClassData } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  // Batch pagination
  // If we have used server pagination we don't need to slice it
  const paginatedSellOrders =
    sortedSellOrders.length > rowsPerPage
      ? sortedSellOrders.slice(offset, offset + rowsPerPage)
      : sortedSellOrders;

  const batchDenoms = paginatedSellOrders.map(
    sellOrder => sellOrder.batchDenom,
  );

  const batchesResult = useQueries({
    queries:
      batchDenoms?.map(batchDenom =>
        getBatchQuery({
          client: queryClient,
          enabled: !!queryClient,
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
        getMetadataQuery({
          iri,
          client: queryClient,
          enabled: !!queryClient,
          languageCode: selectedLanguage,
        }),
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
    totalSellOrders: sellOrders?.[0]?.totalSellOrders,
    paginationParams,
  };
};
