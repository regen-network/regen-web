import { StaticImageData } from 'next/image';

export type LoginModalState = 'select';

export type LoginProvider = {
  name: string;
  description?: string;
  image: StaticImageData;
  onClick: () => void | Promise<void>;
};
