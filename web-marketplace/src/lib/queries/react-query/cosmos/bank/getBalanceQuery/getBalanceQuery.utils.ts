import { QueryBalanceRequest } from '@regen-network/api/cosmos/bank/v1beta1/query';

import { BANK_BALANCE_KEY } from './getBalanceQuery.constants';

export const getBalanceQueryKey = (request: QueryBalanceRequest) => [
  BANK_BALANCE_KEY,
  request.address,
  request.denom,
];
