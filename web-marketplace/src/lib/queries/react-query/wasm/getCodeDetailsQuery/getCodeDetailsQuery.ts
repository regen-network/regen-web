import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

import { getCodeDetails } from './getCodeDetailsQuery.helpers';
import { getCodeDetailsQueryKey } from './getCodeDetailsQuery.utils';

export type GetCodeDetailsQueryParams = {
  client: CosmWasmClient;
  codeId: number;
  rpcEndpoint?: string | null;
};

export const getCodeDetailsQuery = ({
  client,
  codeId,
}: GetCodeDetailsQueryParams) => ({
  queryKey: getCodeDetailsQueryKey({ codeId }),
  queryFn: () => getCodeDetails({ client, codeId }),
  staleTime: Infinity,
  cacheTime: Infinity,
});
