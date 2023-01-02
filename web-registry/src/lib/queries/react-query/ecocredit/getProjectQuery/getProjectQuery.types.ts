import { QueryProjectResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryProjectProps } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryProjectResponse =
  QueryObserverOptions<QueryProjectResponse | null>;

export type ReactQueryProjectProps = Omit<QueryProjectProps, 'client'> & {
  client?: QueryProjectProps['client'];
} & ReactQueryBuilderResponse<ReactQueryProjectResponse>;
