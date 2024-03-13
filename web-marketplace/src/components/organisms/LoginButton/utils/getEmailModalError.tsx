import { ReactNode } from 'react';

import {
  CODE_EXPIRED_ERROR,
  DEFAULT_VALIDATE_ERROR,
} from '../LoginButton.constants';
import { EmailLoginEvent, Track } from 'lib/tracker/types';

type Params = {
  errorCode: string;
  email: string;
  onResend: () => void;
  track: Track;
};

export const getEmailModalError = ({
  errorCode,
  onResend,
  email,
  track,
}: Params): ReactNode => {
  if (errorCode === 'passcode.expired') {
    track<EmailLoginEvent>('enterCodeExpired', {
      email,
      date: new Date().toUTCString(),
    });
    return CODE_EXPIRED_ERROR;
  } else if (errorCode === 'passcode.exceed_max_try') {
    track<EmailLoginEvent>('enterCodeIncorrect', {
      email,
      date: new Date().toUTCString(),
    });
    return (
      <div>
        Too many attempts!{' '}
        <div
          role="button"
          onClick={onResend}
          className="inline-block font-bold text-brand-400 whitespace-nowrap cursor-pointer"
        >
          Resend email
        </div>{' '}
        to get a new code.
      </div>
    );
  } else if (
    errorCode === 'passcode.code_mismatch' ||
    errorCode === 'passcode.not_found'
  ) {
    track<EmailLoginEvent>('enterCodeIncorrect', {
      email,
      date: new Date().toUTCString(),
    });
    return DEFAULT_VALIDATE_ERROR;
  }

  return errorCode;
};
