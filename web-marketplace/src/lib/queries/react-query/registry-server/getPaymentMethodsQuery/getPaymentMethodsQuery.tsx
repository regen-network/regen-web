import { apiUri } from 'lib/apiUri';

import { GET_PAYMENT_METHODS_QUERY_KEY } from './getPaymentMethodsQuery.constants';
import {
  ReactQueryGetPostQueryParams,
  ReactQueryGetPostQueryResponse,
} from './getPaymentMethodsQuery.types';

export const getPaymentMethodsQuery = ({
  limit,
  ...params
}: ReactQueryGetPostQueryParams): ReactQueryGetPostQueryResponse => ({
  queryKey: [GET_PAYMENT_METHODS_QUERY_KEY, limit],
  queryFn: async () => {
    try {
      const resp = await fetch(
        `${apiUri}/marketplace/v1/stripe/payment-methods${
          limit ? `?limit=${limit}` : ''
        }`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      return await resp.json();
    } catch (e) {
      return null;
    }
  },
  ...params,
});
