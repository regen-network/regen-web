import { ImgType } from '../../../types/shared/IconType';

export type EcologicalCreditTypeType = {
  name: string;
  icon: ImgType;
};

export type EcologicalCreditInfoType = {
  country: string;
  price: string;
  count: string;
};

export type EcologicalCreditCardItemType = {
  icon?: ImgType;
  name: string;
};

export type EcologicalCreditCardItemListType = {
  label: string;
  items: EcologicalCreditCardItemType[];
};
