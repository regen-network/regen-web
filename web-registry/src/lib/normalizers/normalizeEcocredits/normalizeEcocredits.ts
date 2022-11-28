import {
  BatchBalanceInfo,
  BatchInfo,
  ProjectInfo,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

import { normalizeClassProjectForBatch } from '../normalizeClassProjectForBatch/normalizeClassProjectForBatch';
import {
  EMPTY_BATCH_INFO,
  EMPTY_CREDIT_CLASS,
} from './normalizeEcocredits.constants';

interface Params {
  balance: BatchBalanceInfo;
  project?: ProjectInfo;
  metadata?: any;
  sanityCreditClassData?: AllCreditClassQuery;
  batch?: BatchInfo;
}

export const normalizeEcocredits = ({
  balance,
  batch,
  metadata,
  project,
  sanityCreditClassData,
}: Params): BatchInfoWithBalance => {
  const hasAllClassInfos =
    !!batch && !!sanityCreditClassData && !!metadata && !!project;

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
    balance,
  };
};
