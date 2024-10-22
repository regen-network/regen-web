import {
  GetTxHashForPaymentIntentDocument,
  GetTxHashForPaymentIntentQuery,
  GetTxHashForPaymentIntentQueryVariables,
} from 'generated/graphql';

import { getTxHashForPaymentIntentQueryKey } from './getTxHashForPaymentIntentQuery.constants';
import {
  ReactQueryGetTxHashForPaymentIntentProps,
  ReactQueryGetTxHashForPaymentIntentResponse,
} from './getTxHashForPaymentIntentQuery.types';

export const getGetTxHashForPaymentIntentQuery = ({
  paymentIntentId,
  client,
  ...params
}: ReactQueryGetTxHashForPaymentIntentProps): ReactQueryGetTxHashForPaymentIntentResponse => ({
  queryKey: getTxHashForPaymentIntentQueryKey(paymentIntentId),
  queryFn: async () => {
    try {
      const txHash = await client.query<
        GetTxHashForPaymentIntentQuery,
        GetTxHashForPaymentIntentQueryVariables
      >({
        query: GetTxHashForPaymentIntentDocument,
        variables: { paymentIntentId },
        fetchPolicy: 'no-cache',
      });

      return txHash;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return null;
    }
  },
  ...params,
});
