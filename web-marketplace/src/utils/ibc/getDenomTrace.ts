import { queryDenomTraceByHashes } from 'lib/ibc/transfer/api';

export const IBC_DENOM_PREFIX = 'ibc/';

type Params = {
  denom: string;
};

export const getDenomtrace = async ({ denom }: Params): Promise<string> => {
  let baseDenom = denom;

  if (denom.includes(IBC_DENOM_PREFIX)) {
    const ibcDenomhash = denom.replace(IBC_DENOM_PREFIX, '');
    const denomTrace = await queryDenomTraceByHashes({
      hashes: [ibcDenomhash],
    });
    baseDenom = denomTrace[0]?.baseDenom;
  }

  return baseDenom;
};
