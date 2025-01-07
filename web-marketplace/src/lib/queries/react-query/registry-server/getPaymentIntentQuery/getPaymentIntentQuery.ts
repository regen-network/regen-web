import { apiUri } from 'lib/apiUri';

import { GET_PAYMENT_METHOD_QUERY_KEY } from './getPaymentIntentQuery.constants';
import {
  ReactQueryGetPaymentIntentQueryParams,
  ReactQueryGetPaymentIntentQueryResponse,
} from './getPaymentIntentQuery.types';

export const getPaymentIntentQuery = ({
  paymentMethodId,
  ...params
}: ReactQueryGetPaymentIntentQueryParams): ReactQueryGetPaymentIntentQueryResponse => ({
  queryKey: [GET_PAYMENT_METHOD_QUERY_KEY],
  queryFn: async () => {
    try {
      const resp = await fetch(
        `${apiUri}/marketplace/v1/stripe/payment-intents/${paymentMethodId}`,
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
