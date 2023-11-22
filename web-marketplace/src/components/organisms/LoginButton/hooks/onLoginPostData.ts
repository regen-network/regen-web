import { postData, PostParams } from 'utils/fetch/postData';

import { UseStateSetter } from 'types/react/use-state';

type Params = PostParams & {
  defaultError: string;
  setEmailModalErrorCode: UseStateSetter<string>;
  onSuccess?: () => Promise<void>;
};

export const onPostData = async ({
  data,
  token,
  url,
  defaultError,
  onSuccess,
  setEmailModalErrorCode,
}: Params) => {
  try {
    const response: { error?: string } = await postData({
      url: url,
      data,
      token,
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
