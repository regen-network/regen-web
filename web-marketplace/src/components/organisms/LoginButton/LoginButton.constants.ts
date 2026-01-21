import { msg } from '@lingui/core/macro';

import { WALLET_CONNECT } from 'lib/wallet/wallet.constants';

export const mobileWalletsName = [WALLET_CONNECT];

export const RESEND_TEXT = msg`Don’t see anything?`;
export const RESEND_SUCCES = msg`New confirmation code sent`;
export const RESEND_BUTTON_TEXT = msg`Resend email.`;
export const EMAIL_CONFIRMATION_CANCEL = msg`cancel`;
export const EMAIL_CONFIRMATION_SUBMIT = msg`log in`;
export const EMAIL_CONFIRMATION_SUCCES = msg`Sign in successful`;
export const DEFAULT_VALIDATE_ERROR = msg`Incorrect code! Double-check the code and try again.`;
export const CODE_EXPIRED_ERROR = msg`This code has expired!`;
export const DEFAULT_RESEND_ERROR = msg`Failed to resend passcode`;
export const RESEND_TIMER = 60;
