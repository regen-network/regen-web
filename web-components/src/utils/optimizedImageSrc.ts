export function getOptimizedImageSrc(
  imgSrc: string | undefined | null,
  imageStorageBaseUrl: string | undefined,
  apiServerUri: string | undefined,
): string {
  if (!imgSrc) {
    return '';
  }
  if (!imageStorageBaseUrl || !apiServerUri || /.svg/.test(imgSrc)) {
    return imgSrc;
  }

  return imgSrc.replace(imageStorageBaseUrl, `${apiServerUri}/image/`);
}
