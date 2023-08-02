import { CreditClass, Maybe } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getSanityImgSrc } from 'lib/imgSrc';

import CreditClassImageGreen from '../../assets/credit-class-green.png';
import CreditClassImageGrey from '../../assets/credit-class-grey.png';

export const getClassImage = (
  metadata?: CreditClassMetadataLD,
  sanityClass?: Maybe<Pick<CreditClass, 'image'>>,
) => metadata?.['schema:image'] || getSanityImgSrc(sanityClass?.image);

export const getClassImageWithGreenDefault = (
  metadata?: CreditClassMetadataLD,
  sanityClass?: Maybe<Pick<CreditClass, 'image'>>,
) => getClassImage(metadata, sanityClass) || CreditClassImageGreen;

export const getClassImageWithGreyDefault = (
  metadata?: CreditClassMetadataLD,
  sanityClass?: Maybe<Pick<CreditClass, 'image'>>,
) => getClassImage(metadata, sanityClass) || CreditClassImageGrey;
