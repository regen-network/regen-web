import { ReactNode } from 'react';
import { Trans } from '@lingui/react/macro';

import { TranslatorType } from 'lib/i18n/i18n.types';

import {
  CODE_EXPIRED_ERROR,
  DEFAULT_VALIDATE_ERROR,
} from '../LoginButton.constants';

type Params = {
  errorCode: string;
  _: TranslatorType;
  onResend: () => void;
};

export const getEmailModalError = ({
  errorCode,
  _,
  onResend,
}: Params): ReactNode => {
  if (errorCode === 'passcode.expired') {
    return _(CODE_EXPIRED_ERROR);
  } else if (errorCode === 'passcode.exceed_max_try') {
    return (
      <div>
        <Trans>
          Too many attempts!{' '}
          <div
            role="button"
            onClick={onResend}
            className="inline-block font-bold text-brand-400 whitespace-nowrap cursor-pointer"
          >
            Resend email
          </div>{' '}
          to get a new code.
        </Trans>
      </div>
    );
  } else if (
    errorCode === 'passcode.code_mismatch' ||
    errorCode === 'passcode.not_found'
  ) {
    return _(DEFAULT_VALIDATE_ERROR);
  }

  return errorCode;
};
