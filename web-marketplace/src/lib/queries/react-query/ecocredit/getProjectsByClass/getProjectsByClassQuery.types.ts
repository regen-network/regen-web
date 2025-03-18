import { QueryProjectsByClassResponse } from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryProjectsByClassProps } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryProjectsResponse =
  QueryObserverOptions<QueryProjectsByClassResponse | void>;

export type ReactQueryProjectsByClassProps = Omit<
  QueryProjectsByClassProps,
  'client'
> & {
  client?: QueryProjectsByClassProps['client'];
} & ReactQueryBuilderResponse<ReactQueryProjectsResponse>;
