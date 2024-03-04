import { postData, PostParams } from 'utils/fetch/postData';

import { UseStateSetter } from 'types/react/use-state';
import { FailedFnType } from 'lib/atoms/error.atoms';
import { CSRF_ERROR } from 'lib/errors/apiErrors';

type Params = PostParams & {
  defaultError: string;
  setEmailModalErrorCode: UseStateSetter<string>;
  onSuccess?: (response: any) => Promise<void>;
  retryCsrfRequest?: (failedFunction: FailedFnType) => Promise<void>;
};

export const onPostData = async ({
  data,
  token,
  url,
  defaultError,
  onSuccess,
  setEmailModalErrorCode,
  retryCsrfRequest,
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
      setEmailModalErrorCode(response.error);
    }
  } catch (e: unknown) {
    setEmailModalErrorCode(defaultError);
  }
};
