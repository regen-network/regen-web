import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

type SubscribersStatus = {
  subscribed: boolean;
};

export type ReactQueryGetSubscribersStatusQueryResponse =
  QueryObserverOptions<SubscribersStatus | null>;

export type ReactQueryGetSubscribersStatusQueryParams =
  ReactQueryBuilderResponse<ReactQueryGetSubscribersStatusQueryResponse>;
