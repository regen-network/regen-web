import {
  BatchBalanceInfo,
  BatchInfo,
  ProjectInfo,
} from '@regen-network/api/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

import { normalizeClassProjectForBatch } from '../classProjectForBatch/normalizeClassProjectForBatch';
import { EMPTY_CLASS_PROJECT_INFO } from '../classProjectForBatch/normalizeClassProjectForBatch.constants';
import {
  EMPTY_BALANCE_INFO,
  EMPTY_BATCH_INFO,
} from './normalizeEcocredits.constants';

interface Params {
  balance?: BatchBalanceInfo;
  project?: ProjectInfo | null;
  projectMetadata?: any | null;
  sanityCreditClassData?: AllCreditClassQuery;
  creditClassMetadata?: CreditClassMetadataLD;
  batch?: BatchInfo | null;
}

export const normalizeEcocredits = ({
  balance,
  batch,
  projectMetadata,
  creditClassMetadata,
  project,
  sanityCreditClassData,
}: Params): BatchInfoWithBalance => {
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
    balance: { ...(balance ?? EMPTY_BALANCE_INFO) },
  };
};
