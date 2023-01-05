import {
  BatchBalanceInfo,
  BatchInfo,
  ProjectInfo,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

import { normalizeClassProjectForBatch } from '../classProjectForBatch/normalizeClassProjectForBatch';
import {
  EMPTY_BALANCE_INFO,
  EMPTY_BATCH_INFO,
  EMPTY_CREDIT_CLASS,
} from './normalizeEcocredits.constants';

interface Params {
  balance?: BatchBalanceInfo;
  project?: ProjectInfo | null;
  metadata?: any | null;
  sanityCreditClassData?: AllCreditClassQuery;
  batch?: BatchInfo | null;
}

export const normalizeEcocredits = ({
  balance,
  batch,
  metadata,
  project,
  sanityCreditClassData,
}: Params): BatchInfoWithBalance => {
  const hasAllClassInfos =
    batch !== null &&
    metadata !== null &&
    project !== null &&
    !!sanityCreditClassData;

  const classProjectInfo = hasAllClassInfos
    ? normalizeClassProjectForBatch({
        batch,
        sanityCreditClassData,
        metadata,
        project,
      })
    : EMPTY_CREDIT_CLASS;

  return {
    ...(batch ?? EMPTY_BATCH_INFO),
    ...classProjectInfo,
    balance: { ...(balance ?? EMPTY_BALANCE_INFO) },
  };
};
