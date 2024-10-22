export const getTxHashForPaymentIntentQueryKey = (
  paymentIntentId: string,
): string[] => ['graphql', 'getTxHashForPaymentIntent', paymentIntentId];
