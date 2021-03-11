export function getOptimizedImgSrc(imgSrc: string | undefined): string {
  if (!imgSrc) {
    return '';
  }
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUri = process.env.REACT_APP_API_URI;
  if (!imageStorageBaseUrl || !apiServerUri || /.svg/.test(imgSrc)) {
    return imgSrc;
  }

  return imgSrc.replace(imageStorageBaseUrl, `${apiServerUri}/image/`);
}
