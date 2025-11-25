import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

import { AssignedResponse } from '../DaoRbam.types';

export type ReactQueryGetAssignedQueryResponse =
  QueryObserverOptions<AssignedResponse>;

export type AssignedQueryParams = {
  addr: string;
  roleId: number;
  daoRbamAddress: string;
};
export type ReactQueryGetAssignedQueryParams = AssignedQueryParams & {
  client: CosmWasmClient;
} & ReactQueryBuilderResponse<ReactQueryGetAssignedQueryResponse>;
