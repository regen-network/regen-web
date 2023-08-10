import { QueryObserverOptions } from '@tanstack/react-query';

import { GetBridgeTxStatusResponse } from 'lib/bridge';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryBridgeTxStatusResponse =
  QueryObserverOptions<GetBridgeTxStatusResponse | null>;

export type ReactQueryBridgeTxStatusParams = {
  request: {
    txHash: string;
  };
} & ReactQueryBuilderResponse<ReactQueryBridgeTxStatusResponse>;
