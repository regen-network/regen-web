import { QueryKey } from '@tanstack/react-query';

import type { WasmCodeClient } from './useCreateDao.codeDetails';
import { getCodeDetailsWithFallback } from './useCreateDao.codeDetails';

type GetCodeDetailsQueryParams = {
  client: WasmCodeClient;
  codeId: number;
  rpcEndpoint?: string | null;
};

export const wasmCodeDetailsQueryKey = ({
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
  queryKey: wasmCodeDetailsQueryKey({ codeId, rpcEndpoint }),
  queryFn: () => getCodeDetailsWithFallback(client, codeId),
  staleTime: Infinity,
  cacheTime: Infinity,
});
