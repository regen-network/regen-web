import { TranslatorType } from 'lib/i18n/i18n.types';

import { RESEND_BUTTON_TEXT } from '../LoginButton.constants';

type Params = {
  resendTimeLeft: number | null;
  onResendPasscode: () => Promise<void>;
  _: TranslatorType;
};

export const getResendCodeButtonLink = ({
  resendTimeLeft,
  _,
  onResendPasscode,
}: Params) => {
  return resendTimeLeft
    ? undefined
    : {
        text: _(RESEND_BUTTON_TEXT),
        onClick: onResendPasscode,
      };
};
