import { SocialItem } from 'web-components/src/components/share-section/ShareSection.types';

export type TerrasosSocialItem = SocialItem & {
  className?: string;
};

export type TerrasosColumnItem = {
  title: string;
  links: {
    label?: string;
    href?: string;
    subLinks?: {
      label: string;
      href: string;
    }[];
  }[];
};
