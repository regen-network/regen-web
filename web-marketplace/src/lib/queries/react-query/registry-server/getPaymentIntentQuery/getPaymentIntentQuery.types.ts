import { PaymentMethod } from '@stripe/stripe-js';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetPaymentIntentQueryResponse = QueryObserverOptions<{
  paymentMethod?: PaymentMethod | null;
  receiptUrl?: string | null;
}>;

export type ReactQueryGetPaymentIntentQueryParams = {
  paymentMethodId: string;
} & ReactQueryBuilderResponse<ReactQueryGetPaymentIntentQueryResponse>;
