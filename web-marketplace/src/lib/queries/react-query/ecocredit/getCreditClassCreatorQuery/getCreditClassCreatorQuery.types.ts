import { QueryParamsRequest } from '@regen-network/api/cosmos/auth/v1beta1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { RPCQueryClientProps } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryCreditClassCreatorResponse =
  QueryObserverOptions<boolean>;

export type ReactQueryCreditClassCreatorProps = {
  request: QueryParamsRequest & {
    activeAddress?: string;
  };
  client: RPCQueryClientProps['client'];
} & ReactQueryBuilderResponse<ReactQueryCreditClassCreatorResponse>;
