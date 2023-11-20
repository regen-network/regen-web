import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData, PostParams } from 'utils/fetch/postData';
import { capitalizeWord } from 'utils/string/capitalizeWord';

import { apiUri } from 'lib/apiUri';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import {
  DEFAULT_RESEND_ERROR,
  DEFAULT_VALIDATE_ERROR,
  EMAIL_CONFIRMATION_SUCCES,
  RESEND_SUCCES,
} from '../LoginButton.constants';

export const useEmailConfirmationData = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [emailModalError, setEmailModalError] = useState('');
  const [email, setEmail] = useState('');
  const setBannerText = useSetAtom(bannerTextAtom);
  const { data: token } = useQuery(getCsrfTokenQuery({}));

  const onPostData = async ({
    data,
    token,
    url,
    defaultError,
  }: PostParams & { defaultError: string }) => {
    try {
      const response: { error?: string } = await postData({
        url: url,
        data,
        token,
      });
      if (response.error) {
        const errorMessage = capitalizeWord(
          response.error.replace(/[._]/g, ' '),
        );
        setEmailModalError(errorMessage ?? defaultError);
      }
    } catch (e: unknown) {
      setEmailModalError(defaultError);
    }
  };

  const onConfirmationModalClose = () => setIsConfirmationModalOpen(false);
  const onResendPasscode = async () => {
    if (token) {
      await onPostData({
        url: `${apiUri}/marketplace/v1/auth/passcode`,
        data: {
          email,
        },
        token,
        defaultError: DEFAULT_RESEND_ERROR,
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
      });
      setBannerText(EMAIL_CONFIRMATION_SUCCES);
      onConfirmationModalClose();
    } else {
      setEmailModalError('');
    }
  };

  return {
    email,
    setEmail,
    emailModalError,
    isConfirmationModalOpen,
    onConfirmationModalClose,
    onMailCodeChange,
    onResendPasscode,
    setIsConfirmationModalOpen,
  };
};
