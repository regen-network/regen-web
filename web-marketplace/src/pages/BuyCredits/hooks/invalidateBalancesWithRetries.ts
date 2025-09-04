import type { QueryClient } from '@tanstack/react-query';

export async function invalidateBalancesWithRetries(
  reactQueryClient: QueryClient,
  address: string,
): Promise<void> {
  for (let i = 0; i < 4; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await reactQueryClient.invalidateQueries({
      queryKey: ['balances', address],
    });
  }
}
