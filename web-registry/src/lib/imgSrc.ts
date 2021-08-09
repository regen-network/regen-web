import { Maybe, CustomImage } from '../generated/sanity-graphql';

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
  return image?.imageHref || image?.image?.asset?.url || '';
}
