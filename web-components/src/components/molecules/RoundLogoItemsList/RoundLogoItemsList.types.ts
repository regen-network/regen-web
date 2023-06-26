import { ImageType } from '../../../types/shared/imageType';

export type RoundLogoItemType = {
  image: ImageType;
  name: string;
};

export type RoundLogoItemsListType = {
  title: string;
  items: RoundLogoItemType[];
};
