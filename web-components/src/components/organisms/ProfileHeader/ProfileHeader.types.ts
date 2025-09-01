import { LinkType } from '../../../types/shared/linkType';

export type ProfileVariant = 'individual' | 'organization';

export type SocialLink = {
  href: string;
  icon: JSX.Element;
};

export type ProfileInfos = {
  addressLink?: LinkType;
  description?: string;
  socialsLinks?: SocialLink[];
};
