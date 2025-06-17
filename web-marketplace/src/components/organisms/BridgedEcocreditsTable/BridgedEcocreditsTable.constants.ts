import { msg } from '@lingui/core/macro';

export const STATUS_PENDING = 'pending';
export const STATUS_COMPLETE = 'complete';
export const STATUS_ERROR = 'error';
export const TX_STATUS_REFRESH_INTERVAL = 10000;
export const ONE_MINUTE_MS = 60000;
export const TWO_MINUTE_MS = ONE_MINUTE_MS * 2;

export const BRIDGED_STATUSES = {
  regen_hash_not_found: STATUS_PENDING,
  regen_ready: STATUS_PENDING,
  evm_broadcast: STATUS_PENDING,
  evm_have_height: STATUS_PENDING,
  evm_confirmed: STATUS_COMPLETE,
  error: STATUS_ERROR,
};

export const CREDIT_BATCH_TOOLTIP = msg`Each credit batch has a unique ID (i.e. denomination) that starts with the abbreviation of the credit type followed by the project ID, start date and end date of the vintage year, and ending in the batch sequence number.`;
export const NO_BRIDGED_CREDITS = msg`No bridged ecocredits found`;
export const AMOUNT_BRIDGED_TOOLTIP = msg`Amount bridged is the same as amount cancelled in the ledger documentation`;
export const STATUS_TOOLTIP = msg`Status refreshes automatically once every 10 seconds if in a pending state.`;
