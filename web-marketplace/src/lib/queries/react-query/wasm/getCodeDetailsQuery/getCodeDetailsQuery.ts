import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { QueryKey } from '@tanstack/react-query';

import { getCodeDetails } from './getCodeDetailsQuery.helpers';

export type GetCodeDetailsQueryParams = {
  client: CosmWasmClient;
  codeId: number;
  rpcEndpoint?: string | null;
};

export const getCodeDetailsQueryKey = ({
  codeId,
  rpcEndpoint,
}: Pick<GetCodeDetailsQueryParams, 'codeId' | 'rpcEndpoint'>): QueryKey => [
  'wasm',
  'code-details',
  rpcEndpoint ?? 'default',
  codeId,
];

export const getCodeDetailsQuery = ({
  client,
  codeId,
  rpcEndpoint,
}: GetCodeDetailsQueryParams) => ({
  queryKey: getCodeDetailsQueryKey({ codeId, rpcEndpoint }),
  queryFn: () => getCodeDetails({ client, codeId }),
  staleTime: Infinity,
  cacheTime: Infinity,
});
