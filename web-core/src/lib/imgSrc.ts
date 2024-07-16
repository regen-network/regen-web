import { CustomImage, Maybe } from '../generated/sanity-graphql';

export function getSanityImgSrc(
  image?: Maybe<CustomImage>,
  defaultValue?: string,
): string {
  return image?.imageHref || image?.image?.asset?.url || defaultValue || '';
}
