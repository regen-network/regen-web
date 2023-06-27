import { ImageType } from '../../../types/shared/imageType';
import { LinkType } from '../../../types/shared/linkType';

export type RoundLogoItemType = {
  image: ImageType;
  link: LinkType;
};

export type RoundLogoItemsListType = {
  title: string;
  items: RoundLogoItemType[];
};
