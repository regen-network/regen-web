import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';
import {
  BatchInfo,
  ProjectInfo,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { BridgedEcocredits } from 'types/ledger/ecocredit';
import { GetBridgeTxStatusResponse } from 'lib/bridge';

import { TxCredits } from 'components/organisms/BridgedEcocreditsTable/BridgedEcocreditsTable.types';

import { normalizeClassProjectForBatch } from '../classProjectForBatch/normalizeClassProjectForBatch';
import { EMPTY_CLASS_PROJECT_INFO } from '../classProjectForBatch/normalizeClassProjectForBatch.constants';
import { EMPTY_BATCH_INFO } from '../ecocredits/normalizeEcocredits.constants';

interface Params {
  project?: ProjectInfo | null;
  metadata?: any | null;
  sanityCreditClassData?: AllCreditClassQuery;
  batch?: BatchInfo | null;
  txStatus?: GetBridgeTxStatusResponse | null;
  txResponse?: TxResponse;
  credit: TxCredits;
}

export const normalizeBridgedEcocredits = ({
  batch,
  metadata,
  project,
  sanityCreditClassData,
  credit,
  txResponse,
  txStatus,
}: Params): BridgedEcocredits => {
  const hasAllClassInfos =
    batch !== undefined &&
    metadata !== undefined &&
    project !== undefined &&
    !!sanityCreditClassData;

  const classProjectInfo = hasAllClassInfos
    ? normalizeClassProjectForBatch({
        batch,
        sanityCreditClassData,
        metadata,
        project,
      })
    : EMPTY_CLASS_PROJECT_INFO;

  return {
    ...(batch ?? EMPTY_BATCH_INFO),
    ...classProjectInfo,
    amount: credit.amount,
    status: txStatus?.status,
    destinationTxHash: txStatus?.evm_tx_hash,
    txHash: txResponse?.txhash,
    txTimestamp: txResponse?.timestamp,
  };
};
