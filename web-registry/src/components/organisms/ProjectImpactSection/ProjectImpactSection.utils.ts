import { ImageType } from 'web-components/lib/types/shared/imageType';

import { Maybe, Sdg } from 'generated/sanity-graphql';
import { getSanityImgSrc } from 'lib/imgSrc';

type GetSdgsImagesParams = {
  sdgs?: Maybe<Maybe<Sdg>[]>;
};

export const getSdgsImages = ({ sdgs }: GetSdgsImagesParams) => {
  const sdgsImages: ImageType[] =
    sdgs?.map(sdg => ({
      src: getSanityImgSrc(sdg?.image),
      alt: String(sdg?.title ?? ''),
    })) ?? [];

  return sdgsImages;
};
