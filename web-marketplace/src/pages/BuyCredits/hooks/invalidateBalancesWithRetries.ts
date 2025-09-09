import type { QueryClient } from '@tanstack/react-query';

/**
 * Re-invalidate the balances queries for a given address several times
 * to allow the UI to pick up ledger updates that can lag after a buy.
 *
 * Notes:
 * - Uses a time based retry to cover the possible ledger delay.
 * - We invalidate by the ['balances', address] prefix so all paginated keys are refreshed.
 */
export async function invalidateBalancesWithRetries(
  reactQueryClient: QueryClient,
  address: string,
): Promise<void> {
  for (let i = 0; i < 15; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await reactQueryClient.invalidateQueries({
      queryKey: ['balances', address],
    });
  }
}
