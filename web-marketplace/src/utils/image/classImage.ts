import { CreditClass, Maybe } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getSanityImgSrc } from 'lib/imgSrc';

type Params = {
  metadata?: CreditClassMetadataLD;
  sanityClass?: Maybe<Pick<CreditClass, 'image'>>;
};

export const getClassImage = ({ metadata, sanityClass }: Params) =>
  metadata?.['schema:image'] || getSanityImgSrc(sanityClass?.image);

export const getClassImageWithGreenDefault = (params: Params) =>
  getClassImage(params) || '/png/default-credit-class-green.png';

export const getClassImageWithGreyDefault = (params: Params) =>
  getClassImage(params) || '/png/default-credit-class-grey.png';

export const getClassImageWithProjectDefault = (params: Params) =>
  getClassImage(params) || '/jpg/default-project.jpg';
