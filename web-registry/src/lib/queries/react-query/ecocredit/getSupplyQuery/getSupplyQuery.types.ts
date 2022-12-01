import { QuerySupplyResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QuerySupplyProps } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQuerySupplyResponse =
  QueryObserverOptions<QuerySupplyResponse>;

export type ReactQuerySupplyProps = Omit<QuerySupplyProps, 'client'> &
  ReactQueryBuilderResponse<ReactQuerySupplyResponse>;
