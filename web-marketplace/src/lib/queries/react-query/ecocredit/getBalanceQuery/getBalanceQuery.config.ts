type GetBalanceQueryKeyParams = {
  address: string;
  batchDenom: string;
};

export const getBalanceQueryKey = ({
  address,
  batchDenom,
}: GetBalanceQueryKeyParams): string[] => ['balance', address, batchDenom];
