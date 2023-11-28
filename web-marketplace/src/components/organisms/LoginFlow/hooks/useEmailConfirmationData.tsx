import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { apiUri } from 'lib/apiUri';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { onPostData } from 'components/organisms/LoginButton/hooks/onLoginPostData';
import { useTimer } from 'components/organisms/LoginButton/hooks/useTimer';
import { getEmailModalError } from 'components/organisms/LoginButton/utils/getEmailModalError';

import {
  DEFAULT_RESEND_ERROR,
  DEFAULT_VALIDATE_ERROR,
  EMAIL_CONFIRMATION_SUCCES,
  RESEND_SUCCES,
  RESEND_TIMER,
} from '../../LoginButton/LoginButton.constants';

export const useEmailConfirmationData = () => {
  const reactQueryClient = useQueryClient();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [emailModalErrorCode, setEmailModalErrorCode] = useState('');
  const [email, setEmail] = useState('');
  const setBannerText = useSetAtom(bannerTextAtom);
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const { timeLeft: resendTimeLeft, startTimer } = useTimer({
    duration: RESEND_TIMER,
  });

  const onConfirmationModalClose = () => setIsConfirmationModalOpen(false);
  const onResendPasscode = async () => {
    if (token && resendTimeLeft === null) {
      startTimer();
      await onPostData({
        url: `${apiUri}/marketplace/v1/auth/passcode`,
        data: {
          email,
        },
        token,
        defaultError: DEFAULT_RESEND_ERROR,
        setEmailModalErrorCode,
      });
      setBannerText(RESEND_SUCCES);
    }
  };
  const onMailCodeChange = async (passcode: string) => {
    if (token && passcode.length === 6) {
      await onPostData({
        url: `${apiUri}/marketplace/v1/auth/passcode/verify`,
        data: {
          email,
          passcode,
        },
        token,
        defaultError: DEFAULT_VALIDATE_ERROR,
        onSuccess: async () => {
          await reactQueryClient.invalidateQueries([GET_ACCOUNTS_QUERY_KEY]);
          setBannerText(EMAIL_CONFIRMATION_SUCCES);
          onConfirmationModalClose();
        },
        setEmailModalErrorCode,
      });
    } else {
      setEmailModalErrorCode('');
    }
  };

  const emailModalError = getEmailModalError({
    errorCode: emailModalErrorCode,
    onResend: onResendPasscode,
  });

  return {
    email,
    setEmail,
    emailModalError,
    isConfirmationModalOpen,
    resendTimeLeft,
    startResendTimer: startTimer,
    onConfirmationModalClose,
    onMailCodeChange,
    onResendPasscode,
    setIsConfirmationModalOpen,
  };
};
