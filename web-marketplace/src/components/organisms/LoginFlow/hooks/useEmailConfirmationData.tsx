import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { apiUri } from 'lib/apiUri';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { onPostData } from 'components/organisms/LoginButton/hooks/onLoginPostData';
import { useTimer } from 'components/organisms/LoginButton/hooks/useTimer';
import { getEmailModalError } from 'components/organisms/LoginButton/utils/getEmailModalError';
import { EmailFormSchemaType } from 'components/organisms/LoginModal/LoginModal.schema';
import { CONNECTED_EMAIL_ERROR_TITLE } from 'components/organisms/UserAccountSettings/UserAccountSettings.constants';

import {
  DEFAULT_RESEND_ERROR,
  DEFAULT_VALIDATE_ERROR,
  EMAIL_CONFIRMATION_SUCCES,
  RESEND_SUCCES,
  RESEND_TIMER,
} from '../../LoginButton/LoginButton.constants';

type EmailConfirmationDataParams = {
  emailConfirmationText?: string;
};

export const useEmailConfirmationData = ({
  emailConfirmationText,
}: EmailConfirmationDataParams) => {
  const reactQueryClient = useQueryClient();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isConnectedEmailErrorModalOpen, setIsConnectedEmailErrorModalOpen] =
    useState(false);
  const [emailModalErrorCode, setEmailModalErrorCode] = useState('');
  const [email, setEmail] = useState('');
  const { privActiveAccount } = useAuth();
  const setBannerText = useSetAtom(bannerTextAtom);
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const retryCsrfRequest = useRetryCsrfRequest();
  const {
    timeLeft: resendTimeLeft,
    startTimer,
    resetTimer,
  } = useTimer({
    duration: RESEND_TIMER,
  });

  const onConfirmationModalClose = () => setIsConfirmationModalOpen(false);
  const onConnectedEmailErrorModalClose = () =>
    setIsConnectedEmailErrorModalOpen(false);
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
        retryCsrfRequest,
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
        retryCsrfRequest,
        onSuccess: async () => {
          await reactQueryClient.invalidateQueries([GET_ACCOUNTS_QUERY_KEY]);
          setBannerText(emailConfirmationText ?? EMAIL_CONFIRMATION_SUCCES);
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

  useEffect(() => {
    if (privActiveAccount?.email === email) {
      resetTimer();
    }
  }, [email, privActiveAccount?.email, resetTimer]);
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const onEmailSubmit = async ({
    email,
    callback,
  }: EmailFormSchemaType & { callback?: () => void }) => {
    if (token) {
      try {
        setEmail(email);
        const response: { error?: string } = await postData({
          url: `${apiUri}/marketplace/v1/auth/passcode`,
          data: {
            email,
          },
          token,
          retryCsrfRequest,
          onSuccess: async () => {
            callback && callback();
            startTimer();
            setIsConfirmationModalOpen(true);
          },
        });
        if (response.error) {
          if (response.error === CONNECTED_EMAIL_ERROR_TITLE) {
            setIsConnectedEmailErrorModalOpen(true);
          }
        }
      } catch (e) {
        setErrorBannerTextAtom(String(e));
      }
    }
  };

  return {
    email,
    setEmail,
    emailModalError,
    isConfirmationModalOpen,
    resendTimeLeft,
    onConfirmationModalClose,
    onMailCodeChange,
    onResendPasscode,
    setIsConfirmationModalOpen,
    onEmailSubmit,
    isConnectedEmailErrorModalOpen,
    onConnectedEmailErrorModalClose,
    retryCsrfRequest,
  };
};
