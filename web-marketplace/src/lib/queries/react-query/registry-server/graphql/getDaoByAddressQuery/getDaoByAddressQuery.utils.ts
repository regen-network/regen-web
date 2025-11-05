import { DaoByAddressQueryVariables } from 'generated/graphql';

import { DAO_BY_ADDRESS_QUERY_KEY } from './getDaoByAddressQuery.constants';

export const getDaoByAddressQueryKey = ({
  address,
}: DaoByAddressQueryVariables) => [DAO_BY_ADDRESS_QUERY_KEY, address];
