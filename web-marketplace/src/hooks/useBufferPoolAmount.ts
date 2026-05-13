import { useQueries } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { BufferPoolAccount } from 'lib/db/types/json-ld/credit-class-metadata';
import { getBalancesQuery } from 'lib/queries/react-query/ecocredit/getBalancesQuery/getBalancesQuery';

export function useBufferPoolAmount(
  bufferPoolAccounts?: BufferPoolAccount[],
  batchDenomPrefix?: string,
): number {
  const { queryClient } = useLedger();

  const addresses = (bufferPoolAccounts ?? [])
    .map(account => account['regen:walletAddress'] ?? account['regen:address'])
    .filter((address): address is string => !!address);

  return useQueries({
    queries: addresses.map(address =>
      getBalancesQuery({
        client: queryClient,
        request: { address },
        enabled: !!queryClient && !!address,
      }),
    ),
    combine: results =>
      results.reduce((total, result) => {
        if (!result.data?.balances) return total;
        const balances = batchDenomPrefix
          ? result.data.balances.filter(b =>
              b.batchDenom.startsWith(batchDenomPrefix),
            )
          : result.data.balances;
        return (
          total +
          balances.reduce(
            (sum, balance) => sum + parseFloat(balance.tradableAmount || '0'),
            0,
          )
        );
      }, 0),
  });
}
