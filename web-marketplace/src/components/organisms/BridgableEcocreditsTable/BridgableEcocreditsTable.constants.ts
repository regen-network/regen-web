import { msg } from '@lingui/core/macro';

export const BRIDGE_ACTION = msg`Bridge`;
export const CREDIT_BATCH_TOOLTIP = msg`Each credit batch has a unique ID (i.e. denomination) that starts with the abbreviation of the credit type followed by the project ID, start date and end date of the vintage year, and ending in the batch sequence number.`;
export const AMOUNT_BRIDGABLE_TOOLTIP = msg`The amount bridgable is the same as the amount tradable. Credits that have been retired cannot be bridged.`;
export const NO_BRIDGABLE_CREDITS = msg`No bridgable ecocredits found`;
