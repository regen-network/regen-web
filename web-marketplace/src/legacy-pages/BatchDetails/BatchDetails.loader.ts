import { RouterParams } from 'clients/regen/Regen.Routes';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { getClassIdForBatch } from 'lib/ecocredit/api';
import { getBatchQuery } from 'lib/queries/react-query/ecocredit/getBatchQuery/getBatchQuery';
import { getSupplyQuery } from 'lib/queries/react-query/ecocredit/getSupplyQuery/getSupplyQuery';
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

    const batchInfo = await getFromCacheOrFetch({
      query: getBatchQuery({
        client: rpcQueryClient,
        request: { batchDenom },
      }),
      reactQueryClient,
    });

    const supply = await getFromCacheOrFetch({
      query: getSupplyQuery({
        client: rpcQueryClient,
        request: { batchDenom },
      }),
      reactQueryClient,
    });

    const batch: BatchInfoWithSupply = {
      ...batchInfo?.batch,
      ...(supply ?? {
        tradableAmount: '0',
        retiredAmount: '0',
        cancelledAmount: '0',
      }),
      issuer: batchInfo?.batch?.issuer || '',
      projectId: batchInfo?.batch?.projectId || '',
      denom: batchInfo?.batch?.denom || '',
      metadata: batchInfo?.batch?.metadata || '',
      startDate: batchInfo?.batch?.startDate || new Date(),
      endDate: batchInfo?.batch?.endDate || new Date(),
      issuanceDate: batchInfo?.batch?.issuanceDate || new Date(),
      open: !!batchInfo?.batch?.open,
      classId: getClassIdForBatch(batchInfo?.batch),
    };

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
