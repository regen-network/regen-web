import { PaymentMethod } from '@stripe/stripe-js';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetPostQueryResponse = QueryObserverOptions<{
  paymentMethods?: PaymentMethod[] | null;
}>;

export type ReactQueryGetPostQueryParams = {
  limit?: number;
} & ReactQueryBuilderResponse<ReactQueryGetPostQueryResponse>;
