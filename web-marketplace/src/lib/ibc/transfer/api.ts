import {
  QueryDenomTraceResponse,
  QueryDenomTracesResponse,
} from '@regen-network/api/lib/generated/ibc/applications/transfer/v1/query';
import { DenomTrace } from '@regen-network/api/lib/generated/ibc/applications/transfer/v1/transfer';

import { getTransferQueryClient } from 'lib/clients/ibc/applications/transfer/transferQueryClient';

export const queryDenomTrace = async (
  hash: string,
): Promise<QueryDenomTraceResponse> => {
  const client = await getTransferQueryClient();
  try {
    return client.DenomTrace({ hash });
  } catch (err) {
    throw new Error(
      // eslint-disable-next-line lingui/no-unlocalized-strings
      `Error fetching denom trace with hash: ${hash}, err: ${err}`,
    );
  }
};

export const queryDenomTraces = async (): Promise<QueryDenomTracesResponse> => {
  const client = await getTransferQueryClient();
  try {
    return client.DenomTraces({});
  } catch (err) {
    // eslint-disable-next-line lingui/no-unlocalized-strings
    throw new Error(`Error fetching denom traces, err: ${err}`);
  }
};

export type QueryDenomTraceByHashesParams = {
  hashes: string[];
};
export type DenomTraceWithHash = DenomTrace & { hash: string };

export const queryDenomTraceByHashes = async ({
  hashes,
}: QueryDenomTraceByHashesParams): Promise<DenomTraceWithHash[]> => {
  const denomTraces = await Promise.all(
    hashes.map(async hash => {
      const { denomTrace } = await queryDenomTrace(hash);

      return denomTrace ? { ...denomTrace, hash } : undefined;
    }),
  );

  return denomTraces
    .flat()
    .filter((trace): trace is DenomTraceWithHash => trace !== undefined);
};
