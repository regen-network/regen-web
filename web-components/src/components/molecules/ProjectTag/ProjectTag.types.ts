import { ImageType } from '../../../types/shared/imageType';

export type ProjectTagType = {
  icon: ImageType | JSX.Element;
  name: string | JSX.Element;
};

export function isImageType(icon: ImageType | JSX.Element): icon is ImageType {
  return (icon as ImageType).src !== undefined;
}
