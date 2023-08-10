import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryCsrfTokenResponse = QueryObserverOptions<
  string | undefined
>;

export type ReactQueryCsrfTokenProps =
  ReactQueryBuilderResponse<ReactQueryCsrfTokenResponse>;
