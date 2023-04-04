import { ImageType } from 'web-components/lib/types/shared/imageType';

import { Maybe, Sdg } from 'generated/sanity-graphql';

type GetSdgsImagesParams = {
  sdgs?: Maybe<Maybe<Sdg>[]>;
};

export const getSdgsImages = ({ sdgs }: GetSdgsImagesParams) => {
  const sdgsImages: ImageType[] =
    sdgs?.map(sdg => ({
      src: String(sdg?.image?.image?.asset?.url ?? sdg?.image?.imageHref ?? ''),
      alt: String(sdg?.title ?? ''),
    })) ?? [];

  return sdgsImages;
};
