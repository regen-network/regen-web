import {
  BatchBalanceInfo,
  BatchInfo,
} from '@regen-network/api/regen/ecocredit/v1/query';

export const EMPTY_BATCH_INFO: BatchInfo = {
  denom: '',
  issuer: '',
  projectId: '',
  metadata: '',
  open: false,
};

export const EMPTY_BALANCE_INFO: BatchBalanceInfo = {
  address: '',
  batchDenom: '',
  escrowedAmount: '',
  retiredAmount: '',
  tradableAmount: '',
};
