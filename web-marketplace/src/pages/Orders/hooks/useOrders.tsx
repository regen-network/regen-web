import { useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { i18n } from '@lingui/core';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import uniq from 'lodash/uniq';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { normalizeProjectWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { normalizeProjectsWithOrderData } from 'lib/normalizers/projects/normalizeProjectsWithOrderData';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getDenomTraceByHashesQuery } from 'lib/queries/react-query/ibc/transfer/getDenomTraceByHashesQuery/getDenomTraceByHashesQuery';
import { getGeocodingQuery } from 'lib/queries/react-query/mapbox/getGeocodingQuery/getGeocodingQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getOrdersByBuyerAddressQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getOrdersByBuyerAddress/getOrdersByBuyerAddress';
import { getRetirementByTxHash } from 'lib/queries/react-query/registry-server/graphql/indexer/getRetirementByTxHash/getRetirementByTxHash';
import { useWallet } from 'lib/wallet/wallet';

import { ORDER_STATUS } from 'components/organisms/Order/Order.constants';
import { JURISDICTION_REGEX } from 'components/templates/ProjectDetails/ProjectDetails.constant';
import { IBC_DENOM_PREFIX } from 'hooks/useQuerySellOrders';

export const useOrders = () => {
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { ecocreditClient, dataClient } = useLedger();
  const { activeAccount, loading } = useAuth();
  const { activeWalletAddr } = useWallet();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const fiatOrders = useMemo(
    () =>
      activeAccount?.fiatOrdersByAccountId?.nodes.map(order => ({
        ...order,
        timestamp: order?.createdAt,
        projectId: order?.projectOnChainId,
      })),
    [activeAccount?.fiatOrdersByAccountId?.nodes],
  );

  const { data, isLoading: cryptoOrdersLoading } = useQuery(
    getOrdersByBuyerAddressQuery({
      client: apolloClient,
      enabled: !!activeWalletAddr && !!apolloClient,
      buyerAddress: activeWalletAddr as string,
    }),
  );
  const cryptoOrders = data?.data?.allOrders?.nodes;

  // TODO APP-511
  // Format jurisdiction for each retirement jurisdiction
  // Is this the right way to do this if we want to internationalize it?
  // Can we use mapbox API language parameter?
  // const jurisdiction = 'ES-PM';
  // const countryCodeMatch = jurisdiction?.match(JURISDICTION_REGEX);
  // const countryCode = countryCodeMatch?.[3] || countryCodeMatch?.[1];
  // const { data: geocodingJurisdictionData } = useQuery(
  //   getGeocodingQuery({
  //     request: { query: countryCode },
  //     enabled: !!countryCode,
  //   }),
  // );
  // const location =
  //   geocodingJurisdictionData?.body?.features?.[0]?.place_name || '';

  const sortedOrders = useMemo(
    () =>
      [...(fiatOrders || []), ...(cryptoOrders || [])].sort(
        (a, b) =>
          new Date(b?.timestamp).getTime() -
          new Date(a?.timestamp as string).getTime(),
      ),
    [cryptoOrders, fiatOrders],
  );

  const retirementResults = useQueries({
    queries: sortedOrders.map(order =>
      getRetirementByTxHash({
        client: apolloClient,
        enabled: !!order?.txHash && !!apolloClient,
        txHash: order?.txHash as string,
      }),
    ),
  });
  const retirementsLoading = retirementResults.some(res => res.isLoading);

  const offChainProjectResults = useQueries({
    queries: sortedOrders.map(order =>
      getProjectByOnChainIdQuery({
        client: apolloClient,
        onChainId: order?.projectId as string,
        enabled: !!order?.projectId,
        languageCode: selectedLanguage,
      }),
    ),
  });
  const offChainProjects = offChainProjectResults.map(
    res => res.data?.data?.projectByOnChainId,
  );
  const offChainProjectsLoading = offChainProjectResults.some(
    res => res.isLoading,
  );

  const onChainProjectResults = useQueries({
    queries: sortedOrders.map(order =>
      getProjectQuery({
        request: { projectId: order?.projectId },
        client: ecocreditClient,
        enabled: !!ecocreditClient && !!order?.projectId,
      }),
    ),
  });
  const onChainProjects = onChainProjectResults?.map(res => res.data?.project);
  const normalizedOnChainProjects = normalizeProjectsWithOrderData({
    projects: onChainProjects,
  });
  const onChainProjectsLoading = onChainProjectResults.some(
    res => res.isLoading,
  );

  const metadataResults = useQueries({
    queries: onChainProjects.map(project =>
      getMetadataQuery({
        iri: project?.metadata,
        dataClient,
        enabled: !!dataClient && !!project?.metadata,
        languageCode: selectedLanguage,
      }),
    ),
  });
  const projectsMetadata = metadataResults.map(
    res => res.data as AnchoredProjectMetadataLD | undefined,
  );
  const metadataLoading = metadataResults.some(res => res.isLoading);

  const ibcDenomHashes = uniq(
    sortedOrders
      .filter(order => order?.askDenom?.includes(IBC_DENOM_PREFIX))
      .map(order => order?.askDenom?.replace(IBC_DENOM_PREFIX, '')),
  );

  const { data: denomTracesData, isLoading: isDenomTracesLoading } = useQuery(
    getDenomTraceByHashesQuery({
      hashes: ibcDenomHashes.filter(Boolean) as string[],
    }),
  );

  const isLoading =
    loading ||
    cryptoOrdersLoading ||
    retirementsLoading ||
    offChainProjectsLoading ||
    onChainProjectsLoading ||
    metadataLoading ||
    isDenomTracesLoading;

  const orders = useMemo(
    () =>
      sortedOrders.map((order, i) => {
        const denomTrace = denomTracesData?.find(denomTrace =>
          order?.askDenom?.includes(denomTrace.hash),
        );
        const askBaseDenom =
          (denomTrace ? denomTrace.baseDenom : order?.askDenom) ?? '';
        const retirement = retirementResults[i]?.data?.data?.retirementByTxHash;
        const formattedDate = i18n.date(order?.timestamp, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

        return {
          project: {
            deliveryDate: formattedDate,
            ...normalizeProjectWithMetadata({
              offChainProject: offChainProjects?.[i],
              projectPageMetadata: offChainProjects?.[i]?.metadata,
              projectMetadata:
                projectsMetadata[i] || offChainProjects?.[i]?.metadata,
              projectWithOrderData: normalizedOnChainProjects[i],
            }),
          },
          order: {
            status: ORDER_STATUS.delivered,
            retirementInfo: {
              retiredCredits: order?.retiredCredits,
              reason: retirement?.reason,
              location: retirement?.jurisdiction,
              makeAnonymous: false, // TODO APP-401
              certificateNodeId: retirement?.nodeId,
            },
            blockchainDetails: {
              purchaseDate: formattedDate,
              blockchainRecord: order?.txHash,
            },
            credits: {
              credits: order?.creditsAmount || 0,
              totalPrice: order?.totalPrice || 0,
              askDenom: order?.askDenom || '',
              askBaseDenom,
            },
            paymentInfo: {
              cardLast4: 'todo',
              cardBrand: 'todo',
              askDenom: order?.askDenom || '',
              askBaseDenom,
            },
          },
        };
      }),
    [
      denomTracesData,
      normalizedOnChainProjects,
      offChainProjects,
      projectsMetadata,
      retirementResults,
      sortedOrders,
    ],
  );
  return { isLoading, orders };
};
