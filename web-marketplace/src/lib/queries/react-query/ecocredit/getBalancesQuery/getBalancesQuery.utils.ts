export const getBalancesQueryKey = (address?: string, offset = 0, limit = 0) =>
  ['balances', address, String(offset), String(limit)] as const;
