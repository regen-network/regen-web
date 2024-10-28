import { AccountByCustodialAddressQueryVariables } from 'generated/graphql';

import { ACCOUNT_BY_CUSTODIAL_ADDRESS_QUERY_KEY } from './getAccountByCustodialAddressQuery.constants';

export const getAccountByCustodialAddressQueryKey = ({
  custodialAddress,
}: AccountByCustodialAddressQueryVariables) => [
  ACCOUNT_BY_CUSTODIAL_ADDRESS_QUERY_KEY,
  custodialAddress,
];
