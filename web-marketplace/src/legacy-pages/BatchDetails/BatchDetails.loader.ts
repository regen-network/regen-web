import { RouterParams } from 'clients/regen/Regen.Routes';

import { getBatchWithSupplyForDenom } from 'lib/ecocredit/api';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

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

    const batch = await getFromCacheOrFetch({
      query: {
        queryKey: ['batch-with-supply', batchDenom],
        queryFn: () => getBatchWithSupplyForDenom(batchDenom, rpcQueryClient),
      },
      reactQueryClient,
    });

    let metadata = null;
    if (batch?.metadata) {
      metadata = await getFromCacheOrFetch({
        query: getMetadataQuery({
          iri: batch.metadata,
          client: rpcQueryClient,
          languageCode,
        }),
        reactQueryClient,
      });
    }
    return { batch, metadata };
  };
