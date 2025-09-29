import { useMemo } from 'react';
import { useApolloClient } from '@apollo/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { QueryClient, useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getProjectBySlugQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectBySlugQuery/getProjectBySlugQuery';
import { useWallet } from 'lib/wallet/wallet';

import { getIsOnChainId } from 'components/templates/ProjectDetails/ProjectDetails.utils';

export const useAccountCanBuy = (projectIdParam?: string) => {
  const { queryClient: rpcQueryClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const apolloClient = useApolloClient();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { activeWalletAddr } = useWallet();

  const isOnChainId = getIsOnChainId(projectIdParam);

  const sellOrdersQuery = getSellOrdersExtendedQuery({
    client: rpcQueryClient as QueryClient,
    reactQueryClient,
    request: {},
  });
  const { data: allSellOrders, isLoading: loadingSellOrders } =
    useQuery(sellOrdersQuery);

  const shouldFetchBySlug = !!projectIdParam && !isOnChainId;
  const { data: projectBySlug, isLoading: loadingProjectBySlug } = useQuery(
    getProjectBySlugQuery({
      client: apolloClient,
      slug: projectIdParam as string,
      enabled: shouldFetchBySlug,
      languageCode: selectedLanguage,
    }),
  );

  const effectiveProjectId = useMemo(() => {
    if (isOnChainId) return projectIdParam;
    return (projectBySlug as any)?.data?.projectBySlug?.onChainId ?? undefined;
  }, [isOnChainId, projectIdParam, projectBySlug]);

  const accountCanBuy = useMemo(() => {
    if (!allSellOrders || !effectiveProjectId) return false;
    const available = allSellOrders.filter(
      (sellOrder: any) =>
        sellOrder.seller !== activeWalletAddr &&
        sellOrder.batchDenom?.startsWith(effectiveProjectId),
    );
    return available.length > 0;
  }, [allSellOrders, effectiveProjectId, activeWalletAddr]);

  return {
    accountCanBuy,
    isLoading: loadingSellOrders || (shouldFetchBySlug && loadingProjectBySlug),
  };
};
