import {
  BatchInfo,
  QueryProjectResponse,
  QuerySupplyResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { UseQueryResult } from '@tanstack/react-query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
} from 'lib/db/types/json-ld';
import { getTxHashForBatch } from 'lib/ecocredit/api';
import { v1Alpha1BatchDenomMapping } from 'lib/ecocredit/ecocredit.config';
import { GetTxsEventQueryResponse } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery.types';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

type Props = {
  sanityCreditClassData?: AllCreditClassQuery;
  batches: BatchInfo[];
  createBatchTxs?: GetTxsEventQueryResponse | null;
  createBatchAlphaTxs?: GetTxsEventQueryResponse | null;
  batchesSupplyResult?: UseQueryResult<QuerySupplyResponse>[];
  batchesProjectResult?: UseQueryResult<QueryProjectResponse | null>[];
  batchesProjectMetadataResult?: UseQueryResult<
    AnchoredProjectMetadataLD | CreditClassMetadataLD
  >[];
  batchesClassMetadataResult: UseQueryResult<
    AnchoredProjectMetadataLD | CreditClassMetadataLD
  >[];
};

export const normalizeBatchesWithData = ({
  batches,
  batchesClassMetadataResult,
  batchesProjectResult,
  batchesProjectMetadataResult,
  batchesSupplyResult,
  createBatchAlphaTxs,
  createBatchTxs,
  sanityCreditClassData,
}: Props) => {
  const normalizedBatches = batches.map((batch, index) => {
    const txhash =
      getTxHashForBatch(createBatchTxs?.txResponses ?? [], batch.denom) ??
      getTxHashForBatch(
        createBatchAlphaTxs?.txResponses ?? [],
        v1Alpha1BatchDenomMapping[batch.denom],
      );

    const supplyData = batchesSupplyResult?.[index]?.data ?? {
      cancelledAmount: '',
      retiredAmount: '',
      tradableAmount: '',
    };
    const project = batchesProjectResult?.[index]?.data?.project;
    const classMetadata = batchesClassMetadataResult?.[index];
    const projectMetadata = batchesProjectMetadataResult?.[index];

    const creditClassSanity = findSanityCreditClass({
      sanityCreditClassData,
      creditClassIdOrUrl: project?.classId ?? '',
    });

    const classProjectInfo = {
      classId: project?.classId,
      className:
        classMetadata?.data?.['schema:name'] ?? creditClassSanity?.nameRaw,
      projectName: projectMetadata?.data?.['schema:name'] ?? batch.projectId,
      projectLocation: project?.jurisdiction,
    };

    return {
      ...batch,
      ...classProjectInfo,
      ...supplyData,
      txhash,
    };
  });

  return normalizedBatches;
};
