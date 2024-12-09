import { PaymentMethod } from '@stripe/stripe-js';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetPaymentMethodsQueryResponse = QueryObserverOptions<{
  paymentMethods?: PaymentMethod[] | null;
}>;

export type ReactQueryGetPaymentMethodsQueryParams = {
  limit?: number;
} & ReactQueryBuilderResponse<ReactQueryGetPaymentMethodsQueryResponse>;
