import { FailedFnType } from 'lib/atoms/error.atoms';
import { CSRF_ERROR } from 'lib/errors/apiErrors';

export type PostParams = {
  url: string;
  data?: any;
  token: string;
  method?: 'POST' | 'PUT' | 'DELETE';
  onSuccess?: (response: any) => Promise<void>;
  retryCsrfRequest?: (failedFunction: FailedFnType) => Promise<void>;
  parseTextResponse?: boolean;
};

export const postData = async ({
  url,
  data,
  token,
  method = 'POST',
  onSuccess,
  retryCsrfRequest,
  parseTextResponse,
}: PostParams) => {
  const postRequest = async (csrfToken: string) => {
    const rawResponse = await fetch(url, {
      method,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      }),
      credentials: 'include',
      body: JSON.stringify(data),
    });

    try {
      let jsonResponse, textResponse;
      if (parseTextResponse) {
        textResponse = await rawResponse.text();
      } else {
        jsonResponse = await rawResponse.json();
      }
      if ((textResponse || !jsonResponse.error) && onSuccess) {
        await onSuccess(jsonResponse ?? textResponse);
      }
      return jsonResponse ?? textResponse;
    } catch (e) {
      throw Error(rawResponse.statusText);
    }
  };

  const response = await postRequest(token);

  if (response.error === CSRF_ERROR && retryCsrfRequest) {
    retryCsrfRequest(postRequest);
  }

  return response;
};
