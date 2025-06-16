import { MergedCreditClass } from './CreditClassTab.types';

export const extractTitle = (creditClass: MergedCreditClass) => {
  return 'nameRaw' in creditClass
    ? creditClass.nameRaw?.[0]?.children?.[0]?.text
    : creditClass.name;
};

export const extractDescription = (creditClass: MergedCreditClass) => {
  return 'shortDescriptionRaw' in creditClass
    ? creditClass.shortDescriptionRaw?.[0]?.children?.[0]?.text ||
        creditClass.descriptionRaw?.[0]?.children?.[0]?.text
    : creditClass.description;
};

export const extractImageSrc = (creditClass: MergedCreditClass) => {
  return 'image' in creditClass
    ? creditClass.image?.imageHref || creditClass.image?.image?.asset?.url
    : creditClass.imageSrc;
};
