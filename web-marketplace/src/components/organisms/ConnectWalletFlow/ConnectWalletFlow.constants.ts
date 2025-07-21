import { msg } from '@lingui/macro';

export const ADDRESS_USED_ERROR_RAW =
  'This wallet address is already in use by another account.';
export const ADDRESS_USED_ERROR = msg`This wallet address is already in use by another account.`;
export const ADDRESS_USED_WITH_EMAIL_ERROR_RAW =
  'You cannot connect your account to this wallet address. This wallet address is already associated with another email address.';
export const ADDRESS_USED_WITH_EMAIL_ERROR = msg`You cannot connect your account to this wallet address. This wallet address is already associated with another email address.`;
export const ADDRESS_USED_TITLE = msg`This wallet address is already in use by another account. Do you want to merge these accounts?`;
export const ADDRESS_USED_DESCRIPTION = msg`If you merge these accounts, you can log in with either your wallet address, email or google  to the same account.`;
export const ADDRESS_USED_CANCEL = msg`whoops! Cancel`;
export const ADDRESS_USED_NEXT = msg`yes, merge`;

export const SELECT_ACCOUNT_TITLE = msg`Please select which profile info you want to keep for your new merged account`;
export const SELECT_ACCOUNT_DESCRIPTION = msg`You can only keep the profile info from one of these accounts, which includes your avatar image, background photo, social links, and description. All projects and project info will be retained.`;
export const SELECT_ACCOUNT_CANCEL = msg`cancel`;
export const SELECT_ACCOUNT_MERGE = msg`merge accounts`;
export const CURRENT_ACCOUNT = msg`current account`;
