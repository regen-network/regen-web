import { QueryDenomResponse } from '@regen-network/api/ibc/applications/transfer/v1/query';
import { Denom } from '@regen-network/api/ibc/applications/transfer/v1/token';

import { QueryClient } from 'ledger';

type QueryDenomByHashParams = {
  queryClient: QueryClient;
  hash: string;
};
export const queryDenom = async ({
  hash,
  queryClient,
}: QueryDenomByHashParams): Promise<QueryDenomResponse> => {
  try {
    return queryClient.ibc.applications.transfer.v1.denom({ hash });
  } catch (err) {
    throw new Error(
      // eslint-disable-next-line lingui/no-unlocalized-strings
      `Error fetching denom trace with hash: ${hash}, err: ${err}`,
    );
  }
};

export type QueryDenomByHashesParams = {
  queryClient: QueryClient;
  hashes: string[];
};
export type DenomWithHash = Denom & { hash: string };

export const queryDenomByHashes = async ({
  queryClient,
  hashes,
}: QueryDenomByHashesParams): Promise<DenomWithHash[]> => {
  const denoms = await Promise.all(
    hashes.map(async hash => {
      const { denom } = await queryDenom({ queryClient, hash });

      return denom ? { ...denom, hash } : undefined;
    }),
  );

  return denoms
    .flat()
    .filter((trace): trace is DenomWithHash => trace !== undefined);
};
