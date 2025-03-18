import { QueryClient } from 'ledger';
import { queryDenomTraceByHashes } from 'lib/ibc/transfer/api';

export const IBC_DENOM_PREFIX = 'ibc/';

type Params = {
  denom: string;
  queryClient?: QueryClient;
};

export const getDenomtrace = async ({
  denom,
  queryClient,
}: Params): Promise<string> => {
  let baseDenom = denom;

  if (denom.includes(IBC_DENOM_PREFIX) && queryClient) {
    const ibcDenomhash = denom.replace(IBC_DENOM_PREFIX, '');
    const denomTrace = await queryDenomTraceByHashes({
      hashes: [ibcDenomhash],
      queryClient,
    });
    baseDenom = denomTrace[0]?.baseDenom;
  }

  return baseDenom;
};
