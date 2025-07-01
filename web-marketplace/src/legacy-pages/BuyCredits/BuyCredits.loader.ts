import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { SellOrderInfo } from '@regen-network/api/regen/ecocredit/marketplace/v1/query';
import { QueryClient } from '@tanstack/react-query';
import { getRPCQueryClient } from 'app/makeRPCQueryClient';

import { Maybe } from 'generated/graphql';
import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getProjectBySlugQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectBySlugQuery/getProjectBySlugQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import { getIsOnChainId } from 'components/templates/ProjectDetails/ProjectDetails.utils';

type LoaderType = {
  queryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
  address?: Maybe<string>;
  languageCode: string;
};
/**
 * Loader function for the Buy Credits page that checks if there are available
 * sell orders in a given project where the current account address is not the seller.
 * Returns true if at least one sell order exists from a different seller.
 */
export const buyCreditsLoader =
  ({ queryClient, apolloClientFactory, address, languageCode }: LoaderType) =>
  async ({
    params: { projectId: projectIdParam },
  }: {
    params: { projectId?: string };
  }) => {
    const isOnChainId = getIsOnChainId(projectIdParam);
    const apolloClient =
      apolloClientFactory.getClient() as ApolloClient<NormalizedCacheObject>;
    const rpcQueryClient = await getRPCQueryClient();

    const sellOrdersQuery = getSellOrdersExtendedQuery({
      client: rpcQueryClient,
      reactQueryClient: queryClient,
      request: {},
    });

    const allSellOrders = await getFromCacheOrFetch({
      query: sellOrdersQuery,
      reactQueryClient: queryClient,
    });

    const projectBySlugQuery = getProjectBySlugQuery({
      client: apolloClient,
      enabled: !!projectIdParam && !isOnChainId,
      slug: projectIdParam as string,
      languageCode,
    });

    const projectBySlug = await getFromCacheOrFetch({
      query: projectBySlugQuery,
      reactQueryClient: queryClient,
    });
    const projectBySlugId = projectBySlug?.data?.projectBySlug?.onChainId;
    const projectId = isOnChainId ? projectIdParam : projectBySlugId;

    const availableSellOrders = allSellOrders?.filter(
      (sellOrder: SellOrderInfo) =>
        sellOrder.seller !== address &&
        projectId &&
        sellOrder.batchDenom?.startsWith(projectId),
    );

    return !!availableSellOrders?.length;
  };
