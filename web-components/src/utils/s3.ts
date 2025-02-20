import axios from 'axios';

export async function uploadFile(
  file: File,
  filePath: string,
  apiServerUrl: string | undefined,
) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('filePath', filePath);

  const resp = await axios.post(
    `${apiServerUrl}/marketplace/v1/files`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    },
  );

  const respOK = resp && resp.status === 200;
  if (respOK) {
    const data = await resp.data;

    return data;
  }
}

export async function deleteImage(
  path: string,
  projectOrAccountId: string,
  imageUrl: string,
  apiServerUrl: string | undefined,
): Promise<void> {
  const fileName = imageUrl.split(`${projectOrAccountId}/`)[1];
  await fetch(
    `${apiServerUrl}/marketplace/v1/files/${path}/${projectOrAccountId}?fileName=${fileName}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );
}
