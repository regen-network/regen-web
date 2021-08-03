import { Maybe, CustomImage } from '../generated/sanity-graphql';
import { getOptimizedImageSrc } from 'web-components/lib/utils/optimizedImageSrc';

const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
const apiServerUri = process.env.REACT_APP_API_URI;

function validURL(str: string): boolean {
  return str.startsWith('http');
}

export function getImgSrc(imgSrc: string | undefined): string {
  if (!imgSrc) {
    return '';
  }
  if (!validURL(imgSrc)) {
    return require(`../assets/${imgSrc}`);
  }
  return imgSrc;
}

export function getSanityImgSrc(image?: Maybe<CustomImage>): string {
  const src = image?.imageHref || image?.image?.asset?.url || '';
  if (src.startsWith('https://regen-registry')) {
    return getOptimizedImageSrc(src, imageStorageBaseUrl, apiServerUri);
  }
  return src;
}
