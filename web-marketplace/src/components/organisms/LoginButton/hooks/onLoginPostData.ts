import { postData, PostParams } from 'utils/fetch/postData';

import { UseStateSetter } from 'types/react/use-state';
import { FailedFnType } from 'lib/atoms/error.atoms';
import { CSRF_ERROR } from 'lib/errors/apiErrors';
import { EmailLoginEvent, Track } from 'lib/tracker/types';

type Params = PostParams & {
  defaultError: string;
  setEmailModalErrorCode: UseStateSetter<string>;
  onSuccess?: (response: any) => Promise<void>;
  retryCsrfRequest?: (failedFunction: FailedFnType) => Promise<void>;
  track?: Track;
};

export const onPostData = async ({
  data,
  token,
  url,
  defaultError,
  onSuccess,
  setEmailModalErrorCode,
  retryCsrfRequest,
  track,
}: Params) => {
  try {
    const response: { error?: string } = await postData({
      url: url,
      data,
      token,
      retryCsrfRequest,
      onSuccess,
    });
    if (response.error && response.error !== CSRF_ERROR) {
      await trackError(response.error, data.email, track);
      setEmailModalErrorCode(response.error);
    }
  } catch (e: unknown) {
    await trackError(defaultError, data.email, track);
    setEmailModalErrorCode(defaultError);
  }
};

const trackError = async (errorCode: string, email?: string, track?: Track) => {
  if (track && email) {
    if (errorCode === 'passcode.expired') {
      await track<EmailLoginEvent>('enterCodeExpired', {
        email,
        date: new Date().toUTCString(),
      });
    } else if (
      errorCode === 'passcode.code_mismatch' ||
      errorCode === 'passcode.exceed_max_try'
    ) {
      await track<EmailLoginEvent>('enterCodeIncorrect', {
        email,
        date: new Date().toUTCString(),
      });
    }
  }
};
