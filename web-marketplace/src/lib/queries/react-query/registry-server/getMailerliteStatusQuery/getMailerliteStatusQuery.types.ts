import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

type MailerliteStatus = {
  subscribed: boolean;
};

export type ReactQueryGetMailerliteStatusQueryResponse =
  QueryObserverOptions<MailerliteStatus | null>;

export type ReactQueryGetMailerliteStatusQueryParams =
  ReactQueryBuilderResponse<ReactQueryGetMailerliteStatusQueryResponse>;
