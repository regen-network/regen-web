import { Maybe, CustomImage } from '../generated/sanity-graphql';

export function getSanityImgSrc(image?: Maybe<CustomImage>): string {
  return image?.imageHref || image?.image?.asset?.url || '';
}
