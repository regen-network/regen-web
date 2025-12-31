import { QueryClient } from 'ledger';
import { queryDenomByHashes } from 'lib/ibc/transfer/api';

export const IBC_DENOM_PREFIX = 'ibc/';

type Params = {
  denom: string;
  queryClient?: QueryClient;
};

export const getBaseDenom = async ({
  denom,
  queryClient,
}: Params): Promise<string> => {
  let baseDenom = denom;

  if (denom.includes(IBC_DENOM_PREFIX) && queryClient) {
    const ibcDenomhash = denom.replace(IBC_DENOM_PREFIX, '');
    const denomByHash = await queryDenomByHashes({
      hashes: [ibcDenomhash],
      queryClient,
    });
    baseDenom = denomByHash[0]?.base;
  }

  return baseDenom;
};
