import { RESEND_TEXT } from '../LoginButton.constants';

type Params = {
  resendTimeLeft: number | null;
};

export const getResendCodeLabel = ({ resendTimeLeft }: Params) => {
  return resendTimeLeft === null
    ? RESEND_TEXT
    : `Resend after ${resendTimeLeft} seconds.`;
};
