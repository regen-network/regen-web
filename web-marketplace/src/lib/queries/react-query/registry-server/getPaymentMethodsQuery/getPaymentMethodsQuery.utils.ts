import { GET_PAYMENT_METHODS_QUERY_KEY } from './getPaymentMethodsQuery.constants';

export const getPaymentMethodsQueryKey = (limit?: number) => [
  GET_PAYMENT_METHODS_QUERY_KEY,
  limit,
];
