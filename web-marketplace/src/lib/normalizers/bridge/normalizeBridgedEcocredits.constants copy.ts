import { BatchInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

export const EMPTY_BATCH_INFO: BatchInfo = {
  $type: BatchInfo.$type,
  denom: '',
  issuer: '',
  projectId: '',
  metadata: '',
  open: false,
};
