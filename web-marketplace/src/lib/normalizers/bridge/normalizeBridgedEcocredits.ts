import { TxResponse } from '@regen-network/api/cosmos/base/abci/v1beta1/abci';
import {
  BatchInfo,
  ProjectInfo,
} from '@regen-network/api/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { BridgedEcocredits } from 'types/ledger/ecocredit';
import { GetBridgeTxStatusResponse } from 'lib/bridge';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

import { TxCredits } from 'components/organisms/BridgedEcocreditsTable/BridgedEcocreditsTable.types';

import { normalizeClassProjectForBatch } from '../classProjectForBatch/normalizeClassProjectForBatch';
import { EMPTY_CLASS_PROJECT_INFO } from '../classProjectForBatch/normalizeClassProjectForBatch.constants';
import { EMPTY_BATCH_INFO } from '../ecocredits/normalizeEcocredits.constants';

interface Params {
  project?: ProjectInfo | null;
  projectMetadata?: any | null;
  sanityCreditClassData?: AllCreditClassQuery;
  creditClassMetadata?: CreditClassMetadataLD;
  batch?: BatchInfo | null;
  txStatus?: GetBridgeTxStatusResponse | null;
  txResponse?: TxResponse;
  credit: TxCredits;
}

export const normalizeBridgedEcocredits = ({
  batch,
  projectMetadata,
  project,
  sanityCreditClassData,
  creditClassMetadata,
  credit,
  txResponse,
  txStatus,
}: Params): BridgedEcocredits => {
  const hasAllClassInfos =
    (batch !== undefined &&
      projectMetadata !== undefined &&
      project !== undefined &&
      !!sanityCreditClassData) ||
    creditClassMetadata !== undefined;

  const classProjectInfo = hasAllClassInfos
    ? normalizeClassProjectForBatch({
        batch,
        sanityCreditClassData,
        creditClassMetadata,
        projectMetadata,
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
