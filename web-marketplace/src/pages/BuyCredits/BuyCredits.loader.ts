import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { QueryClient } from '@tanstack/react-query';
import { getDefaultStore } from 'jotai';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
import { getMarketplaceQueryClient } from 'lib/clients/regen/ecocredit/marketplace/marketplaceQueryClient';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import {
  Accounts,
  PrivateAccount,
} from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.types';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';
import { getProjectBySlugQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectBySlugQuery/getProjectBySlugQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import { getIsOnChainId } from 'components/templates/ProjectDetails/ProjectDetails.utils';

type LoaderType = {
  queryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
  address: string | undefined;
};
/**
 * Loader function for the Buy Credits page that checks if there are available
 * sell orders in a given project for a given account address
 */
export const buyCreditsLoader =
  ({ queryClient, apolloClientFactory, address }: LoaderType) =>
  async ({
    params: { projectId: projectIdParam },
  }: {
    params: { projectId?: string };
  }) => {
    const isOnChainId = getIsOnChainId(projectIdParam);
    const apolloClient =
      apolloClientFactory.getClient() as ApolloClient<NormalizedCacheObject>;
    const marketplaceClient = await getMarketplaceQueryClient();
    const atomStore = getDefaultStore();
    const selectedLanguage = atomStore.get(selectedLanguageAtom);
    let currentActiveAddress = address;

    if (!currentActiveAddress) {
      const data = (await getFromCacheOrFetch({
        query: { queryKey: [GET_ACCOUNTS_QUERY_KEY] },
        reactQueryClient: queryClient,
      })) as Accounts | null | undefined;

      const activeAccountId = data?.activeAccountId;
      const privAuthenticatedAccounts = data?.authenticatedAccounts;

      const authenticatedAccountsResult = await getAuthenticatedAccounts({
        privAuthenticatedAccounts,
        client: apolloClient,
        languageCode: selectedLanguage,
        queryClient,
      });

      const authenticatedAccounts = authenticatedAccountsResult.map(
        result => result?.accountById,
      );

      const activeAccount = authenticatedAccounts.find(
        account => account?.id === activeAccountId,
      );
      currentActiveAddress = activeAccount?.addr ?? undefined;
    }

    const sellOrdersQuery = getSellOrdersExtendedQuery({
      client: marketplaceClient,
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
      languageCode: selectedLanguage,
    });

    const projectBySlug = await getFromCacheOrFetch({
      query: projectBySlugQuery,
      reactQueryClient: queryClient,
    });
    const projectBySlugId = projectBySlug?.data?.projectBySlug?.onChainId;
    const projectId = isOnChainId ? projectIdParam : projectBySlugId;

    const availableSellOrders = allSellOrders?.filter(
      (sellOrder: SellOrderInfo) =>
        sellOrder.seller !== currentActiveAddress &&
        projectId &&
        sellOrder.batchDenom?.startsWith(projectId),
    );

    return !!availableSellOrders?.length;
  };

async function getAuthenticatedAccounts({
  privAuthenticatedAccounts,
  client,
  languageCode,
  queryClient,
}: {
  privAuthenticatedAccounts: PrivateAccount[] | undefined;
  client: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
  queryClient: QueryClient;
}) {
  if (!privAuthenticatedAccounts?.length) return [];

  const accounts = await Promise.all(
    privAuthenticatedAccounts.map(({ id }) => {
      const query = getAccountByIdQuery({
        client,
        id,
        languageCode,
      });

      return queryClient.fetchQuery({
        queryKey: query.queryKey,
        queryFn: query.queryFn,
      });
    }),
  );

  return accounts;
}
