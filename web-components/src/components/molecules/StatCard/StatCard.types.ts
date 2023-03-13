import { ImageType } from '../../../types/shared/imageType';

export type StatCardType = {
  label: string;
  stat: string;
  description: string | JSX.Element;
  image: ImageType;
};
