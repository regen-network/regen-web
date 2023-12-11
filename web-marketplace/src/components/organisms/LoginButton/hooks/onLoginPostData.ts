import { postData, PostParams } from 'utils/fetch/postData';

import { UseStateSetter } from 'types/react/use-state';
import { FailedFnType } from 'lib/atoms/error.atoms';

type Params = PostParams & {
  defaultError: string;
  setEmailModalErrorCode: UseStateSetter<string>;
  onSuccess?: () => Promise<void>;
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
    });
    if (response.error) {
      setEmailModalErrorCode(response.error);
    } else {
      onSuccess && onSuccess();
    }
  } catch (e: unknown) {
    setEmailModalErrorCode(defaultError);
  }
};
