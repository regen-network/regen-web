import { Account } from '../../../components/user/UserInfoCard';
import { ImageType } from '../../../types/shared/imageType';

export type EcologicalCreditTypeType = {
  name: string;
  icon: ImageType;
};

export type EcologicalCreditInfoType = {
  country: string;
  price: string;
  count: string;
};

export type EcologicalCreditCardItemType = {
  icon?: ImageType;
  name: string;
};

export type EcologicalCreditCardItemListType = {
  label: string;
  items: EcologicalCreditCardItemType[];
};

export type EcologicalCreditCardType = {
  type: EcologicalCreditTypeType;
  image: ImageType;
  title: string;
  infos: EcologicalCreditInfoType;
  description: string;
  offsetMethodList: EcologicalCreditCardItemListType;
  projectActivitesList: EcologicalCreditCardItemListType;
  program?: Account;
  button: {
    text: string;
    href: string;
  };
};
