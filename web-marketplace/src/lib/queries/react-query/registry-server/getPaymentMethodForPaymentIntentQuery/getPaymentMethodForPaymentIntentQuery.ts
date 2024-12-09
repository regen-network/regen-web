import { apiUri } from 'lib/apiUri';

import { GET_PAYMENT_METHOD_QUERY_KEY } from './getPaymentMethodForPaymentIntentQuery.constants';
import {
  ReactQueryGetPaymentMethodForPaymentIntentQueryParams,
  ReactQueryGetPaymentMethodForPaymentIntentQueryResponse,
} from './getPaymentMethodForPaymentIntentQuery.types';

export const getPaymentMethodForPaymentIntentQuery = ({
  paymentMethodId,
  ...params
}: ReactQueryGetPaymentMethodForPaymentIntentQueryParams): ReactQueryGetPaymentMethodForPaymentIntentQueryResponse => ({
  queryKey: [GET_PAYMENT_METHOD_QUERY_KEY],
  queryFn: async () => {
    try {
      const resp = await fetch(
        `${apiUri}/marketplace/v1/stripe/payment-intents/${paymentMethodId}/payment-method`,
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
