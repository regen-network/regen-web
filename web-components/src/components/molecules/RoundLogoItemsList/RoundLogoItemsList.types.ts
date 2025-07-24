import { LinkType } from '../../../types/shared/linkType';

export type RoundLogoItemType = {
  image: JSX.Element;
  link: LinkType;
};

export type RoundLogoItemsListType = {
  title: string;
  items: RoundLogoItemType[];
};
