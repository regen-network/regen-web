import { RouterParams } from 'clients/regen/Regen.Routes';

import { getMetadata } from 'lib/db/api/metadata-graph';
import { getBatchWithSupplyForDenom } from 'lib/ecocredit/api';

export const batchDetailsLoader =
  ({
    reactQueryClient,
    rpcQueryClient,
    languageCode,
  }: Pick<
    RouterParams,
    'reactQueryClient' | 'rpcQueryClient' | 'languageCode'
  >) =>
  async ({ params }: { params: { batchDenom?: string } }) => {
    const batchDenom = params.batchDenom;
    if (!batchDenom || rpcQueryClient === undefined) {
      return { batch: null, metadata: null };
    }

    const batch = await reactQueryClient.fetchQuery({
      queryKey: ['batch', batchDenom],
      queryFn: () => getBatchWithSupplyForDenom(batchDenom, rpcQueryClient),
    });

    let metadata = null;
    if (batch?.metadata) {
      metadata = await reactQueryClient.fetchQuery({
        queryKey: ['batchMetadata', batch.metadata, languageCode],
        queryFn: () =>
          getMetadata({
            iri: batch.metadata,
            client: rpcQueryClient,
            languageCode,
          }),
      });
    }
    return { batch, metadata };
  };
