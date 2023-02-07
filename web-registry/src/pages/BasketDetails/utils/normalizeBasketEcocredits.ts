import { BasketBalanceInfo } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import {
  BatchInfo,
  ProjectInfo,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { ClassProjectInfo } from 'types/ledger/ecocredit';
import { normalizeClassProjectForBatch } from 'lib/normalizers/classProjectForBatch/normalizeClassProjectForBatch';
import { EMPTY_CLASS_PROJECT_INFO } from 'lib/normalizers/classProjectForBatch/normalizeClassProjectForBatch.constants';
import { EMPTY_BATCH_INFO } from 'lib/normalizers/ecocredits/normalizeEcocredits.constants';

interface Params {
  balance?: BasketBalanceInfo;
  project?: ProjectInfo | null;
  metadata?: any | null;
  sanityCreditClassData?: AllCreditClassQuery;
  batch?: BatchInfo | null;
}

export interface BasketBatchInfoWithBalance
  extends ClassProjectInfo,
    BatchInfo {
  balance: string;
}

export const normalizeBasketEcocredits = ({
  balance,
  batch,
  metadata,
  project,
  sanityCreditClassData,
}: Params): BasketBatchInfoWithBalance => {
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
    balance: balance?.balance ?? '0',
  };
};
