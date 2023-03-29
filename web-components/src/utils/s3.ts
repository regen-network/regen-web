import axios from 'axios';

export async function uploadImage(
  image: File,
  filePath: string,
  apiServerUrl: string | undefined,
): Promise<string> {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('filePath', filePath);
 
  const resp = await axios.post(`${apiServerUrl}/files`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  const respOK = resp && resp.status === 200;
  if (respOK) {
    const data = await resp.data;

    return data.imageUrl;
  } else {
    return 'check request';
  }
}

export async function deleteImage(
  projectId: string,
  imageUrl: string,
  apiServerUrl: string | undefined,
): Promise<void> {
  const fileName = imageUrl.split(`${projectId}/`)[1];
  return axios.delete(`${apiServerUrl}/files/${projectId}/${fileName}`);
}
