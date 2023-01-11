import { useMemo, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { useQueries, useQuery } from '@tanstack/react-query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';
import { DEFAULT_ROWS_PER_PAGE } from 'web-components/src/components/table/ActionsTable.constants';

import { useLedger } from 'ledger';
import { GECKO_EEUR_ID, GECKO_USDC_ID } from 'lib/coingecko';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getBatchQuery } from 'lib/queries/react-query/ecocredit/getBatchQuery/getBatchQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllProjectsQuery } from 'lib/queries/react-query/registry-server/graphql/getAllProjectsQuery/getAllProjectsQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { useFetchSellOrders } from 'features/marketplace/BuySellOrderFlow/hooks/useFetchSellOrders';
import { normalizeToUISellOrderInfo } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { UISellOrderInfo } from 'pages/Projects/Projects.types';
import useMarketplaceQuery from 'hooks/useMarketplaceQuery';
import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import { client as sanityClient } from '../../../../lib/clients/sanity';
import {
  normalizeProjectsInfosByHandleMap,
  normalizeSellOrders,
} from '../Storefront.normalizer';
import { NormalizedSellOrder } from '../Storefront.types';
import { sortBySellOrderId } from '../Storefront.utils';

type ResponseType = {
  normalizedSellOrders: NormalizedSellOrder[];
  uiSellOrdersInfo?: UISellOrderInfo[];
  refetchSellOrders: () => Promise<SellOrderInfoExtented[] | undefined>;
  setPaginationParams: React.Dispatch<
    React.SetStateAction<TablePaginationParams>
  >;
  isLoadingSellOrders: boolean;
};

export const useNormalizedSellOrders = (): ResponseType => {
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { ecocreditClient } = useLedger();

  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });
  const { offset, rowsPerPage } = paginationParams;

  // We do not use pagination yet on the SellOrders query
  // because the ledger currently returns sell orders ordered by seller address and not by id
  // which would result in a list of non sequential ids in the sell orders table and look weird
  // TODO: use pagination as soon as this is fixed on Regen Ledger side (as part of v5.0)
  const { sellOrders, refetchSellOrders } = useFetchSellOrders();

  const uiSellOrdersInfo = useMemo(
    () => sellOrders?.map(normalizeToUISellOrderInfo),
    [sellOrders],
  );

  const simplePrice = useQuery(getSimplePriceQuery({}));

  // Off-chain stored Projects
  const { data: offChainProjectData } = useQuery(
    getAllProjectsQuery({ client: apolloClient, enabled: !!apolloClient }),
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
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // Batch pagination
  const batchDenoms = useMemo(
    () =>
      sellOrders
        ?.sort(sortBySellOrderId)
        .slice(offset, offset + rowsPerPage)
        .map(sellOrder => sellOrder.batchDenom),
    [sellOrders, offset, rowsPerPage],
  );
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
      projects?.map(({ metadata: iri }) => getMetadataQuery({ iri })) ?? [],
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

  const projectsInfosByHandleMap = useMemo(
    () =>
      normalizeProjectsInfosByHandleMap({
        offChainProjects: offChainProjectData?.allProjects,
        onChainProjects: projectsWithMetadata,
        sanityCreditClassData,
      }),
    [offChainProjectData, projectsWithMetadata, sanityCreditClassData],
  );

  const normalizedSellOrders = useMemo(
    () =>
      normalizeSellOrders({
        batchInfos,
        sellOrders,
        projectsInfosByHandleMap,
        geckoPrices: {
          regenPrice: simplePrice?.data?.regen?.usd,
          eeurPrice: simplePrice?.data?.[GECKO_EEUR_ID]?.usd,
          usdcPrice: simplePrice?.data?.[GECKO_USDC_ID]?.usd,
        },
      }),
    [batchInfos, sellOrders, projectsInfosByHandleMap, simplePrice],
  );

  return {
    normalizedSellOrders,
    uiSellOrdersInfo,
    refetchSellOrders,
    setPaginationParams,
    isLoadingSellOrders: sellOrders === undefined,
  };
};
