export type PostParams = {
  url: string;
  data?: any;
  token: string;
  method?: 'POST' | 'PUT';
};

export const postData = async ({
  url,
  data,
  token,
  method = 'POST',
}: PostParams) => {
  const rawResponse = await fetch(url, {
    method,
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token,
    }),
    credentials: 'include',
    body: JSON.stringify(data),
  });

  try {
    return rawResponse.json();
  } catch (e) {
    throw Error(rawResponse.statusText);
  }
};
