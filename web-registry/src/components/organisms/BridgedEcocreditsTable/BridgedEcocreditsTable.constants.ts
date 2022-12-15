export const STATUS_PENDING = 'pending';
export const STATUS_COMPLETE = 'complete';
export const STATUS_ERROR = 'error';

export const BRIDGED_STATUSES = {
  regen_hash_not_found: STATUS_PENDING,
  regen_ready: STATUS_PENDING,
  evm_broadcast: STATUS_PENDING,
  evm_confirmed: STATUS_COMPLETE,
  error: STATUS_ERROR,
};

export const CREDIT_BATCH_TOOLTIP =
  'Each credit batch has a unique ID (i.e. denomination) that starts with the abbreviation of the credit type followed by the project ID, start date and end date of the vintage year, and ending in the batch sequence number.';
export const NO_BRIDGED_CREDITS = 'No bridged ecocredits found';
export const AMOUNT_BRIDGED_TOOLTIP =
  'Amount bridged is the same as amount cancelled in the ledger documentation';
