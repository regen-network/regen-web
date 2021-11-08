import axios from 'axios';

export async function uploadImage(
  image: File,
  filePath: string,
  apiServerUrl: string | undefined,
): Promise<string> {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('filePath', filePath);

  const resp = await axios.post(`${apiServerUrl}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  const respOK = resp && resp.status === 200;
  if (respOK) {
    const data = await resp.data;
    const storedImageUrl = data.result;

    console.log('uploadImage ', storedImageUrl);
    return storedImageUrl;
  } else {
    return 'check request';
  }
}

// async function postImage({ image, description }) {
//   const formData = new FormData();
//   formData.append('image', image);
//   formData.append('description', description);

//   const result = await axios.post('/images', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return result.data;
// }
