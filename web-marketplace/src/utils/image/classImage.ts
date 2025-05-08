import { CreditClass, Maybe } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getSanityImgSrc } from 'lib/imgSrc';

import defaultProject from '../../../public/jpg/default-project.jpg';
import defaultCreditClassGreen from '../../../public/png/default-credit-class-green.png';
import defaultCreditClassGrey from '../../../public/png/default-credit-class-grey.png';

type Params = {
  metadata?: CreditClassMetadataLD;
  sanityClass?: Maybe<Pick<CreditClass, 'image'>>;
};

export const getClassImage = ({ metadata, sanityClass }: Params) =>
  metadata?.['schema:image'] || getSanityImgSrc(sanityClass?.image);

export const getClassImageWithGreenDefault = (params: Params) =>
  getClassImage(params) || defaultCreditClassGreen.src;

export const getClassImageWithGreyDefault = (params: Params) =>
  getClassImage(params) || defaultCreditClassGrey.grey;

export const getClassImageWithProjectDefault = (params: Params) =>
  getClassImage(params) || defaultProject.src;
