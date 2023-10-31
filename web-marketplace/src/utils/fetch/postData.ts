type Params = {
  url: string;
  data: any;
  token: string;
  method?: 'POST' | 'PUT';
};

export const postData = async ({
  url,
  data,
  token,
  method = 'POST',
}: Params) => {
  const response = await fetch(url, {
    method,
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token,
    }),
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    throw Error(response.statusText);
  }

  return response.json();
};
