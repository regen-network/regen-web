import {
  QueryBalancesRequest,
  QueryBalancesResponse,
} from '@regen-network/api/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';

import { useLedger } from '../ledger';
import { getBalancesQuery } from './../lib/queries/react-query/ecocredit/getBalancesQuery/getBalancesQuery';

type FetchBalances = (
  request: QueryBalancesRequest,
) => Promise<QueryBalancesResponse | undefined | void>;

type Params = {
  address?: string;
};

/**
 * A custom hook that returns and refetches balances for a given address.
 *
 * @param {Object} params - Object containing the address to query.
 * @param {string} params.address - The wallet address for which to fetch balances.
 *
 * See {@link Params} for more details.
 *
 * @returns {Object} An object containing:
 * - balancesResponse: The fetched balances data.
 * - fetchBalances: A function to initiate a refetch of balances.
 * - isLoadingBalances: A boolean indicating whether the fetch operation is in progress.
 */
export default function useQueryBalances({ address }: Params): {
  balancesResponse: QueryBalancesResponse | undefined | void;
  fetchBalances: FetchBalances;
  isLoadingBalances: boolean;
} {
  const { queryClient } = useLedger();

  const {
    data: balancesResponse,
    refetch,
    isFetching: isLoadingBalances,
  } = useQuery(
    getBalancesQuery({
      client: queryClient,
      request: {
        address: address ?? '',
      },
      enabled: !!queryClient && !!address,
      keepPreviousData: true,
    }),
  );

  const fetchBalances = async (): Promise<
    QueryBalancesResponse | undefined | void
  > => {
    await refetch();
  };

  return { balancesResponse, fetchBalances, isLoadingBalances };
}
