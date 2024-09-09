import { msg } from '@lingui/macro';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { RESEND_TEXT } from '../LoginButton.constants';

type Params = {
  resendTimeLeft: number | null;
  _: TranslatorType;
};

export const getResendCodeLabel = ({ resendTimeLeft, _ }: Params) => {
  return resendTimeLeft === null
    ? _(RESEND_TEXT)
    : _(msg`Resend after ${resendTimeLeft} seconds.`);
};
