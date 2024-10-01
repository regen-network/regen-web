import { CustomImage } from 'generated/sanity-graphql';

export const getCustomImage = (image: CustomImage | undefined | null) => {
  return image?.image?.asset?.url ?? image?.imageHref;
};
