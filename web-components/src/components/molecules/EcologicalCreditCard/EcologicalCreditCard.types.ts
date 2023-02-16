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

export type EcologicalCreditCardType = {
  type: EcologicalCreditTypeType;
  image: ImgType;
  title: string;
  infos: EcologicalCreditInfoType;
  description: string;
  offsetMethodList: EcologicalCreditCardItemListType;
  projectActivitesList: EcologicalCreditCardItemListType;
  button: {
    text: string;
    href: string;
  };
};
