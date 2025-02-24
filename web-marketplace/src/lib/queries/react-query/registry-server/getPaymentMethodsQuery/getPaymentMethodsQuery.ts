import { apiUri } from 'lib/apiUri';

import {
  ReactQueryGetPaymentMethodsQueryParams,
  ReactQueryGetPaymentMethodsQueryResponse,
} from './getPaymentMethodsQuery.types';
import { getPaymentMethodsQueryKey } from './getPaymentMethodsQuery.utils';

export const getPaymentMethodsQuery = ({
  limit,
  ...params
}: ReactQueryGetPaymentMethodsQueryParams): ReactQueryGetPaymentMethodsQueryResponse => ({
  queryKey: getPaymentMethodsQueryKey(limit),
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
