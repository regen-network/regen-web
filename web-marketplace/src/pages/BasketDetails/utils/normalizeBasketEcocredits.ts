import { BasketBalanceInfo } from '@regen-network/api/regen/ecocredit/basket/v1/query';
import {
  BatchInfo,
  ProjectInfo,
} from '@regen-network/api/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { ClassProjectInfo } from 'types/ledger/ecocredit';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { normalizeClassProjectForBatch } from 'lib/normalizers/classProjectForBatch/normalizeClassProjectForBatch';
import { EMPTY_CLASS_PROJECT_INFO } from 'lib/normalizers/classProjectForBatch/normalizeClassProjectForBatch.constants';
import { EMPTY_BATCH_INFO } from 'lib/normalizers/ecocredits/normalizeEcocredits.constants';

interface Params {
  balance?: BasketBalanceInfo;
  project?: ProjectInfo | null;
  projectMetadata?: any | null;
  creditClassMetadata?: CreditClassMetadataLD;
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
  projectMetadata,
  project,
  sanityCreditClassData,
  creditClassMetadata,
}: Params): BasketBatchInfoWithBalance => {
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
        projectMetadata,
        project,
        creditClassMetadata,
      })
    : EMPTY_CLASS_PROJECT_INFO;

  return {
    ...(batch ?? EMPTY_BATCH_INFO),
    ...classProjectInfo,
    balance: balance?.balance ?? '0',
  };
};
