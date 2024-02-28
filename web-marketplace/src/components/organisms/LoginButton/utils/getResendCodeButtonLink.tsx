import { RESEND_BUTTON_TEXT } from '../LoginButton.constants';

type Params = {
  resendTimeLeft: number | null;
  onResendPasscode: () => Promise<void>;
};

export const getResendCodeButtonLink = ({
  resendTimeLeft,
  onResendPasscode,
}: Params) => {
  return resendTimeLeft
    ? undefined
    : {
        text: RESEND_BUTTON_TEXT,
        onClick: onResendPasscode,
      };
};
