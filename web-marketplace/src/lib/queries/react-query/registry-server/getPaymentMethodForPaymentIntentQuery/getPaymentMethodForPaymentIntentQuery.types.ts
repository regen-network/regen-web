import { PaymentMethod } from '@stripe/stripe-js';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetPaymentMethodForPaymentIntentQueryResponse =
  QueryObserverOptions<{
    paymentMethod?: PaymentMethod | null;
  }>;

export type ReactQueryGetPaymentMethodForPaymentIntentQueryParams = {
  paymentMethodId: string;
} & ReactQueryBuilderResponse<ReactQueryGetPaymentMethodForPaymentIntentQueryResponse>;
