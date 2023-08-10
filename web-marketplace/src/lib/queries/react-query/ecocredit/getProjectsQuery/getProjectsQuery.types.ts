import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryProjectsProps } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryProjectsResponse =
  QueryObserverOptions<QueryProjectsResponse | void>;

export type ReactQueryProjectsProps = Omit<QueryProjectsProps, 'client'> & {
  client?: QueryProjectsProps['client'];
} & ReactQueryBuilderResponse<ReactQueryProjectsResponse>;
