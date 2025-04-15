import { QueryDenomTraceResponse } from '@regen-network/api/ibc/applications/transfer/v1/query';
import { DenomTrace } from '@regen-network/api/ibc/applications/transfer/v1/transfer';

import { QueryClient } from 'ledger';

type QueryDenomTraceByHashParams = {
  queryClient: QueryClient;
  hash: string;
};
export const queryDenomTrace = async ({
  hash,
  queryClient,
}: QueryDenomTraceByHashParams): Promise<QueryDenomTraceResponse> => {
  try {
    return queryClient.ibc.applications.transfer.v1.denomTrace({ hash });
  } catch (err) {
    throw new Error(
      // eslint-disable-next-line lingui/no-unlocalized-strings
      `Error fetching denom trace with hash: ${hash}, err: ${err}`,
    );
  }
};

export type QueryDenomTraceByHashesParams = {
  queryClient: QueryClient;
  hashes: string[];
};
export type DenomTraceWithHash = DenomTrace & { hash: string };

export const queryDenomTraceByHashes = async ({
  queryClient,
  hashes,
}: QueryDenomTraceByHashesParams): Promise<DenomTraceWithHash[]> => {
  const denomTraces = await Promise.all(
    hashes.map(async hash => {
      const { denomTrace } = await queryDenomTrace({ queryClient, hash });

      return denomTrace ? { ...denomTrace, hash } : undefined;
    }),
  );

  return denomTraces
    .flat()
    .filter((trace): trace is DenomTraceWithHash => trace !== undefined);
};
